"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAddresses, useCreateAddress } from "@/hooks/use-addresses";
import { useApplyCoupon, useRemoveCoupon, useSelectAddress } from "@/hooks/use-coupon";
import { useCart } from "@/hooks/use-cart";
import { usePaymentMethods } from "@/hooks/use-payment-methods";
import { usePlaceOrder } from "@/hooks/use-orders";
import { useInitiatePayment } from "@/hooks/use-payments";
import { handleApiError } from "@/lib/api-error";
import type { CheckoutFormData } from "@/types/checkout-type";
import { CheckoutSummary } from "../checkout-summary-right";
import { FulfillmentSelector } from "./fulfillment-selector";
import { AddressSection } from "./address-section";
import { ContactInfoSection } from "./contact-info-section";
import { PaymentMethodSelector } from "./payment-method-selector";
import { CouponSection } from "./coupon-section";

const LABEL = "Home";

const CheckoutForm = () => {
  const { data: cart } = useCart();
  const { data: addresses = [] } = useAddresses();
  const { data: paymentMethods = [], isLoading: pmLoading } = usePaymentMethods();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const placeOrder = usePlaceOrder();
  const initiatePayment = useInitiatePayment();
  const createAddress = useCreateAddress();
  const selectAddress = useSelectAddress();
  const applyCoupon = useApplyCoupon();
  const removeCoupon = useRemoveCoupon();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      fulfillment: "delivery",
      receiverName: "",
      receiverPhone: "",
      division: "",
      district: "",
      area: "",
      road: "",
      house: "",
      apartment: "",
      postalCode: "",
      paymentMethodId: "",
      notes: "",
    },
  });

  const currentFulfillment = watch("fulfillment");
  const currentPaymentMethodId = watch("paymentMethodId");

  const handleAddressSelect = async (addressId: string) => {
    setSelectedAddressId(addressId);
    try {
      await selectAddress.mutateAsync(addressId);
      toast.success("Delivery address selected");
    } catch (error) {
      toast.error(handleApiError(error));
      setSelectedAddressId(null);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    try {
      await applyCoupon.mutateAsync(couponInput.trim());
      setAppliedCoupon(couponInput.trim());
      setCouponInput("");
      toast.success("Coupon applied");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCoupon.mutateAsync();
      setAppliedCoupon(null);
      toast.success("Coupon removed");
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const onSubmitForm = async (data: CheckoutFormData) => {
    try {
      const cartId = cart?.id;
      if (!cartId) {
        toast.error("Cart not found. Please try again.");
        return;
      }

      if (!selectedAddressId) {
        const address = await createAddress.mutateAsync({
          label: LABEL,
          receiverName: data.receiverName,
          receiverPhone: data.receiverPhone,
          division: data.division,
          district: data.district,
          area: data.area,
          road: data.road,
          house: data.house || undefined,
          apartment: data.apartment || undefined,
          postalCode: data.postalCode || undefined,
        });

        if (!address?.id) {
          toast.error("Failed to save address. Please try again.");
          return;
        }

        var finalAddressId = address.id;
      } else {
        var finalAddressId = selectedAddressId;
      }

      if (!data.paymentMethodId) {
        const defaultPm = paymentMethods.find((pm) => pm.isDefault);
        if (!defaultPm) {
          toast.error("Please select a payment method");
          return;
        }
        data.paymentMethodId = defaultPm.id;
      }

      const order = await placeOrder.mutateAsync({
        cartId,
        addressId: finalAddressId,
        paymentMethodId: data.paymentMethodId,
        notes: data.notes || undefined,
      });

      const codMethod = paymentMethods.find((pm) => pm.code === "cod");
      if (codMethod && data.paymentMethodId === codMethod.id) {
        toast.success("Order placed successfully!");
        router.push("/orders");
        return;
      }

      const payment = await initiatePayment.mutateAsync({
        orderId: order.orderId,
        amount: order.totalAmount,
        paymentMethodId: data.paymentMethodId,
      });
      window.location.href = payment.gatewayUrl;
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const savings = cart?.discount ?? 0;

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 flex flex-col gap-6">
        <FulfillmentSelector
          value={currentFulfillment}
          onChange={(val) => setValue("fulfillment", val)}
        />

        {currentFulfillment === "delivery" && (
          <AddressSection
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelect={handleAddressSelect}
            register={register}
            errors={errors}
            showNewAddress={!selectedAddressId}
            fulfillment={currentFulfillment}
          />
        )}

        <ContactInfoSection register={register} errors={errors} />

        <PaymentMethodSelector
          value={currentPaymentMethodId}
          onChange={(val) => setValue("paymentMethodId", val)}
          methods={paymentMethods}
          isLoading={pmLoading}
        />

        <CouponSection
          appliedCoupon={appliedCoupon}
          couponInput={couponInput}
          savings={savings}
          isPending={applyCoupon.isPending}
          onCouponChange={setCouponInput}
          onApply={handleApplyCoupon}
          onRemove={handleRemoveCoupon}
        />
      </div>

      <div className="lg:col-span-4 lg:sticky lg:top-24">
        <CheckoutSummary
          subtotal={cart?.subtotal ?? 0}
          deliveryFee={currentFulfillment === "delivery" ? (cart?.deliveryCharge ?? 60) : 0}
          savings={cart?.discount ?? 0}
          isSubmitting={placeOrder.isPending || initiatePayment.isPending || createAddress.isPending}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;

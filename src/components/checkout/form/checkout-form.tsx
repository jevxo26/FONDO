"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAddresses, useCreateAddress, useSelectAddress } from "@/hooks/use-addresses";
import { useApplyCoupon, useRemoveCoupon } from "@/hooks/use-coupon";
import { useCart } from "@/hooks/use-cart";
import { usePlaceOrder } from "@/hooks/use-orders";
import { useInitiatePayment } from "@/hooks/use-payments";
import { handleApiError } from "@/lib/api-error";
import type { CheckoutFormData, PaymentMethodType } from "@/types/checkout-type";
import { CheckoutSummary } from "../checkout-summary-right";
import { FulfillmentSelector } from "./fulfillment-selector";
import { AddressSection } from "./address-section";
import { ContactInfoSection } from "./contact-info-section";
import { PaymentMethodSelector } from "./payment-method-selector";
import { CouponSection } from "./coupon-section";

const CheckoutForm = () => {
  const { data: cart } = useCart();
  const { data: addresses = [] } = useAddresses();
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
      paymentMethod: "online",
      streetAddress: "",
      city: "",
      zipCode: "",
      recipientName: "",
      phoneNumber: "",
      orderNotes: "",
    },
  });

  const currentFulfillment = watch("fulfillment");
  const currentPaymentMethod = watch("paymentMethod");

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

      const address = await createAddress.mutateAsync({
        label: "Delivery",
        receiverName: data.recipientName,
        receiverPhone: data.phoneNumber,
        division: data.city || "Dhaka",
        district: data.city || "Dhaka",
        area: data.city || "Dhaka",
        road: data.streetAddress,
        postalCode: data.zipCode,
      });

      if (!address?.id) {
        toast.error("Failed to save address. Please try again.");
        return;
      }

      const order = await placeOrder.mutateAsync({
        cartId,
        addressId: address.id,
        paymentMethodId: data.paymentMethod,
        notes: data.orderNotes,
      });

      if (data.paymentMethod === "cod") {
        toast.success("Order placed successfully!");
        router.push("/orders");
        return;
      }

      const payment = await initiatePayment.mutateAsync({
        orderId: order.orderId,
        amount: order.totalAmount,
        paymentMethodId: data.paymentMethod,
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
          />
        )}

        <ContactInfoSection register={register} errors={errors} />

        <PaymentMethodSelector
          value={currentPaymentMethod}
          onChange={(val) => setValue("paymentMethod", val as PaymentMethodType)}
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

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAddresses, useCreateAddress, useSelectAddress } from "@/store/api/slices/addresses-api";
import { useApplyCoupon, useRemoveCoupon } from "@/store/api/slices/coupon-api";
import { useCart, useClearCart } from "@/store/api/slices/cart-api";
import { usePaymentMethods } from "@/store/api/slices/payments-api";
import { usePlaceOrder } from "@/store/api/slices/orders-api";
import { useInitiatePayment } from "@/store/api/slices/payments-api";
import { handleApiError } from "@/lib/api-error";
import type { CheckoutFormData, DeliverySchedule, FulfillmentType } from "@/types/checkout-type";
import type { Address } from "@/types/address";
import type { PaymentMethod } from "@/types/payment";
import type { Cart } from "@/types/cart";
import type {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";

const LABEL = "Home";

export interface UseCheckoutReturn {
  cart: Cart | undefined;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  pmLoading: boolean;
  selectedAddressId: string | null;
  couponInput: string;
  appliedCoupon: string | null;
  deliverySchedule: DeliverySchedule | undefined;
  currentFulfillment: FulfillmentType;
  currentPaymentMethodId: string;
  placeOrder: { isPending: boolean };
  initiatePayment: { isPending: boolean };
  createAddress: { isPending: boolean };
  applyCoupon: { isPending: boolean };
  savings: number;
  register: UseFormRegister<CheckoutFormData>;
  handleSubmit: UseFormHandleSubmit<CheckoutFormData>;
  watch: UseFormWatch<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  setCouponInput: (v: string) => void;
  setDeliverySchedule: (v: DeliverySchedule | undefined) => void;
  handleAddressSelect: (id: string) => Promise<void>;
  handleApplyCoupon: () => Promise<void>;
  handleRemoveCoupon: () => Promise<void>;
  onSubmitForm: (data: CheckoutFormData) => Promise<void>;
}

export default function useCheckout(): UseCheckoutReturn {
  const { data: cart } = useCart();
  const { data: addresses = [] } = useAddresses();
  const { data: paymentMethods = [], isLoading: pmLoading } = usePaymentMethods();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [deliverySchedule, setDeliverySchedule] = useState<DeliverySchedule>();

  const placeOrder = usePlaceOrder();
  const initiatePayment = useInitiatePayment();
  const clearCart = useClearCart();
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
      postalCode: "",
      paymentMethodId: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const currentFulfillment = watch("fulfillment");
  const currentPaymentMethodId = watch("paymentMethodId");

  useEffect(() => {
    if (paymentMethods.length > 0 && !currentPaymentMethodId) {
      const defaultPm = paymentMethods.find((pm) => pm.isDefault) ?? paymentMethods[0];
      setValue("paymentMethodId", defaultPm.id);
    }
  }, [paymentMethods, currentPaymentMethodId, setValue]);

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
      await removeCoupon.mutateAsync(undefined);
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

      let finalAddressId: string | undefined;

      if (currentFulfillment === "delivery" && !selectedAddressId) {
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

        finalAddressId = address.id;
      } else if (currentFulfillment === "delivery" && selectedAddressId) {
        finalAddressId = selectedAddressId;
      }

      if (!data.paymentMethodId && paymentMethods.length > 0) {
        const defaultPm = paymentMethods.find((pm) => pm.isDefault) ?? paymentMethods[0];
        data.paymentMethodId = defaultPm.id;
      }

      if (!data.paymentMethodId) {
        toast.error("Please select a payment method");
        return;
      }

      const hasSchedule = deliverySchedule?.deliveryDate && deliverySchedule?.deliverySlot;

      const order = await placeOrder.mutateAsync({
        cartId,
        ...(finalAddressId ? { addressId: finalAddressId } : {}),
        paymentMethodId: data.paymentMethodId,
        notes: data.notes || undefined,
        ...(hasSchedule ? { deliverySchedule } : {}),
      });

      clearCart.mutate(undefined);

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

  const savings = Number(cart?.discount ?? 0);

  return {
    cart,
    addresses,
    paymentMethods,
    pmLoading,
    selectedAddressId,
    couponInput,
    appliedCoupon,
    deliverySchedule,
    currentFulfillment,
    currentPaymentMethodId,
    placeOrder,
    initiatePayment,
    createAddress,
    applyCoupon,
    savings,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    setCouponInput,
    setDeliverySchedule,
    handleAddressSelect,
    handleApplyCoupon,
    handleRemoveCoupon,
    onSubmitForm,
  };
}

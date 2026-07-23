"use client";

import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddresses, useCreateAddress } from "@/hooks/use-addresses";
import { useCart } from "@/hooks/use-cart";
import { usePlaceOrder } from "@/hooks/use-orders";
import { useInitiatePayment } from "@/hooks/use-payments";
import { handleApiError } from "@/lib/api-error";
import { CheckoutFormData, PaymentMethodType } from "@/types/checkout-type";
import { Check, CreditCard, Loader2, MapPin, ShoppingBag, Ticket, Truck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckoutSummary } from "../checkout-summary-right";
import { applyCoupon, removeCoupon, selectAddress } from "../../../../server/services/checkoutService";

const CheckoutForm = () => {
  const { data: cart, isLoading: cartLoading } = useCart();
  const { data: addresses = [] } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const placeOrder = usePlaceOrder();
  const initiatePayment = useInitiatePayment();
  const createAddress = useCreateAddress();
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

  useEffect(() => {
    if (placeOrder.isSuccess) return;
  }, [placeOrder.isSuccess]);

  const savings = cart?.discount ?? 0;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm">
            <h2 className="font-sans text-base font-semibold text-foreground mb-4">
              How would you like your order?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setValue("fulfillment", "delivery")}
                className={`flex items-center gap-4 p-5 rounded-2xl transition-all border text-left ${
                  currentFulfillment === "delivery"
                    ? "bg-foreground border-foreground text-background"
                    : "bg-background border-border text-foreground"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${currentFulfillment === "delivery" ? "bg-primary/20" : "bg-white border"}`}
                >
                  <Truck
                    className={`size-5 ${currentFulfillment === "delivery" ? "text-primary" : "text-muted-foreground"}`}
                  />
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold">Delivery</p>
                  <p
                    className={`font-sans text-xs ${currentFulfillment === "delivery" ? "text-neutral-300" : "text-muted-foreground"}`}
                  >
                    Get it delivered to your door
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setValue("fulfillment", "pickup")}
                className={`flex items-center gap-4 p-5 rounded-2xl transition-all border text-left ${
                  currentFulfillment === "pickup"
                    ? "bg-foreground border-foreground text-background"
                    : "bg-background border-border text-foreground"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${currentFulfillment === "pickup" ? "bg-primary/20" : "bg-white border"}`}
                >
                  <ShoppingBag
                    className={`size-5 ${currentFulfillment === "pickup" ? "text-primary" : "text-muted-foreground"}`}
                  />
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold">Pick up</p>
                  <p
                    className={`font-sans text-xs ${currentFulfillment === "pickup" ? "text-neutral-300" : "text-muted-foreground"}`}
                  >
                    Collect directly from kitchen
                  </p>
                </div>
              </button>
            </div>
          </div>

          {currentFulfillment === "delivery" && (
            <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm flex flex-col gap-4">
              <h2 className="font-sans text-base font-semibold text-foreground">
                Delivery Address
              </h2>

              {addresses.length > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-muted-foreground font-medium">Saved addresses</p>
                  {addresses.map((addr) => (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => handleAddressSelect(addr.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                        selectedAddressId === addr.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background hover:border-border/80"
                      }`}
                    >
                      <MapPin
                        className={`size-4 ${selectedAddressId === addr.id ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div className="flex-1">
                        <p className="font-sans text-xs font-semibold text-foreground">
                          {addr.label}
                          {addr.isDefault && (
                            <span className="ml-2 text-[9px] uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </p>
                        <p className="font-sans text-[11px] text-muted-foreground mt-0.5">
                          {addr.streetAddress}, {addr.city} {addr.zipCode}
                        </p>
                      </div>
                      {selectedAddressId === addr.id && <Check className="size-4 text-primary" />}
                    </button>
                  ))}
                  <div className="border-t border-border/40 pt-3 mt-1">
                    <p className="text-[10px] text-muted-foreground mb-2">
                      Or enter a new address:
                    </p>
                  </div>
                </div>
              )}

              {!selectedAddressId && (
                <>
                  <FormField label="Street Address" error={errors.streetAddress}>
                    <Input
                      type="text"
                      placeholder="House number, road number, area line..."
                      {...register("streetAddress", {
                        required: currentFulfillment === "delivery" && !selectedAddressId,
                      })}
                      className={errors.streetAddress ? "border-rose-400 focus:ring-rose-400" : ""}
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="City" error={errors.city}>
                      <Input
                        type="text"
                        placeholder="e.g. Dhaka"
                        {...register("city", {
                          required: currentFulfillment === "delivery" && !selectedAddressId,
                        })}
                        className={errors.city ? "border-rose-400 focus:ring-rose-400" : ""}
                      />
                    </FormField>
                    <FormField label="ZIP / Postal Code" error={errors.zipCode}>
                      <Input
                        type="text"
                        placeholder="1213"
                        {...register("zipCode", {
                          required: currentFulfillment === "delivery" && !selectedAddressId,
                        })}
                        className={errors.zipCode ? "border-rose-400 focus:ring-rose-400" : ""}
                      />
                    </FormField>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-sans text-base font-semibold text-foreground">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Recipient Name" error={errors.recipientName} required>
                <Input
                  type="text"
                  placeholder="Full name"
                  {...register("recipientName", { required: true })}
                  className={errors.recipientName ? "border-rose-400 focus:ring-rose-400" : ""}
                />
              </FormField>
              <FormField label="Phone Number" error={errors.phoneNumber} required>
                <Input
                  type="tel"
                  placeholder="+880 1XXX XXXXXX"
                  {...register("phoneNumber", { required: true })}
                  className={errors.phoneNumber ? "border-rose-400 focus:ring-rose-400" : ""}
                />
              </FormField>
            </div>
          </div>

          <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm">
            <h2 className="font-sans text-base font-semibold text-foreground mb-4">
              Payment Method
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "online", label: "Online Card" },
                { id: "bkash", label: "bKash" },
                { id: "nagad", label: "Nagad" },
                { id: "cod", label: "Cash on Delivery" },
              ].map((method) => {
                const isSelected = currentPaymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setValue("paymentMethod", method.id as PaymentMethodType)}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center min-h-[84px] ${
                      isSelected
                        ? "bg-foreground border-foreground text-background"
                        : "bg-background border-border text-muted-foreground hover:border-neutral-400"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 size-4 bg-primary rounded-full flex items-center justify-center">
                        <Check className="size-2.5 text-primary-foreground stroke-[3]" />
                      </div>
                    )}
                    <CreditCard
                      className={`size-4 mb-1.5 ${isSelected ? "text-primary" : "text-muted-foreground/80"}`}
                    />
                    <span className="font-sans text-xs font-semibold leading-tight">
                      {method.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-sans text-base font-semibold text-foreground">Coupon Code</h2>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Ticket className="size-4 text-primary" />
                  <span className="font-sans text-sm font-semibold text-foreground">
                    {appliedCoupon}
                  </span>
                  {savings > 0 && (
                    <span className="text-xs text-success font-medium">-৳{savings}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  disabled={removeCoupon.isPending}
                  className="p-1 hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <X className="size-4 text-destructive" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={applyCoupon.isPending || !couponInput.trim()}
                  className="px-5 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {applyCoupon.isPending ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Ticket className="size-3.5" />
                  )}
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm flex flex-col gap-2">
            <h2 className="font-sans text-base font-semibold text-foreground">Order Notes</h2>
            <Textarea
              rows={4}
              placeholder="Add special instructions for cooking preferences, allergies, or drop-off guidelines..."
              {...register("orderNotes")}
              className="bg-background/60"
            />
          </div>
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <CheckoutSummary
            subtotal={cart?.subtotal ?? 0}
            deliveryFee={currentFulfillment === "delivery" ? (cart?.deliveryCharge ?? 60) : 0}
            savings={cart?.discount ?? 0}
            isSubmitting={
              placeOrder.isPending || initiatePayment.isPending || createAddress.isPending
            }
          />
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;

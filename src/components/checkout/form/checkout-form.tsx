"use client";

import useCheckout from "@/hooks/use-checkout";
import { CheckoutSummary } from "../checkout-summary-right";
import { FulfillmentSelector } from "./fulfillment-selector";
import { AddressSection } from "./address-section";
import { PaymentMethodSelector } from "./payment-method-selector";
import { CouponSection } from "./coupon-section";
import { DeliveryScheduleSelector } from "./delivery-schedule-selector";

const CheckoutForm = () => {
  const {
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
    setValue,
    errors,
    setCouponInput,
    setDeliverySchedule,
    handleAddressSelect,
    handleApplyCoupon,
    handleRemoveCoupon,
    onSubmitForm,
  } = useCheckout();

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
    >
      <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-primary/[0.02] via-card to-primary/[0.01] p-6 shadow-[var(--shadow-card)] relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-36 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -top-3 -left-3 z-0 size-20 rounded-full bg-primary/5 blur-2xl" />
        <div className="pointer-events-none absolute -top-8 -right-8 z-0 size-28 rounded-full bg-primary/5 blur-2xl" />
        <div className="pointer-events-none absolute right-3 top-3 z-10 size-[7px] rotate-45 border border-primary/30" />
        <div className="relative z-10 flex flex-col gap-4">
        <FulfillmentSelector
          value={currentFulfillment}
          onChange={(val) => setValue("fulfillment", val)}
        />

        {currentFulfillment === "delivery" && (
          <>
            <AddressSection
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onSelect={handleAddressSelect}
              register={register}
              errors={errors}
              showNewAddress={!selectedAddressId}
              fulfillment={currentFulfillment}
            />

            <DeliveryScheduleSelector value={deliverySchedule} onChange={setDeliverySchedule} />
          </>
        )}

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
  );
};

export default CheckoutForm;

"use client";

import * as React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";

const schema = yup.object({
  businessName: yup.string().required("Business name is required"),
  ownerName: yup.string().required("Owner name is required"),
  phone: yup.string().min(11, "Must be at least 11 digits").required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  tradeLicenseNumber: yup.string().required("Trade license is required"),
  tinNumber: yup.string().required("TIN number is required"),
  binNumber: yup.string().required("BIN number is required"),
});

type FormValues = yup.InferType<typeof schema>;

export function RegisterVendorModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => console.log(data);

  // হেল্পার ফাংশন যা এরর অবজেক্টকে সঠিক ফরম্যাটে কনভার্ট করবে
  const getError = (message?: string) => (message ? [{ message }] : undefined);

  return (
    <Dialog>
      <DialogTrigger render={<Button>+ Register New Vendor</Button>} />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Register New Vendor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="businessName">Business Name</FieldLabel>
              <Input id="businessName" {...register("businessName")} />
              <FieldError errors={getError(errors.businessName?.message)} />
            </Field>

            <Field>
              <FieldLabel htmlFor="ownerName">Owner Name</FieldLabel>
              <Input id="ownerName" {...register("ownerName")} />
              <FieldError errors={getError(errors.ownerName?.message)} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input id="phone" {...register("phone")} />
                <FieldError errors={getError(errors.phone?.message)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" {...register("email")} />
                <FieldError errors={getError(errors.email?.message)} />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="tradeLicenseNumber">Trade License</FieldLabel>
              <Input id="tradeLicenseNumber" {...register("tradeLicenseNumber")} />
              <FieldError errors={getError(errors.tradeLicenseNumber?.message)} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="tinNumber">TIN Number</FieldLabel>
                <Input id="tinNumber" {...register("tinNumber")} />
                <FieldError errors={getError(errors.tinNumber?.message)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="binNumber">BIN Number</FieldLabel>
                <Input id="binNumber" {...register("binNumber")} />
                <FieldError errors={getError(errors.binNumber?.message)} />
              </Field>
            </div>

            <Button type="submit" className="w-full">
              Submit Registration
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
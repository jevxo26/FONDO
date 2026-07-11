"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FormField } from "@/components/common/form-field";
import { FieldGroup } from "@/components/ui/field";

const schema = yup.object({
  businessName: yup.string().required("Business name is required"),
  ownerName: yup.string().required("Owner name is required"),
  phone: yup.string().min(11, "Phone must be at least 11 digits").required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
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

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button />}>+ Register New Vendor</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register New Vendor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <FormField
              label="Business Name"
              htmlFor="businessName"
              error={errors.businessName}
              required
            >
              <Input
                id="businessName"
                placeholder="ABC Enterprise"
                aria-invalid={!!errors.businessName}
                {...register("businessName")}
              />
            </FormField>

            <FormField label="Owner Name" htmlFor="ownerName" error={errors.ownerName} required>
              <Input
                id="ownerName"
                placeholder="John Doe"
                aria-invalid={!!errors.ownerName}
                {...register("ownerName")}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label="Phone" htmlFor="phone" error={errors.phone} required>
                <Input
                  id="phone"
                  placeholder="01XXXXXXXXX"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                />
              </FormField>

              <FormField label="Email" htmlFor="email" error={errors.email} required>
                <Input
                  id="email"
                  type="email"
                  placeholder="vendor@example.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </FormField>
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

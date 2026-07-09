"use client";

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

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

const schema = yup.object({
  businessName: yup.string().required("Business name is required"),
  ownerName: yup.string().required("Owner name is required"),
  phone: yup
    .string()
    .min(11, "Phone must be at least 11 digits")
    .required("Phone is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
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
      <DialogTrigger render={<Button />}>
        + Register New Vendor
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register New Vendor</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Field data-invalid={!!errors.businessName}>
              <FieldLabel htmlFor="businessName">
                Business Name
              </FieldLabel>

              <Input
                id="businessName"
                placeholder="ABC Enterprise"
                aria-invalid={!!errors.businessName}
                {...register("businessName")}
              />

              <FieldError
                errors={
                  errors.businessName
                    ? [errors.businessName]
                    : undefined
                }
              />
            </Field>

            <Field data-invalid={!!errors.ownerName}>
              <FieldLabel htmlFor="ownerName">
                Owner Name
              </FieldLabel>

              <Input
                id="ownerName"
                placeholder="John Doe"
                aria-invalid={!!errors.ownerName}
                {...register("ownerName")}
              />

              <FieldError
                errors={
                  errors.ownerName
                    ? [errors.ownerName]
                    : undefined
                }
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field data-invalid={!!errors.phone}>
                <FieldLabel htmlFor="phone">
                  Phone
                </FieldLabel>

                <Input
                  id="phone"
                  placeholder="01XXXXXXXXX"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                />

                <FieldError
                  errors={
                    errors.phone
                      ? [errors.phone]
                      : undefined
                  }
                />
              </Field>

              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="vendor@example.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />

                <FieldError
                  errors={
                    errors.email
                      ? [errors.email]
                      : undefined
                  }
                />
              </Field>
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Submit Registration
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
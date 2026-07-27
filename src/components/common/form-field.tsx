"use client";

import React, { type ReactNode } from "react";
import type { FieldError as FieldErrorType } from "react-hook-form";

function Field({ children, className, "data-invalid": dataInvalid }: { children: ReactNode; className?: string; "data-invalid"?: boolean }) {
  return <div data-invalid={dataInvalid} className={`space-y-1.5 ${className || ""}`}>{children}</div>;
}

function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return <label htmlFor={htmlFor} className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">{children}</label>;
}

function FieldError({ errors }: { errors?: (FieldErrorType | { message?: string } | undefined)[] }) {
  const err = errors?.find((e) => e?.message);
  if (!err || !err.message) return null;
  return <p className="text-xs font-medium text-red-500 mt-1">{err.message}</p>;
}

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: FieldErrorType | { message?: string };
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export function FormField({ label, htmlFor, error, children, required, className }: FormFieldProps) {
  return (
    <Field data-invalid={!!error} className={className}>
      <FieldLabel htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </FieldLabel>
      {children}
      <FieldError errors={error ? [error] : undefined} />
    </Field>
  );
}
"use client";

import React, { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import type { FieldError as FieldErrorType } from "react-hook-form";

function Field({
  children,
  className,
  "data-invalid": dataInvalid,
}: {
  children: ReactNode;
  className?: string;
  "data-invalid"?: boolean;
}) {
  return (
    <div data-invalid={dataInvalid} className={`space-y-1.5 ${className || ""}`}>
      {children}
    </div>
  );
}

function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-foreground [letter-spacing:0.02em]"
    >
      {children}
    </label>
  );
}

function FieldError({
  errors,
}: {
  errors?: (FieldErrorType | { message?: string } | undefined)[];
}) {
  const err = errors?.find((e) => e?.message);
  if (!err || !err.message) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-destructive">
      <AlertCircle className="size-3.5 shrink-0" />
      {err.message}
    </p>
  );
}

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: FieldErrorType | { message?: string };
  hint?: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  children,
  required,
  className,
}: FormFieldProps) {
  return (
    <Field data-invalid={!!error} className={className}>
      <FieldLabel htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-0.5 text-muted-foreground">*</span>}
      </FieldLabel>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      <FieldError errors={error ? [error] : undefined} />
    </Field>
  );
}

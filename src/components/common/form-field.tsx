import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import type { ReactNode } from 'react';
import type { FieldError as FieldErrorType } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: FieldErrorType | { message?: string };
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  children,
  required,
  className,
}: FormFieldProps) {
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

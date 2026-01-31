"use client";
import { forwardRef } from "react";

type Status = "default" | "success" | "error" | "warning" | "info";

type Props = {
  id: string;
  label?: string;
  secondaryLabel?: string;
  help?: string;
  status?: Status;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endBadge?: string;
  className?: string;
};

const statusBorder: Record<Status, string> = {
  default: "border-neutral-300 focus:ring-brand-500",
  success: "border-success-500 focus:ring-success-600",
  error: "border-error-500 focus:ring-error-600",
  warning: "border-warning-500 focus:ring-warning-600",
  info: "border-info-500 focus:ring-info-600",
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    id,
    label,
    secondaryLabel,
    help,
    status = "default",
    value,
    onChange,
    placeholder,
    type = "text",
    disabled,
    startIcon,
    endBadge,
    className,
  },
  ref
) {
  const describedBy = help ? `${id}-help` : undefined;
  const invalid = status === "error";
  return (
    <div className={className}>
      {(label || secondaryLabel) && (
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor={id} className="typo-small text-neutral-700">
            {label}
          </label>
          {secondaryLabel && (
            <span className="typo-small text-neutral-500">{secondaryLabel}</span>
          )}
        </div>
      )}
      <div className={`relative rounded-full border bg-white px-3 ${statusBorder[status]} focus-within:ring-2`}>
        {startIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
            {startIcon}
          </span>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          className={`typo-base w-full bg-transparent outline-none placeholder:text-neutral-400 py-2 ${
            startIcon ? "pl-8" : ""
          } ${endBadge ? "pr-16" : ""}`}
        />
        {endBadge && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-neutral-300 px-2 py-0.5 typo-small text-neutral-700">
            {endBadge}
          </span>
        )}
      </div>
      {help && (
        <p id={`${id}-help`} className="mt-1 typo-small text-neutral-500">
          {help}
        </p>
      )}
    </div>
  );
});

export default Input;


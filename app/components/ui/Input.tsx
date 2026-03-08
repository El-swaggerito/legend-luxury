"use client";
import { forwardRef, useState } from "react";
import { LuCircleX, LuCheck } from "react-icons/lu";

type Status = "default" | "success" | "error" | "warning";

type Props = {
  id: string;
  label: string;
  type?: string;
  status?: Status;
  help?: string;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string; // Kept for compatibility but floating labels usually don't use it
} & React.InputHTMLAttributes<HTMLInputElement>;

const statusColors = {
  default: "border-neutral-200 focus:border-accent-600 focus:ring-accent-600 text-neutral-900",
  success: "border-green-500 focus:border-green-600 focus:ring-green-600 text-green-900",
  error: "border-red-500 focus:border-red-600 focus:ring-red-600 text-red-900",
  warning: "border-yellow-500 focus:border-yellow-600 focus:ring-yellow-600 text-yellow-900",
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    id,
    label,
    type = "text",
    status = "default",
    help,
    className = "",
    startIcon,
    endIcon,
    placeholder = " ", // Space needed for :placeholder-shown trick
    ...props
  },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);
  const isError = status === "error";

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            peer block w-full rounded-xl border bg-white px-4 pb-2.5 pt-5 text-base
            leading-relaxed shadow-sm transition-all duration-200 ease-in-out
            placeholder:text-transparent focus:outline-none focus:ring-1
            disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500
            ${statusColors[status]}
            ${startIcon ? "pl-11" : ""}
            ${endIcon ? "pr-11" : ""}
          `}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          aria-invalid={isError}
          aria-describedby={help ? `${id}-help` : undefined}
          {...props}
        />
        
        <label
          htmlFor={id}
          className={`
            pointer-events-none absolute left-4 top-4 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-sm text-neutral-500 duration-200
            peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
            peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-accent-600
            ${startIcon ? "peer-placeholder-shown:left-11 peer-focus:left-11" : ""}
            ${isError ? "text-red-500 peer-focus:text-red-600" : ""}
          `}
        >
          {label}
        </label>

        {startIcon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors peer-focus:text-accent-600">
            {startIcon}
          </div>
        )}

        {endIcon ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto">
            {endIcon}
          </div>
        ) : status !== "default" ? (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            {status === "error" && <LuCircleX className="h-5 w-5 text-red-500" />}
            {status === "success" && <LuCheck className="h-5 w-5 text-green-500" />}
          </div>
        ) : null}
      </div>

      {help && (
        <p
          id={`${id}-help`}
          className={`mt-1.5 text-xs font-medium transition-all duration-200 ${
            isError ? "text-red-600" : "text-neutral-500"
          }`}
        >
          {help}
        </p>
      )}
    </div>
  );
});

export default Input;

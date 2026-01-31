"use client";
import { useFormContext } from "react-hook-form";

export default function ShippingForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-serif text-neutral-900">Shipping Address</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-neutral-700">First Name</label>
          <input
            {...register("firstName")}
            id="firstName"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName.message as string}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-neutral-700">Last Name</label>
          <input
            {...register("lastName")}
            id="lastName"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all"
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName.message as string}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium text-neutral-700">Street Address</label>
        <input
          {...register("address")}
          id="address"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all"
          placeholder="123 Main St"
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="apartment" className="text-sm font-medium text-neutral-700">Apartment, suite, etc. (optional)</label>
        <input
          {...register("apartment")}
          id="apartment"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all"
          placeholder="Apt 4B"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-neutral-700">City</label>
          <input
            {...register("city")}
            id="city"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all"
            placeholder="New York"
          />
          {errors.city && (
            <p className="text-xs text-red-500">{errors.city.message as string}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium text-neutral-700">State / Province</label>
          <input
            {...register("state")}
            id="state"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all"
            placeholder="NY"
          />
          {errors.state && (
            <p className="text-xs text-red-500">{errors.state.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="zip" className="text-sm font-medium text-neutral-700">Postal Code</label>
          <input
            {...register("zip")}
            id="zip"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all"
            placeholder="10001"
          />
          {errors.zip && (
            <p className="text-xs text-red-500">{errors.zip.message as string}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="country" className="text-sm font-medium text-neutral-700">Country</label>
        <select
            {...register("country")}
            id="country"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all bg-white"
        >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-neutral-700">Phone</label>
        <input
          {...register("phone")}
          id="phone"
          type="tel"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all"
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message as string}</p>
        )}
      </div>
    </div>
  );
}

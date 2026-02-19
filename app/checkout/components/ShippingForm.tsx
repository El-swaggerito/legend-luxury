"use client";
import { useFormContext } from "react-hook-form";
import Input from "../../components/ui/Input";
import { LuUser, LuMapPin, LuBuilding, LuGlobe, LuPhone } from "react-icons/lu";

export default function ShippingForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent-600">
          <LuMapPin className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold font-serif text-neutral-900">Shipping Address</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          {...register("firstName")}
          id="firstName"
          label="First Name"
          startIcon={<LuUser className="h-5 w-5" />}
          status={errors.firstName ? "error" : "default"}
          help={errors.firstName?.message as string}
        />
        
        <Input
          {...register("lastName")}
          id="lastName"
          label="Last Name"
          startIcon={<LuUser className="h-5 w-5" />}
          status={errors.lastName ? "error" : "default"}
          help={errors.lastName?.message as string}
        />
      </div>

      <Input
        {...register("address")}
        id="address"
        label="Street Address"
        startIcon={<LuMapPin className="h-5 w-5" />}
        status={errors.address ? "error" : "default"}
        help={errors.address?.message as string}
      />

      <Input
        {...register("apartment")}
        id="apartment"
        label="Apartment, suite, etc. (optional)"
        startIcon={<LuBuilding className="h-5 w-5" />}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Input
          {...register("city")}
          id="city"
          label="City"
          status={errors.city ? "error" : "default"}
          help={errors.city?.message as string}
        />
        
        <Input
          {...register("state")}
          id="state"
          label="State / Province"
          status={errors.state ? "error" : "default"}
          help={errors.state?.message as string}
        />

        <Input
          {...register("zip")}
          id="zip"
          label="Postal Code"
          status={errors.zip ? "error" : "default"}
          help={errors.zip?.message as string}
        />
      </div>
      
      <div className="relative">
        <select
            {...register("country")}
            id="country"
            className="peer block w-full rounded-xl border border-neutral-200 bg-white px-4 pb-2.5 pt-5 text-base leading-relaxed shadow-sm transition-all duration-200 ease-in-out focus:border-accent-600 focus:outline-none focus:ring-1 focus:ring-accent-600 outline-none appearance-none"
        >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
        </select>
        <label
          htmlFor="country"
          className="pointer-events-none absolute left-4 top-4 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-sm text-neutral-500 duration-200"
        >
          Country
        </label>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
          <LuGlobe className="h-5 w-5" />
        </div>
      </div>

      <Input
        {...register("phone")}
        id="phone"
        type="tel"
        label="Phone Number"
        startIcon={<LuPhone className="h-5 w-5" />}
        status={errors.phone ? "error" : "default"}
        help={errors.phone?.message as string}
      />
    </div>
  );
}

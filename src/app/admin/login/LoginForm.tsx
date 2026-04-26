"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, LogIn } from "lucide-react";

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password required"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // /admin (route group root) routes by role to /admin/dashboard or
  // /admin/client-dashboard, so the redirect picks the right place
  // for whichever role just logged in.
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!result?.ok) {
      setServerError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-xs tracking-widest text-gray-mid mb-2">
          EMAIL
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          className="w-full bg-navy-deep border border-navy-light rounded-lg px-4 py-3 text-off-white focus:border-red-bright focus:outline-none focus:ring-1 focus:ring-red-bright transition"
          {...register("email")}
        />
        {errors.email && <p className="text-red-bright text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-xs tracking-widest text-gray-mid mb-2">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="w-full bg-navy-deep border border-navy-light rounded-lg px-4 py-3 text-off-white focus:border-red-bright focus:outline-none focus:ring-1 focus:ring-red-bright transition"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-bright text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {serverError && (
        <p className="bg-red-deep/20 border border-red-primary/40 text-red-bright text-sm rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-red-primary to-red-deep hover:from-red-bright hover:to-red-primary text-white font-medium tracking-widest uppercase text-sm px-6 py-3.5 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4" /> Sign In
          </>
        )}
      </button>
    </form>
  );
}

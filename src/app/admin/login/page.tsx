import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen grid-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-red-bright tracking-[4px] text-xs font-medium mb-3">
            G UNIT SECURITY
          </p>
          <h1 className="font-display text-5xl tracking-wider">
            Admin <span className="brand-gradient-text">Login</span>
          </h1>
        </div>
        <div className="bg-navy-rich/80 backdrop-blur rounded-2xl border border-navy-light p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <Suspense fallback={<div className="text-gray-mid">Loading…</div>}>
            <LoginForm />
          </Suspense>
        </div>
        <p className="text-center text-gray-mid text-xs mt-6">
          Licensed Security Provider · Western Australia
        </p>
      </div>
    </main>
  );
}

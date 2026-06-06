"use client";

import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";
import { Button, Card, CardHeader, Form, Input, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEnvelope, FaGoogle, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Gather email and password fields directly via FormData names
    const formData = new FormData(e.currentTarget);
    const credentials = Object.fromEntries(formData.entries());

    try {
      // Authenticate using Better-Auth email signIn strategy
      const { data, error } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
      });

      //   if (data) {
      //     router.push("/"); // Route user home or to /dashboard upon success
      //     router.refresh(); // Refresh session state inside your Navbar layout
      //   }
      if (data) {
        const role = data.user.role;

        if (role === "organizer") {
          router.push("/dashboard/organizer");
        } else {
          router.push("/dashboard/attendee");
        }
      }

      if (error) {
        alert(error.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login unexpected execution error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // Redirect window right back to index after OAuth finishes
      });
    } catch (err) {
      console.error("Google OAuth error:", err);
    }
  };

  return (
    <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4 mx-auto">
      <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
        <Logo />
        <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Log in to your Ticketo account to manage your bookings and events.
        </p>
      </CardHeader>
      <div className="gap-4">
        <Form onSubmit={handleSubmit} className="space-y-4 w-full">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email" // Enables seamless extraction via Object.fromEntries
            placeholder="john@example.com"
            type="email"
            required
            labelPlacement="outside"
            startContent={<FaEnvelope className="text-slate-400 text-sm" />}
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password" // Enables seamless extraction via Object.fromEntries
            placeholder="••••••••"
            type="password"
            required
            labelPlacement="outside"
            startContent={<FaLock className="text-slate-400 text-sm" />}
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
          />

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-linear-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
            radius="lg"
          >
            {loading ? "Signing In..." : "Log In"}
          </Button>
        </Form>

        <div className="flex items-center my-4">
          <div className="grow border-t border-white/5" />
          <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">
            Or Sign In With
          </span>
          <div className="grow border-t border-white/5" />
        </div>

        <Button
          variant="bordered"
          onClick={handleGoogleLogin}
          className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
          radius="lg"
          startContent={<FaGoogle className="text-pink-500" />}
        >
          Google OAuth
        </Button>

        <p className="text-center text-sm text-slate-400 mt-6">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="text-pink-500 hover:text-pink-400 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default LoginPage;

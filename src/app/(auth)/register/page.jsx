"use client";

import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  CardHeader,
  Form,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // FIXED: Import useRouter for client-side navigation
import React, { useState } from "react";
import { FaEnvelope, FaGoogle, FaLock, FaUser } from "react-icons/fa";

const RegisterPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter(); // FIXED: Initialize router hook

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FIXED: Ensure we have a file before attempting third-party upload
    if (!imageFile) {
      alert("Please upload a profile image.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const imageData = new FormData();
    imageData.append("image", imageFile);

    try {
      // 1. Upload file to ImgBB
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_BB_PUBLIC_API}`,
        {
          method: "POST",
          body: imageData,
        },
      );

      const imgResponse = await res.json();

      // console.log(imgResponse);
      // return;

      if (!imgResponse.success) {
        alert("Image upload failed.");
        return;
      }

      // 2. Extract link and append it to our registration fields container
      const permanentUrl = imgResponse.data.url;
      formData.append("image", permanentUrl);

      const user = Object.fromEntries(formData.entries());

      // 3. Authenticate and sign up with Better-Auth
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image, // Passed safely as a cloud-hosted URL string!
        role: user.role,
      });

      // if (data) {
      //   router.push("/"); // FIXED: Using client-safe router transition
      // }

      if (data) {
        const role = data.user.role;

        if (role === "organizer") {
          router.push("/dashboard/organizer");
        } else {
          router.push("/dashboard/attendee");
        }
      }

      if (error) {
        alert(error.message || "An authentication error occurred.");
      }
    } catch (error) {
      console.error("You've got an error: ", error);
    }
  };

  return (
    <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4 mx-auto">
      <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
        <Logo />
        <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
          Create an Account
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Join Ticketo to book premium events or host your own organization.
        </p>
      </CardHeader>
      <div className="gap-4">
        <Form onSubmit={handleSubmit} className="space-y-4 w-full">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name" // FIXED: Added name attribute
            placeholder="John Doe"
            labelPlacement="outside"
            startContent={<FaUser className="text-slate-400 text-sm" />}
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
          />

          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email" // FIXED: Added name attribute
            placeholder="john@example.com"
            type="email"
            labelPlacement="outside"
            startContent={<FaEnvelope className="text-slate-400 text-sm" />}
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
          />

          {/* Cleaned up: Removed the obsolete Profile Image URL string input input field */}

          <div className="flex flex-col items-center gap-4 p-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-primary flex items-center justify-center">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile Preview"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Photo</span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered max-w-xs w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500" // FIXED: Typo corrected
            />
          </div>

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password" // FIXED: Added name attribute
            placeholder="••••••••"
            type="password"
            labelPlacement="outside"
            startContent={<FaLock className="text-slate-400 text-sm" />}
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
          />

          <div className="flex flex-col gap-2 w-full">
            <Label
              htmlFor="role"
              className="text-sm font-semibold text-slate-300"
            >
              Select Role
            </Label>
            <Select
              id="role"
              name="role"
              aria-label="Select Role"
              placeholder="Select Role"
              className="w-full"
            >
              <SelectTrigger className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm">
                <SelectValue />
                <SelectIndicator />
              </SelectTrigger>
              <SelectPopover className="bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 min-w-50">
                <ListBox className="outline-none">
                  <ListBoxItem
                    key="attendee"
                    id="attendee"
                    textValue="Attendee"
                    className="p-2 text-white hover:bg-pink-500/20 rounded-lg cursor-pointer"
                  >
                    Attendee (Browse & Book Tickets)
                  </ListBoxItem>
                  <ListBoxItem
                    key="organizer"
                    id="organizer"
                    textValue="Organizer"
                    className="p-2 text-white hover:bg-pink-500/20 rounded-lg cursor-pointer"
                  >
                    Organizer (Create & Host Events)
                  </ListBoxItem>
                </ListBox>
              </SelectPopover>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-linear-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
            radius="lg"
          >
            Create Account
          </Button>
        </Form>

        <div className="flex items-center my-4">
          <div className="grow border-t border-white/5" />
          <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">
            Or Sign Up With
          </span>
          <div className="grow border-t border-white/5" />
        </div>

        <Button
          variant="bordered"
          className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
          radius="lg"
          startContent={<FaGoogle className="text-pink-500" />}
        >
          Google OAuth
        </Button>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-pink-500 hover:text-pink-400 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default RegisterPage;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Bounce } from "react-toastify";

export const runtime = 'edge';

interface QuickContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function QuickContact() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuickContactFormData>();

  const onSubmit: SubmitHandler<QuickContactFormData> = async (data) => {
    setLoading(true);

    const formattedMessage = `
      <b>Name:</b> ${data.name}<br/>
      <b>Phone:</b> ${data.phone}<br/>
      <b>Email:</b> ${data.email}<br/><br/>
    `;
    data.message = formattedMessage;

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);

      toast.success(`Hi ${data.name}, your request was submitted successfully!`, {
        position: "bottom-center",
        autoClose: 5000,
        theme: "colored",
        transition: Bounce,
      });

      reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h6 className="text-white text-left text-[1.777rem] font-dm mb-2 capitalize font-stretch-condensed">
        Quick Contact
      </h6>

      <form className="space-y-4 text-black" onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <Input
          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^[a-zA-Z0-9\s]{3,40}$/,
              message: "Name must be 3–40 characters. Letters, numbers, and spaces only.",
            },
          })}
          placeholder="Your Name"
          className={`h-[60px] px-[15px] py-0 bg-[#f7f8f9] border ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            } rounded-none`}
        />
        {errors.name && <ErrorMessage message={errors.name.message} />}

        {/* Phone Field */}
        <Input
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9]{7,12}$/,
              message: "Phone must be between 7 and 12 digits.",
            },
          })}
          placeholder="Phone Number"
          type="tel"
          className={`h-[60px] px-[15px] py-0 bg-[#f7f8f9] border ${errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            } rounded-none`}
        />
        {errors.phone && <ErrorMessage message={errors.phone.message} />}

        {/* Email Field */}
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address.",
            },
          })}
          placeholder="Your Email"
          type="email"
          className={`h-[60px] px-[15px] py-0 bg-[#f7f8f9] border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            } rounded-none`}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}

        {/* Submit Button */}
        <div className="w-full">
          <Button
            type={loading ? "button" : "submit"}
            disabled={loading}
            className="bg-[#daa521] hover:bg-black hover:text-white transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-white font-semibold h-[51px] px-[30px] pt-[9px] text-[0.875rem] tracking-[0.188rem] uppercase rounded-[1px] font-dm inline-block no-underline"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={30} /> : "Request"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function ErrorMessage({ message }: { message?: string }) {
  return <span className="text-red-700 font-bold py-2 text-sm float-left">{message}</span>;
}

export default QuickContact;
'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler, RegisterOptions } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast, Bounce } from 'react-toastify';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm(): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setLoading(true);

    const htmlMessage = `
      <b>Name:</b> ${data.name}<br/>
      <b>Phone:</b> ${data.phone}<br/>
      <b>Email:</b> ${data.email}<br/><br/>
      <b>Subject:</b> ${data.subject}<br/><br/>
      ${data.message}
    `;
    data.message = htmlMessage;

    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }, // SSR/ISR optimization hint if this moves to server
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);

    toast.success(`Hi ${data.name}, your request was successfully submitted!`, {
      position: 'bottom-center',
      autoClose: 5000,
      theme: 'colored',
      transition: Bounce,
    });

    setLoading(false);
    reset();
  };

  const inputStyle =
    'py-0 px-[15px] bg-[#f7f8f9] h-[60px] border border-[#c4c4c4] border-solid rounded-none text-black';

  const renderInput = (
    name: keyof ContactFormData,
    placeholder: string,
    type: string,
    rules: RegisterOptions<ContactFormData, keyof ContactFormData>
  ) => (
    <div className="px-1">
      <Input
        {...register(name, rules)}
        placeholder={placeholder}
        type={type}
        className={`${inputStyle} ${errors[name] ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {errors[name] && (
        <span className="text-red-700 font-bold py-2 text-sm block">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-black py-12 px-6 md:px-16">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('name', 'Your Name', 'text', {
          required: 'Name is required',
          pattern: {
            value: /^[\w\s]{3,40}$/,
            message: 'Name must be 3–40 characters with letters, numbers & spaces.',
          },
        })}
        {renderInput('phone', 'Phone Number', 'tel', {
          required: 'Phone is required',
          pattern: {
            value: /^\d{7,12}$/,
            message: 'Phone number must be 7–12 digits.',
          },
        })}
        {renderInput('email', 'Your Email', 'email', {
          required: 'Email is required',
        })}
        {renderInput('subject', 'Subject', 'text', {
          required: 'Subject is required',
          pattern: {
            value: /^[\w\s]{3,50}$/,
            message: 'Subject must be 3–50 characters.',
          },
        })}
        <div className="col-span-2 px-1">
          <Input
            {...register('message', {
              required: 'Message is required',
              pattern: {
                value: /^[\w\s]{3,200}$/,
                message: 'Message must be 3–200 characters.',
              },
            })}
            placeholder="Message"
            type="text"
            className={`${inputStyle} ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.message && (
            <span className="text-red-700 font-bold py-2 text-sm block">
              {errors.message.message}
            </span>
          )}
        </div>
        <div className="px-1">
          <Button
            type="submit"
            className="bg-[#daa521] text-white font-semibold uppercase tracking-[0.15em] px-10 h-[51px] hover:bg-black hover:text-white transition hover:-translate-y-1 hover:scale-110"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={24} />
            ) : (
              <span>Request</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Bounce } from "react-toastify";
import { Button } from "@/components/ui/button";

function ContactForm() {
  const [contactFormLoading, setcontactFormLoading] = useState(false);

  interface contactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }
  
  const {
    register: contactForm,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactError },
    reset,
  } = useForm<contactFormData>();

  const onSubmit: SubmitHandler<contactFormData> = async (data) => {
    setcontactFormLoading(true);

    let filterMassage='<b>Name :</b>  '+data.name+'<br/>';
     filterMassage=filterMassage+'<b>Phone :</b>  '+data.phone+'<br/>';
     filterMassage=filterMassage+'<b>Email :</b>  '+data.email+'<br/><br/>';
     filterMassage=filterMassage+'<b>Subject :</b>  '+data.subject+'<br/><br/>'+data.message;

     data.message=filterMassage;

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
      console.log(result);

    setcontactFormLoading(false);

    toast.success(
      "Hi " + data.name + " your request was successfully submitted!",
      {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      }
    );
    reset();
  };

  return (<>
    <div className="bg-black py-12 px-16">

      <form
        className=" grid grid-cols-2 gap-2 space-y-4"
        onSubmit={handleContactSubmit(onSubmit)}
      >
        <div className=" items-left  px-1  ">
          <Input
            {...contactForm("name", {
              required: "Name is required",
              pattern: {
                value: /^[a-zA-Z0-9\s]{3,40}$/,
                message:
                  "Name  must be between 3 and 40 digits and letters, numbers, and spaces are allowed.",
              },
            })}
            placeholder="Your Name"
            type="text"
            className={`py-0 px-[15px] bg-[#f7f8f9] h-[60px] border border-solid border-[#c4c4c4] rounded-none ${
              contactError.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {contactError.name && (
            <span className="text-red-700 font-bold py-2 text-sm float-left">
              {contactError.name.message}
            </span>
          )}
        </div>
        <div className=" items-left px-1 ">
          <Input
            {...contactForm("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{7,12}$/,
                message: "Phone number must be between 7 and 10 digits.",
              },
            })}
            placeholder="Phone Number"
            type="tel"
            className={`py-0 px-[15px] bg-[#f7f8f9] h-[60px] border border-solid border-[#c4c4c4] rounded-none ${
              contactError.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {contactError.phone && (
            <span className="text-red-700 font-bold py-2 text-sm float-left">
              {contactError.phone.message}
            </span>
          )}
        </div>
        <div className=" items-left px-1">
          <Input
            {...contactForm("email", {
              required: "Email is required",
            })}
            placeholder="Your Email"
            type="email"
            className={`py-0 px-[15px] bg-[#f7f8f9] h-[60px] border border-solid border-[#c4c4c4] rounded-none ${
              contactError.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {contactError.email && (
            <span className="text-red-700 font-bold py-2 text-sm float-left">
              {contactError.email.message}
            </span>
          )}
        </div>
        <div className=" items-left px-1">
          <Input
            {...contactForm("subject", {
              required: "Subject is required",
              pattern: {
                value: /^[a-zA-Z0-9\s]{3,50}$/,
                message:
                  "Subject  must be between 3 and 50 digits and letters, numbers, and spaces are allowed.",
              },
            })}
            placeholder="Subject"
            type="text"
            className={`py-0 px-[15px] bg-[#f7f8f9] h-[60px] border border-solid border-[#c4c4c4] rounded-none ${
              contactError.subject
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {contactError.subject && (
            <span className="text-red-700 font-bold py-2 text-sm float-left">
              {contactError.subject.message}
            </span>
          )}
        </div>
        <div className="col-span-2 w-full  items-left ">
          <Input
            {...contactForm("message", {
              required: "Message is required",
              pattern: {
                value: /^[a-zA-Z0-9\s]{3,200}$/,
                message:
                  "Message  must be between 3 and 200 digits and letters, numbers, and spaces are allowed.",
              },
            })}
            placeholder="Message"
            type="text"
            className={`py-0 px-[15px] bg-[#f7f8f9] h-[60px] border border-solid border-[#c4c4c4] rounded-none ${
              contactError.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {contactError.message && (
            <span className="text-red-700 font-bold py-2 text-sm float-left">
              {contactError.message.message}
            </span>
          )}
        </div>
        <div className="   items-left text-left ">
        {contactFormLoading ? (
          <Button
          type="button"
          className="text-white font-[600]  bg-[#daa521] rounded-[1px] pt-[9px]  px-[30px] h-[51px] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-black hover:text-white inline-block no-underline uppercase font-dm text-[0.875rem] tracking-[0.188rem]"
        >
             <Loader2 className="animate-spin mr-2" size={30} />
             </Button>
            ) : (
          <Button
            type="submit"
            className="text-white font-[600]  bg-[#daa521] rounded-[1px] pt-[9px]  px-[30px] h-[51px] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-black hover:text-white inline-block no-underline uppercase font-dm text-[0.875rem] tracking-[0.188rem]"
          >
          
              <span className=" after:content-['']  after:ml-2.5 after:inline-block after:bg-[#2bbdcc] after:right-[17px] after:h-1.5 after:w-1.5 after:transition-all after:duration-200 after:ease-in-out after:top-[50%]  after:transform after:-translate-x-1/2 after:-translate-y-1/2  ">
                Request{" "}
              </span>
         
          </Button>
             )}
        </div>
      </form>
    </div>
    </>
  );
}

export default ContactForm;

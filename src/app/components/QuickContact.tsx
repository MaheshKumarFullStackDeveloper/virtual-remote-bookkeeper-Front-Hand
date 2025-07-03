"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Bounce } from "react-toastify";



function QuickContact() {
  const [quickContactLoading, setquickContactLoading] = useState(false);

  interface QuickContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
  }
  const {
    register: quickContactForm,
    handleSubmit: handleQuickContactSubmit,
    formState: { errors: quickContactError },
    reset,
  } = useForm<QuickContactFormData>();


    const onSubmit: SubmitHandler<QuickContactFormData> = async (data) => {
      setquickContactLoading(true);
  
      let filterMassage='<b>Name :</b>  '+data.name+'<br/>';
       filterMassage=filterMassage+'<b>Phone :</b>  '+data.phone+'<br/>';
       filterMassage=filterMassage+'<b>Email :</b>  '+data.email+'<br/><br/>';
  
       data.message=filterMassage;
  
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
        console.log(result);
  
      setquickContactLoading(false);
  
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

  return (
    <div>
      <h6 className="font-stretch-condensed capitalize font-dm text-[1.777rem] mb-2 text-white text-left ">
        Quick Contact
      </h6>

      <form className="space-y-4 text-black "   onSubmit={handleQuickContactSubmit(onSubmit)}>
        <div className=" items-left ">
          <Input
            {...quickContactForm("name", {
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
              quickContactError.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {quickContactError.name && (
            <span className="text-red-700 font-bold py-2 text-sm float-left">
              {quickContactError.name.message}
            </span>
          )}
        </div>
        <div className=" items-left ">
          <Input
            {...quickContactForm("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{7,12}$/,
                message: "Phone number must be between 7 and 10 digits.",
              },
            })}
            placeholder="Phone Number"
            type="tel"
            className={`py-0 px-[15px] bg-[#f7f8f9] h-[60px] border border-solid border-[#c4c4c4] rounded-none ${
              quickContactError.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {quickContactError.phone && (
            <span className="text-red-700 font-bold py-2 text-sm float-left">
              {quickContactError.phone.message}
            </span>
          )}
        </div>
        <div className=" items-left ">
          <Input
            {...quickContactForm("email", {
              required: "Email is required",
             
            })}
            placeholder="Your Email"
            type="email"
            className={`py-0 px-[15px] bg-[#f7f8f9] h-[60px] border border-solid border-[#c4c4c4] rounded-none ${
              quickContactError.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {quickContactError.email && (
            <span className="text-red-700 font-bold py-2 text-sm float-left">
              {quickContactError.email.message}
            </span>
          )}
        </div>
        <div className=" items-left w-[100%] inline-block">
       {quickContactLoading ? (
                 <Button
                 type="button"
                 className="text-white font-[600]  bg-[#daa521] rounded-[1px] pt-[9px] float-left  px-[30px] h-[51px] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-black hover:text-white inline-block no-underline uppercase font-dm text-[0.875rem] tracking-[0.188rem]"
               >
                    <Loader2 className="animate-spin mr-2" size={30} />
                    </Button>
                   ) : (
                 <Button
                   type="submit"
                   className="text-white font-[600]  bg-[#daa521] float-left rounded-[1px] pt-[9px]  px-[30px] h-[51px] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-black hover:text-white inline-block no-underline uppercase font-dm text-[0.875rem] tracking-[0.188rem]"
                 >
                 
                     <span className=" after:content-['']  after:ml-2.5 after:inline-block after:bg-[#2bbdcc] after:right-[17px] after:h-1.5 after:w-1.5 after:transition-all after:duration-200 after:ease-in-out after:top-[50%]  after:transform after:-translate-x-1/2 after:-translate-y-1/2  ">
                       Request{" "}
                     </span>
                
                 </Button>
                    )}

        </div>
      </form>
    </div>
  );
}

export default QuickContact;

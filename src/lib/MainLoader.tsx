"use client";

import Image from "next/image";

export default function MainLoader() {
  return (
    
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-300 bg-opacity-80 backdrop-blur-md">
      <div className="flex flex-col items-center">
 

<Image src='/theme_images/virtualremote-loader.jpg' alt="loader image" width={150} height={150}/>



        {/* Loading Text */}
        <p className="mt-6 text-xl font-semibold text-gray-700">
          Loading Virtual Remote Book Keeper...
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Your next favorite read is on its way!
        </p>
      </div>
    </div>
  );
}

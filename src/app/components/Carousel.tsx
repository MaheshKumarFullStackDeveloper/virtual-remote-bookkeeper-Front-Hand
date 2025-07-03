"use client"
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  photo: string;
  title: string;
  slug: string;
  created: string;
};

const Carousel = ({ slides }: { slides: Slide[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    duration: 30, // Adjust speed here
    dragFree: true, // Smooth drag behavior
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  
  useEffect(() => {
    const autoScroll = setInterval(() => {
        
        if (emblaApi) {
          emblaApi.scrollNext(); // Move to the next slide
          emblaApi.on("scroll", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
        }
      }, 5000); // Auto-scroll every 2 seconds
  
      return () => {
        clearInterval(autoScroll); // Clean up the interval
      };
  
  }, [emblaApi]);

  return (
    <div className="carousel">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex max-w-[430px] w-full">
          {slides.map((slide, index) => (
            <div key={index} className="flex-none w-full relative">
              <Image
                 width={500}
              height={300}
                src={`/blogs/${slide.photo}` || "/default-image.png"}
                alt={`Slide ${index + 1}`}
                className=""
              />
              <div className="  w-full  text-white py-4">
                 <p className=" tracking-[0.25rem] uppercase mb-0.5 rounded-[0px] text-[#596475] text-[1rem]">{slide.created}</p>
                <a
                  href={slide.slug}
                  className="line-clamp-2 underline-offset-0 text-[30px] mt-[0px] rounded-[30px] text-[#020202] "
                  target="_blank"
                  rel="noopener noreferrer"
                >{slide.title}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="dots flex justify-center mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === selectedIndex ? "bg-blue-500" : "bg-gray-300"} shadow-none outline-none rounded-none p-0 m-0 mx-[3px] h-[4px] w-[15px] border border-blue-500 transition-all ease-in-out duration-500 cursor-pointer `}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

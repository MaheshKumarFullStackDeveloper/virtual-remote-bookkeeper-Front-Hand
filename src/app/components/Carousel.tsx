"use client"
import { Post } from "@/lib/types/types";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";


interface PaginatedResponse {
  data: Post[];


}

const baseUrl = process.env.NEXT_PUBLIC_API; // Load from .env

const fetchPosts = async (
  categoryId?: string
  //category?: string // Optional parameter for category
): Promise<PaginatedResponse> => {

  const params = new URLSearchParams({

    page: "1",
    limit: "5",
    ...(categoryId && categoryId !== "" && { categoryId })
  });
  const homeUrl = process.env.NEXT_PUBLIC_BASE_PATH; // Load from .env
  const res = await fetch(`${baseUrl}/blog?${params.toString()}`, {
    headers: {
      origin: homeUrl ?? ""
    }
  });
  const response = await res.json();

  return { data: response.data.blogsList };
};
const Carousel = ({ catId }: { catId: string }) => {

  const [posts, setPosts] = useState<Post[]>([]); // Explicitly typed


  useEffect(() => {
    const getPosts = async () => {
      const { data } = await fetchPosts(catId);
      if (data.length > 0) {
        setPosts(data);
      }
    };

    getPosts();
  }, [catId]);




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
          {posts.map((slide, index) => (
            <div key={index} className="flex-none w-full relative">
              <Image priority
                sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 993px"

                width={500}
                height={300}
                src={`${slide.image}` || "/default-image.png"}
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
        {posts.map((_, index) => (
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

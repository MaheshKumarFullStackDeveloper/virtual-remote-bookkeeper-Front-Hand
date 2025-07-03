import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


type FAQ = {
  title: string;
  description: string;
};
export function AccordionFaq({ faqs }: { faqs: FAQ[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">

      {faqs && faqs.map((slide: FAQ, index: number) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="p-4 text-[20px] hover:no-underline cursor-pointer leading-[28px] font-bold font-georgia font-stretch-condensed capitalize bg-[#eee]">{slide?.title}</AccordionTrigger>
          <AccordionContent className="border border-solid border-[#cacaca] AccordionContents text-[#dd9933] p-4 text-[16px] font-normal font-mono leading-[25px] "><div
            className="text-left p-8 pt-0 "
            dangerouslySetInnerHTML={{ __html: slide?.description }}
          /></AccordionContent>
        </AccordionItem>
      ))}


    </Accordion>
  );
}

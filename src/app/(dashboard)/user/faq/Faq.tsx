import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from '@/app/data'


export default function Faq() {
  return (
    <div className=' w-full max-w-[1440px] h-full flex flex-col items-center'>

        <div className=' w-full max-w-[1040px] flex flex-col gap-2 items-center justify-center p-4'>

            <img src="/full.png" alt="" className=' w-[250px] md:w-[350px]' />
            <p className=' text-2xl font-semibold text-slate-100 text-center mb-10'>Help Assistance</p>

            {faqs.map((item, index) => (
                <Accordion key={index} type="single" collapsible className=' w-full bg-zinc-900 px-4'>
                <AccordionItem value="item-1">
                    <AccordionTrigger className=' w-full text-lg font-semibold'>{item.question}</AccordionTrigger>
                    <AccordionContent className=' text-sm whitespace-pre-wrap'>
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            ))}
            



        </div>

    </div>
  )
}

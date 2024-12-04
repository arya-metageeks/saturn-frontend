"use client";

import React from "react";
import { HiOutlineMinusCircle } from "react-icons/hi";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { BiPlusCircle } from "react-icons/bi";
import faqs from "../data/faq.json";
import FAQIcon from "../../images/faqIcon.svg"


const StillHaveQuestion = () => {
    return (
        <div className="w-4/5 m-auto bg-[#0C111D] p-8 rounded-l-2xl border-[1px] border-[#475467] flex justify-center items-center">
            <div className="w-3/5 flex flex-col gap-8 items-center" >
                <FAQIcon />
                <div className="w-full text-center">
                    <p className="text-white text-lg">Still have questions?</p>
                    <p className="text-white text-lg">Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
                </div>
                <button className="border-0 bg-white px-5 py-3 text-[#344054] text-center rounded-xl font-bold">
                    Get in touch
                </button>
            </div>
        </div>
    )
}

const FAQ = () => {
  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 ">
        <div className="mx-auto max-w-4xl divide-y divide-white/10">
          <div className="w-full m-auto flex flex-col items-center gap-5">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl text-center w-1/2">
              Frequently asked questions
            </h2>
            <p className="text-white text-xl w-3/5">
              Everything you need to know about the product and billing.
            </p>
          </div>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-6">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-white">
                    <span className="text-base/7 font-semibold">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <BiPlusCircle
                        aria-hidden="true"
                        className="size-6 group-data-[open]:hidden"
                      />
                      <HiOutlineMinusCircle
                        aria-hidden="true"
                        className="size-6 [.group:not([data-open])_&]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-300">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
      <StillHaveQuestion />
    </div>
  );
};

export default FAQ;

import { FaStar } from "react-icons/fa";

export default function TestimonialTemplate() {
  return (
    <section className="w-full bg-transparent text-white px-6 lg:px-8">
      <figure className="mx-auto max-w-2xl">
        <p className="sr-only">5 out of 5 stars</p>
        <div className="flex gap-x-1">
          <FaStar aria-hidden="true" className="size-5 flex-none" color="#FEC84B"/>
          <FaStar aria-hidden="true" className="size-5 flex-none" color="#FEC84B"/>
          <FaStar aria-hidden="true" className="size-5 flex-none" color="#FEC84B"/>
          <FaStar aria-hidden="true" className="size-5 flex-none" color="#FEC84B"/>
          <FaStar aria-hidden="true" className="size-5 flex-none" color="#FEC84B"/>
        </div>
        <blockquote className="mt-10 text-xl/8 font-semibold tracking-tight text-gray-900 sm:text-2xl/9">
          <p className="text-4xl text-white">
          Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.
          </p>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-x-6">
          <div className="text-sm/6">
            <div className="font-semibold text-white">— Mathilde Lewis</div>
            <div className="mt-0.5 text-white">Head of Design, Layers</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}

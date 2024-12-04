import Logo from "../../images/logo.svg"
const Footer = () => {
  return (
    <footer className="bg-[#0C111D] px-[80px] mt-[96px]">
      <div className="mx-auto px-6 pb-8 pt-16 lg:px-8 ">
        <div className="pt-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm/6 font-semibold text-white">
                <Logo />
            </h3>
            <div className="mt-2 text-sm/6 text-[#fff]">
              <ul className="w-full flex justify-around gap-8 mt-8">
                <li className="list-none text-white text-[16px] font-semibold">Overview</li>
                <li className="list-none text-white text-[16px] font-semibold">Features</li>
                <li className="list-none text-white text-[16px] font-semibold">Pricing</li>
                <li className="list-none text-white text-[16px] font-semibold">Careers</li>
                <li className="list-none text-white text-[16px] font-semibold">Help</li>
                <li className="list-none text-white text-[16px] font-semibold">Privacy</li>
              </ul>
            </div>
          </div>
          <div>
            <span className="text-white leading-5 text-sm pb-4">Stay up to date</span>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full min-w-0 appearance-none rounded-md border-0  px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-56 sm:text-sm/6 bg-white"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </form>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between flex justify-between">
          <p className="mt-8 text-sm/6 text-gray-400 md:mt-0">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
          <ul className="flex gap-4 items-center">
            <li className="text-[#667085] text-[16px] font-semibold">Terms</li>
            <li className="text-[#667085] text-[16px] font-semibold">Privacy</li>
            <li className="text-[#667085] text-[16px] font-semibold">Cookies</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

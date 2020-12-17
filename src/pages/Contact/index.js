import React from "react";
import Banner from "./components/Banner";
import { AppButton } from "./../../common/components";

export default function About(props) {
  return (
    <div className="container">
      <Banner />

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="mt-2 text-3xl md:text-4xl font-normal leading-8 tracking-tight text-gray-800 sm:text-4xl">
              <div style={{ width: "100%" }}>
                <iframe
                  title="Box by Box"
                  width="100%"
                  height="600"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=3A%20Idowu%20Matins%20Victoria%20Island%20Lagos+(Box%20by%20Box)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
            </div>
            <div>
              <h2 className="text-3xl text-gray-600 font-bold mb-4">
                Get in Touch{" "}
              </h2>
              <form className="grid grid-cols-3 gap-3">
                <div className="col-span-3 sm:col-span-2">
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Name"
                    id="last_name"
                    autocomplete="family-name"
                    className="mt-1 p-2 border border-solid focus:outline-none focus:ring-indigo-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <input
                    type="text"
                    name="email_address"
                    placeholder="Email Address"
                    id="email_address"
                    autocomplete="email"
                    className="mt-1 p-2 border border-solid focus:outline-none focus:ring-indigo-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <input
                    type="text"
                    name="website"
                    placeholder="Website"
                    id="website"
                    autocomplete="website"
                    className="mt-1 p-2 border border-solid focus:outline-none focus:ring-indigo-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    className="p-2 shadow-sm border-solid focus:outline-none focus:ring-indigo-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  ></textarea>
                </div>
                <div className="col-span-3 sm:col-span-2 mt-2">
                  <AppButton>Send Message</AppButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

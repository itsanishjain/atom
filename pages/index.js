import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import img1 from "../public/img1.png";
import img2 from "../public/img2.png";
import img3 from "../public/img3.png";

export default function Home() {
  return (
    <div className="App">
      <Head>
        <title>Atomizer</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* <div className="text-center text-2xl mt-8">Atom</div> */}
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="text-gray-600">
                    Announcing our next round of funding.{" "}
                    <a href="#" className="font-semibold text-indigo-600">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  Data to enrich your online business
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <a
                    href="#"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                  >
                    Get started
                    <span className="text-indigo-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="#"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Live demo
                    <span className="text-gray-400" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>
              <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <svg
                  className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9089FC" />
                      <stop offset={1} stopColor="#FF80B5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div>
        <section className="" id="feature">
          <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
              <div className="w-full md:w-1/2">
                <div className="w-full h-auto overflow-hidden object-cover">
                  {/* <Image src={hero} alt='hero image' /> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full  pt-7 pb-7 md:pt-20 md:pb-24">
          <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
            <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
              <Image
                src={img1}
                className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "
                width="350px"
                height="350px"
                alt="image"
              />
            </div>

            <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
              <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl text-indigo-400">
                Build a direct, meaningful connection with your audience
              </h2>
              <p className="pt-4 pb-8 m-0 leading-7 text-indigo-100 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                No ads, no trolls, no algorithms.
              </p>
              <ul className="p-0 m-0 leading-6 border-0 border-gray-300 space-y-2">
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-500 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>
                  With W3Commerce, its not about likes and views, you can really{" "}
                  <br />
                  connect with your fans.
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-500 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>
                  ignore the haters and focus on the positive. Id rather have
                  300 <br />
                  patrons than 3 million Instagram followers
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-500 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>
                  Adding support for multiple wallets to the login process
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="w-full  pt-7 pb-7 md:pt-20 md:pb-24">
          <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
            <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10 order-last">
              <Image
                src={img2}
                className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "
                width="350px"
                height="350px"
                alt="image"
              />
            </div>

            <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
              <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-indigo-300 lg:text-3xl md:text-2xl text-indigo-400">
                Develop a recurring income stream Stop rolling the dice of ad
                revenue and per-stream payouts.
              </h2>
              <p className="pt-4 pb-8 m-0 leading-7 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg text-indigo-100">
                Get recurring income through monthly payments from your patrons.
              </p>
              <ul className="p-0 m-0 leading-6 border-0 border-gray-300 space-y-2">
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-500 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>
                  Using Twitter and Discord to authorize
                  <br />
                  projects so that users can&apos;t spam their W3Commerce
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-500 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>
                  Filtering users with multiple accounts automatically
                  <br />
                  by keeping track of their transaction activities
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-500 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>
                  Adding support for multiple wallets to the login process
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="w-full  pt-7 pb-7 md:pt-20 md:pb-24">
          <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
            <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
              <Image
                src={img3}
                className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "
                width="350px"
                height="350px"
                alt="image"
              />
            </div>

            <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
              <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl text-indigo-400">
                give back creative products
              </h2>
              <p className="pt-4 pb-8 m-0 leading-7 text-indigo-100 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                Create what you want and what your audience loves.
              </p>
              <ul className="p-0 m-0 leading-6 border-0 border-gray-300 space-y-2">
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-500 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>
                  No ads, no trolls, no algorithms. Enjoy direct access and
                  deeper
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-500 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>
                  You dont have to conform to popular taste or the constraints
                  of <br />
                  ad-based monetisation models.
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-500 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>
                  Adding support for multiple wallets to the login process
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

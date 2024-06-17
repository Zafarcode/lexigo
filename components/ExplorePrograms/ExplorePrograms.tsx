import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight, User } from 'lucide-react';
import React from 'react';


export default function ExploreProgams() {
  return (

    <section className="  container mt-20 mb-[80px]  body-font  px-5 mx-auto  ">
      <span className="text-[#1A906B]">Explore Programs</span>
      <h2 className=" md:mt-3 max-[567px]:text-2xl   text-4xl font-bold my-4  mb-6">Our Most Popular Classes</h2>
      <p className=" text-gray-600 mb-12">Let's join our famous class, the knowledge provided will definitely be
        useful for you.</p>
      <div className="flex flex-wrap">
        <div className="p-4 md:w-1/3">
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img className="lg:h-48 md:h-36 w-full max-w-[336px] mx-auto my-4 object-cover object-center"
                 src="https://dummyimage.com/336x240"
                 alt="blog" />
            <div className="p-6">
              <span className="tracking-widest text-sm title-font font-medium text-[#1A906B] mb-1">Design</span>
              <div className=" flex  justify-between  items-center ">
                <h3 className="font-bold text-xl mb-2">Figma UI UX Design..</h3>
                <Link href="/#">
                  <ArrowUpRight />
                </Link>
              </div>
              <p className="leading-relaxed mb-3 ">Use Figma to get a job in UI Design, User Interface, User
                Experience design.</p>
              <div className="flex items-center flex-wrap justify-between mt-5 ">
                <div className="flex flex-wrap items-center ">
                  <User size="40" className="bg-slate-400  rounded-3xl overflow-hidden" />
                  <div className=" grid items-center flex-wrap  mx-2  ">
                    <h4>Jane Cooper</h4>
                    <span className="text-sm text-gray-600">2001 Enrolled</span>
                  </div>
                </div>
                <span className="text-[#3FC89E] font-bold text-2xl  inline-flex items-center md:mb-2 lg:mb-0 ">
                    $17.84
                    </span>
              </div>
            </div>
          </div>
        </div>


        <div className="p-4 md:w-1/3">
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img className="lg:h-48 md:h-36 w-full max-w-[336px] mx-auto my-4 object-cover object-center"
                 src="https://dummyimage.com/336x240"
                 alt="blog" />
            <div className="p-6">
              <span className="tracking-widest text-sm title-font font-medium text-[#1A906B] mb-1">Design</span>
              <div className=" flex  justify-between  items-center ">
                <h3 className="font-bold text-xl mb-2">Learn With Shoaib</h3>
                <Link href="/#">
                  <ArrowUpRight />
                </Link>
              </div>
              <p className="leading-relaxed mb-3 ">Design Web Sites and Mobile Apps that Your Users Love and Return
                to Again.</p>
              <div className="flex items-center flex-wrap justify-between mt-5 ">
                <div className="flex flex-wrap items-center ">
                  <User size="40" className="bg-slate-400  rounded-3xl overflow-hidden" />
                  <div className=" grid items-center flex-wrap  mx-2  ">
                    <h4>Jenny Wilson</h4>
                    <span className="text-sm text-gray-600">2001 Enrolled</span>
                  </div>
                </div>
                <span className="text-[#3FC89E] font-bold text-2xl  inline-flex items-center md:mb-2 lg:mb-0 ">
                    $8.99
                    </span>
              </div>
            </div>
          </div>
        </div>


        <div className="p-4 md:w-1/3">
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img className="lg:h-48 md:h-36 w-full max-w-[336px] mx-auto my-4 object-cover object-center"
                 src="https://dummyimage.com/336x240"
                 alt="blog" />
            <div className="p-6">
              <span className="tracking-widest text-sm title-font font-medium text-[#1A906B] mb-1">Design</span>
              <div className=" flex  justify-between  items-center ">
                <h3 className="font-bold text-xl mb-2">Building User Interface..</h3>
                <Link href="/#">
                  <ArrowUpRight />
                </Link>
              </div>
              <p className="leading-relaxed mb-3 ">Learn how to apply User Experience (UX) principles to your
                website designs.</p>
              <div className="flex items-center flex-wrap justify-between mt-5 ">
                <div className="flex flex-wrap items-center ">
                  <User size="40" className="bg-slate-400  rounded-3xl overflow-hidden" />
                  <div className=" grid items-center flex-wrap  mx-2  ">
                    <h4>Esther Howard</h4>
                    <span className="text-sm text-gray-600">2001 Enrolled</span>
                  </div>
                </div>
                <span className="text-[#3FC89E] font-bold text-2xl  inline-flex items-center md:mb-2 lg:mb-0 ">
                    $11.70
                    </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link className="my-6 flex items-center justify-center" href="/#">
        <Button className=" bg-slate-400 font-bold py-2 px-4 rounded">Explore All Programs</Button>
      </Link>
    </section>

  );
}

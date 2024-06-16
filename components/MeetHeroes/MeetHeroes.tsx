import React from 'react';
import Link from 'next/link';
import { User, Twitter, Linkedin } from 'lucide-react';

const MeetHeroes = () => {
  return (
    <div>
      <section className="body-font  ">
        <div className="container justify-between  mx-auto">
          <div className="flex flex-wrap m-4">
            <div className=" w-full my-4 ">
              <h3 className=" w-full max-[567px]:text-2xl text-center font-bold  text-3xl my-5 ">Meet the Heroes
              </h3>
              <p
                className="  max-w-3xl  items-center justify-center mx-auto   text-center  font-normal  text-xl">
                On Weekend UX,
                instructors from all over
                the world instruct
                millions of students. We offer the knowledge and abilities.
              </p>
            </div>

            <div className="p-4 md:w-1/4 max-[567px]:w-full">
              <div className="h-full border-2   border-gray-200  rounded-lg">
                <div className="bg-white  my-6  max-w-sm">
                  <div className="mx-auto flex justify-center items-center ">
                    <User className=" bg-slate-400 rounded-3xl mb-5" size="70" />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-2xl  font-semibold">Theresa Webb</p>
                    <p
                      className=" w-full max-w-[228px] mx-auto  flex justify-center items-start text-green-500 text-base font-normal mb-2  ">Application
                      Support
                      Analyst
                      Lead</p>
                    <p
                      className="w-full max-w-[228px] mx-auto  flex justify-center items-start text-[#667085] text-base font-normal  ">Former
                      co-founder of Opendoor. Early staff at Spotify and
                      Clearbit.</p>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Link href="#" className="text-blue-500 hover:text-blue-600">
                      <Twitter />
                    </Link>
                    <Link href="#" className="text-blue-500 hover:text-blue-600 ml-4">
                      <Linkedin />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:w-1/4 max-[567px]:w-full">
              <div className="h-full border-2  border-gray-200  rounded-lg">
                <div className="bg-white  my-6  max-w-sm">
                  <div className="mx-auto flex justify-center items-center ">
                    <User className=" bg-slate-400 rounded-3xl mb-5" size="70" />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-2xl  font-semibold">Courtney Henry</p>
                    <p
                      className=" w-full max-w-[228px] h-[48px] mx-auto  flex justify-center items-start text-green-500 text-base font-normal   ">Director,
                      Undergraduate Analytics and Planning</p>
                    <p
                      className="w-full max-w-[228px] h-[72px] mx-auto  flex justify-center items-start text-[#667085] text-base font-normal  ">Director,
                      Undergraduate Analytics and Planning</p>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Link href="#" className="text-blue-500 hover:text-blue-600">
                      <Twitter />
                    </Link>
                    <Link href="#" className="text-blue-500 hover:text-blue-600 ml-4">
                      <Linkedin />
                    </Link>
                  </div>
                </div>
              </div>
            </div>


            <div className="p-4 md:w-1/4 max-[567px]:w-full">
              <div className="h-full border-2  border-gray-200  rounded-lg">
                <div className="bg-white  my-6  max-w-sm">
                  <div className="mx-auto flex justify-center items-center ">
                    <User className=" bg-slate-400 rounded-3xl mb-5" size="70" />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-2xl h-[28px] font-semibold">Albert Flores</p>
                    <p
                      className=" w-full max-w-[228px] mx-auto h-[48px] flex justify-center items-start text-green-500 text-base font-normal mb-2  ">Career
                      Educator</p>
                    <p
                      className="w-full max-w-[228px] h-[72px] mx-auto  flex justify-center items-start text-[#667085] text-base font-normal  ">Former
                      PM for Linear, Lambda School, and On Deck.
                    </p>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Link href="#" className="text-blue-500 hover:text-blue-600">
                      <Twitter />
                    </Link>
                    <Link href="#" className="text-blue-500 hover:text-blue-600 ml-4">
                      <Linkedin />
                    </Link>
                  </div>
                </div>
              </div>
            </div>


            <div className="p-4 md:w-1/4 max-[567px]:w-full">
              <div className="h-full border-2  border-gray-200  rounded-lg">
                <div className="bg-white  my-6  max-w-sm">
                  <div className="mx-auto flex justify-center items-center ">
                    <User className=" bg-slate-400 rounded-3xl mb-5" size="70" />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-2xl  font-semibold">Marvin McKinney</p>
                    <p
                      className=" w-full max-w-[228px] h-12 mx-auto  flex justify-center items-start text-green-500 text-base font-normal mb-2  ">Co-op
                      & Internships Program & Operations Manager</p>
                    <p
                      className="w-full max-w-[228px] h-[72px] mx-auto  flex justify-center items-start text-[#667085] text-base font-normal  ">Former
                      frontend dev for Linear, Coinbase, and Postscript.</p>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Link href="#" className="text-blue-500 hover:text-blue-600">
                      <Twitter />
                    </Link>
                    <Link href="#" className="text-blue-500 hover:text-blue-600 ml-4">
                      <Linkedin />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetHeroes;



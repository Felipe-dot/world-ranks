"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import CountryAtrRow from "@/src/components/countryAtrRow";

const CountryPage = ({ params }) => {
  const searchParams = useSearchParams();
  let countryName = searchParams.get("name");
  console.log(countryName);
  return (
    <div className="flex justify-center items-center">
      <div className="relative bottom-20 bg-[--gray-black] shadow-2xl w-1/2 h-[700px] rounded-md z-20">
        {/* Country Flag */}
        <div className="flex items-center justify-center flex-col">
          <Image
            className="rounded-2xl relative bottom-8"
            src={"https://flagcdn.com/bv.svg"}
            height={10}
            width={250}
            alt="Country flag"
          />

          <h1 className="text-[--light-white]">India</h1>
          <h3 className="text-[--light-white]">Republic of India</h3>
          <div className="flex justify-evenly w-[600px]">
            <div className="flex items-center bg-[--gray] rounded-xl p-2">
              <p className="text-[--light-white]">Population</p>
              <hr className=" border ml-2 mr-2 border-black h-full" />
              <p className="text-[--light-white]">1,380,004,385</p>
            </div>
            <div className="flex items-center  bg-[--gray] rounded-xl p-2">
              <p className="text-[--light-white]">Area(km²)</p>
              <hr className=" border ml-2 mr-2 border-black h-full" />
              <p className="text-[--light-white]">1,380,004,385</p>
            </div>
          </div>
        </div>
        <CountryAtrRow title={"Capital"} content={"New Delhi"} />
        <CountryAtrRow title={"Subregion"} content={"Southern Asia"} />
        <CountryAtrRow title={"Language"} content={"English, Hindi, Tamil"} />
        <CountryAtrRow title={"Currencies"} content={"Indian rupee"} />
        <CountryAtrRow title={"Continents"} content={"Asia"} />
        <p className="text-[--gray]">Neighbouring Countries</p>
        {/* Neighbouring Countries */}
        <div className=" flex overflow-y-auto">
          <div className="flex flex-col items-center ml-10 cursor-pointer">
            <Image
              src={"https://flagcdn.com/bv.svg"}
              height={10}
              width={60}
              alt="Country flag"
            />
            <p className="text-[--light-white]">Afghanistan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;

"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import CountryAtrRow from "@/src/components/countryAtrRow";
import { useEffect, useState } from "react";

const CountryPage = () => {
  const [countryDetails, setCountryDetails] = useState([
    {
      name: {
        common: "",
        official: "",
      },
      capital: [],
      subregion: "",
      area: 0,
      languages: {},
      currencies: {},
      continents: [],
      population: 0,
      flags: {
        svg: "",
        alt: "",
      },

      borders: [],
    },
  ]);
  const searchParams = useSearchParams();
  let countryName = searchParams.get("name");

  useEffect(() => {
    const getCountryDetails = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      const data = await response.json();
      setCountryDetails(data);
    };
    getCountryDetails();
  }, []);

  function concatenateCurrencies(data) {
    let currencyNames = [];

    // Concatenate currency names
    for (const currencyCode in data.currencies) {
      currencyNames.push(data.currencies[currencyCode].name);
    }

    // Join the currency names with commas
    return currencyNames.join(", ");
  }

  function concatenateValues(data, key) {
    let concatenatedValues = "";

    if (data.hasOwnProperty(key)) {
      const values = data[key];
      if (Array.isArray(values)) {
        concatenatedValues = values.join(", ");
      } else {
        for (const valueKey in values) {
          if (values.hasOwnProperty(valueKey)) {
            concatenatedValues += values[valueKey] + ", ";
          }
        }
        // Remove trailing comma and space
        concatenatedValues = concatenatedValues.slice(0, -2);
      }
    }

    return concatenatedValues;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="relative bottom-10 bg-[--gray-black] shadow-2xl w-1/2 h-[830px] rounded-lg z-20">
        {/* Country Flag */}
        <div className="flex items-center justify-around h-80 flex-col ">
          <Image
            className="rounded-2xl relative bottom-8"
            src={countryDetails[0].flags.svg}
            height={10}
            width={250}
            alt="Country flag"
          />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[--light-white] text-3xl font-bold">
              {countryDetails[0].name.common}
            </h1>
            <h3 className="text-[--light-white]">
              {countryDetails[0].name.official}
            </h3>
          </div>
          <div className="flex justify-evenly w-[600px] mb-20 mt-10">
            <div className="flex items-center bg-[--gray] rounded-xl p-2 opacity-75">
              <p className="text-[--light-white]">Population</p>
              <hr className=" border ml-2 mr-2 opacity-75 border-black h-full" />
              <p className="text-[--light-white]">
                {countryDetails[0].population
                  .toLocaleString()
                  .replace(/\./g, " ")
                  .replace(",", ",")}
              </p>
            </div>
            <div className="flex items-center  bg-[--gray] rounded-xl p-2 opacity-75">
              <p className="text-[--light-white]">Area(km²)</p>
              <hr className=" border ml-2 mr-2 opacity-75 border-black h-full" />
              <p className="text-[--light-white]">
                {" "}
                {countryDetails[0].area
                  .toLocaleString()
                  .replace(/\./g, " ")
                  .replace(",", ".")}
              </p>
            </div>
          </div>
        </div>
        <CountryAtrRow
          title={"Capital"}
          content={
            countryDetails[0] && countryDetails[0].capital
              ? countryDetails[0].capital.join(", ")
              : "Not have a capital"
          }
        />
        <CountryAtrRow
          title={"Subregion"}
          content={countryDetails[0].subregion}
        />
        <CountryAtrRow
          title={"Language"}
          content={concatenateValues(countryDetails[0], "languages")}
        />
        <CountryAtrRow
          title={"Currencies"}
          content={concatenateCurrencies(countryDetails[0])}
        />
        <CountryAtrRow
          title={"Continents"}
          content={concatenateValues(countryDetails[0], "continents")}
        />
        <p className="text-[--gray] ml-5 mt-2 mb-4">Neighbouring Countries</p>
        {/* Neighbouring Countries */}
        <div className="flex overflow-y-auto">
          <div className="flex flex-col items-center ml-5 cursor-pointer">
            <Image
              src={"https://flagcdn.com/bv.svg"}
              height={10}
              width={60}
              alt="Country flag"
            />
            <p className="text-[--light-white] mt-2">Afghanistan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;

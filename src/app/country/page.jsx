"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  const [countryBorder, setCountryBorder] = useState([]);

  const searchParams = useSearchParams();
  let countryName = searchParams.get("name");

  async function fetchCountryInfo(code) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags`
      );
      if (!response.ok) {
        throw new Error(
          `Erro ao buscar informações do país ${code}: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function fetchAndSaveCountriesInfo(borders) {
    const allCountriesInfo = [];

    for (const code of borders) {
      const countryInfo = await fetchCountryInfo(code);
      if (countryInfo) {
        allCountriesInfo.push(countryInfo);
      }
    }

    setCountryBorder(allCountriesInfo);
  }

  useEffect(() => {
    const getCountryDetails = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      const data = await response.json();
      setCountryDetails(data);
      if (data[0].borders != undefined) {
        await fetchAndSaveCountriesInfo(data[0].borders);
      }
    };
    getCountryDetails();
  }, [countryName]);

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
      <div className="relative  md:bottom-10 bg-[--gray-black] md:shadow-2xl w-screen md:w-2/3 lg:w-1/2 h-[830px] rounded-lg z-20">
        {/* Country Flag */}
        <div className="flex items-center justify-around h-80 flex-col ">
          <div
            className={`w-[220px] ${
              countryName == "Vatican City" ? "lg:w-[220px]" : "lg:w-[330px]"
            } mb-5`}
          >
            <Image
              className="rounded-2xl"
              width={0}
              height={0}
              src={countryDetails[0].flags.svg}
              layout="responsive"
              alt="Country flag"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[--light-white] text-center text-3xl font-bold">
              {countryDetails[0].name.common}
            </h1>
            <h3 className="text-[--light-white]">
              {countryDetails[0].name.official}
            </h3>
          </div>
          <div className="flex justify-evenly w-screen  md:w-[600px] mb-20 mt-10">
            <div className="flex items-center bg-[--gray] rounded-xl p-2 opacity-75">
              <p className="text-[--light-white] text-xs sm:text-base">
                Population
              </p>
              <hr className=" border ml-2 mr-2 opacity-75 border-black h-full" />
              <p className="text-[--light-white] text-xs sm:text-base">
                {countryDetails[0].population
                  .toLocaleString()
                  .replace(/\./g, " ")
                  .replace(",", ",")}
              </p>
            </div>
            <div className="flex items-center  bg-[--gray] rounded-xl p-2 opacity-75">
              <p className="text-[--light-white]  text-xs sm:text-base">
                Area(km²)
              </p>
              <hr className=" border ml-2 mr-2 opacity-75 border-black h-full" />
              <p className="text-[--light-white]  text-xs sm:text-base">
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
          {countryBorder.map((neighbourCountry) => (
            <>
              <Link href={`/country?name=${neighbourCountry.name.common}`}>
                <div className="flex flex-col items-center ml-5 cursor-pointer">
                  <Image
                    src={neighbourCountry.flags.svg}
                    height={10}
                    width={60}
                    alt={neighbourCountry.flags.alt ?? "frag country"}
                  />
                  <p className="text-[--light-white] mt-2">
                    {neighbourCountry.name.common}
                  </p>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryPage;

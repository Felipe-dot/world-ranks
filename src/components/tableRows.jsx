"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TableRows = ({
  countries,
  setCountries,
  orderProp = "population",
  setCountriesFounded,
  inputValue,
  arrOfRegions,
  checkMuInput,
  checkIndpInput,
}) => {
  const [amountOfCountries, setAmountOfCountries] = useState(10);
  const [filterCountries, setFilterCountries] = useState([]);
  const router = useRouter();

  const options = {
    keys: ["region", "subregion", "name.common", "independent", "unMember"],
    minMatchCharLength: 1,
    includeScore: true,
    useExtendedSearch: true,
    threshold: 0.2,
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      const fuse = new Fuse(countries, options);
      const results = fuse.search(inputValue);
      const filteredCountries = results.map((e) => e.item);
      setFilterCountries(filteredCountries);
    } else {
      setFilterCountries([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setAmountOfCountries((prev) => prev + 10);
    }
  };

  function orderBy(array, prop) {
    return array.sort(function (a, b) {
      if (prop == "name") {
        if (a[prop].common > b[prop].common) {
          return -1;
        }
        if (a[prop].common < b[prop].common) {
          return 1;
        }
      }

      if (a[prop] > b[prop]) {
        return -1;
      }
      if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    });
  }

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const arrayOrder = orderBy(data, orderProp);
      setCountriesFounded(arrayOrder.length);
      setCountries(arrayOrder);
    };

    if (countries.length === 0) {
      fetchCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const arrayOrder = orderBy(countries, orderProp);
    setCountries([...arrayOrder]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderProp]);

  useEffect(() => {
    if (checkIndpInput && checkMuInput) {
      const filteredCountries = countries.filter(
        (e) => e.unMember === checkMuInput && e.independent === checkIndpInput
      );
      setFilterCountries(filteredCountries);
      setCountriesFounded(filteredCountries.length);
    } else if (checkMuInput) {
      const filteredCountries = countries.filter(
        (e) => e.unMember === checkMuInput
      );
      setFilterCountries(filteredCountries);
      setCountriesFounded(filteredCountries.length);
    } else if (checkIndpInput) {
      const filteredCountries = countries.filter(
        (e) => e.independent === checkIndpInput
      );
      setFilterCountries(filteredCountries);
      setCountriesFounded(filteredCountries.length);
    } else {
      setFilterCountries([]);
      setCountriesFounded(250);
    }
  }, [checkIndpInput, checkMuInput]);

  useEffect(() => {
    if (arrOfRegions.length > 0) {
      const fuse = new Fuse(countries, options);
      const results = [];
      arrOfRegions.forEach((e) => {
        const searchResults = fuse.search(e);
        results.push(...searchResults);
      });
      const filteredCountries = results.map((e) => e.item);
      setFilterCountries(filteredCountries);
      setCountriesFounded(filteredCountries.length);
    } else {
      setFilterCountries([]);
      setCountriesFounded(250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrOfRegions]);

  const handleClick = (country) => {
    router.push(`/country?name=${country.name.common}`);
  };

  return (
    <div
      className="md:ml-5 lg:ml-20 xl:ml-7 h-[600px] w-full overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
      onScroll={handleScroll}
      key={"country-table"}
    >
      <table className="table-auto border-separate border-spacing-y-5 appearance-none mt-4 md:w-11/12 xl:w-full xl:pr-5 w-full">
        <thead>
          <tr>
            <th className="text-[--gray] text-sm  text-left w-32 xl:w-24 2xl:w-auto border-b-2 border-[--gray] pb-2">
              Flag
            </th>
            <th className="text-[--gray] text-sm  text-left md:w-72  sm:w-42 w-36 xl:w-44  2xl:w-auto border-b-2 border-[--gray] pb-2">
              Name
            </th>
            <th className="text-[--gray]  text-sm text-left md:w-60 lg:w-auto xl:w-56 2xl:w-auto border-b-2 border-[--gray] pb-2 ">
              Population
            </th>
            <th className="text-[--gray]  text-sm text-left border-b-2 xl:w-56 2xl:w-auto  border-[--gray] pb-2 hidden sm:table-cell">
              Area(km²)
            </th>
            <th className="lg:table-cell  text-sm hidden text-[--gray]  text-left border-b-2 border-[--gray] pb-2">
              Region
            </th>
          </tr>
        </thead>
        <tbody>
          {filterCountries.length === 0
            ? countries.map(
                (country, idx) =>
                  idx < amountOfCountries && (
                    <tr
                      key={country.name.common}
                      className="cursor-pointer"
                      onClick={() => handleClick(country)}
                    >
                      <td>
                        <div className="w-[60px] ">
                          <Image
                            className="rounded-md"
                            src={country.flags.svg}
                            width={0}
                            height={0}
                            layout="responsive"
                            alt={country.flags.alt ?? "country flag"}
                          />
                        </div>
                      </td>
                      <td className="text-[--light-white] font-semibold  lg:text-lg xl:text-base  text-sm">
                        {country.name.common}
                      </td>
                      <td className="text-[--light-white] font-semibold  lg:text-lg xl:text-base  text-sm">
                        {country.population
                          .toLocaleString()
                          .replace(/\./g, " ")
                          .replace(",", ",")}
                      </td>
                      <td className="text-[--light-white] font-semibold  lg:text-lg text-sm xl:text-base hidden sm:table-cell">
                        {country.area
                          .toLocaleString()
                          .replace(/\./g, " ")
                          .replace(",", ".")}
                      </td>
                      <td className="lg:block hidden text-[--light-white] font-semibold  lg:text-lg xl:text-base  text-sm">
                        {country.region}
                      </td>
                    </tr>
                  )
              )
            : filterCountries.map(
                (country, idx) =>
                  idx < amountOfCountries && (
                    <tr
                      key={country.name.common}
                      className="cursor-pointer"
                      onClick={() => handleClick(country)}
                    >
                      <td>
                        <div className="w-[60px] ">
                          <Image
                            className="rounded-md"
                            src={country.flags.svg}
                            width={0}
                            height={0}
                            layout="responsive"
                            alt={country.flags.alt ?? "country flag"}
                          />
                        </div>
                      </td>
                      <td className="text-[--light-white] font-semibold lg:text-lg  xl:text-base text-sm">
                        {country.name.common}
                      </td>
                      <td className="text-[--light-white] font-semibold lg:text-lg  xl:text-base text-sm">
                        {country.population
                          .toLocaleString()
                          .replace(/\./g, " ")
                          .replace(",", ",")}
                      </td>
                      <td className="text-[--light-white] font-semibold lg:text-lg text-sm  xl:text-base hidden sm:table-cell ">
                        {country.area
                          .toLocaleString()
                          .replace(/\./g, " ")
                          .replace(",", ".")}
                      </td>
                      <td className="text-[--light-white] font-semibold lg:text-lg text-sm lg:block   xl:text-base hidden">
                        {country.region}
                      </td>
                    </tr>
                  )
              )}
        </tbody>
      </table>
    </div>
  );
};

export default TableRows;

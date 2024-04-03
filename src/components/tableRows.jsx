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
        if (a[prop].common < b[prop].common) {
          return -1;
        }
        if (a[prop].common > b[prop].common) {
          return 1;
        }
      }

      if (a[prop] < b[prop]) {
        return -1;
      }
      if (a[prop] > b[prop]) {
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
    } else if (checkMuInput) {
      const filteredCountries = countries.filter(
        (e) => e.unMember === checkMuInput
      );
      setFilterCountries(filteredCountries);
    } else if (checkIndpInput) {
      const filteredCountries = countries.filter(
        (e) => e.independent === checkIndpInput
      );
      setFilterCountries(filteredCountries);
    } else {
      setFilterCountries([]);
    }

    // countries.forEach((e) => console.log(e.unMember, e.independent));
  }, [checkIndpInput, checkMuInput]);

  console.log(filterCountries);

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
    } else {
      setFilterCountries([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrOfRegions]);

  const handleClick = (country) => {
    router.push(`/country?name=${country.name.common}`);
  };

  return (
    <div
      className="ml-20 h-[600px] w-full overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
      onScroll={handleScroll}
      key={"country-table"}
    >
      <table className="table-auto border-separate border-spacing-y-5  appearance-none mt-4 w-11/12">
        <thead>
          <tr>
            <th className="text-[--gray] text-left w-32 border-b-2 border-[--gray] pb-2">
              Flag
            </th>
            <th className="text-[--gray] text-left w-72 border-b-2 border-[--gray] pb-2">
              Name
            </th>
            <th className="text-[--gray] text-left border-b-2 border-[--gray] pb-2 ">
              Population
            </th>
            <th className="text-[--gray] text-left border-b-2 border-[--gray] pb-2">
              Area(km²)
            </th>
            <th className="text-[--gray] text-left border-b-2 border-[--gray] pb-2">
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
                        <Image
                          src={country.flags.svg}
                          width={80}
                          height={10}
                          alt={country.flags.alt ?? "country flag"}
                        />
                      </td>
                      <td className="text-[--light-white] font-semibold text-lg">
                        {country.name.common}
                      </td>
                      <td className="text-[--light-white] font-semibold text-lg">
                        {country.population
                          .toLocaleString()
                          .replace(/\./g, " ")
                          .replace(",", ",")}
                      </td>
                      <td className="text-[--light-white] font-semibold text-lg">
                        {country.area
                          .toLocaleString()
                          .replace(/\./g, " ")
                          .replace(",", ".")}
                      </td>
                      <td className="text-[--light-white] font-semibold text-lg">
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
                        <Image
                          src={country.flags.svg}
                          width={80}
                          height={10}
                          alt={country.flags.alt ?? "country flag"}
                        />
                      </td>
                      <td className="text-[--light-white] font-semibold text-lg">
                        {country.name.common}
                      </td>
                      <td className="text-[--light-white] font-semibold text-lg">
                        {country.population
                          .toLocaleString()
                          .replace(/\./g, " ")
                          .replace(",", ",")}
                      </td>
                      <td className="text-[--light-white] font-semibold text-lg">
                        {country.area
                          .toLocaleString()
                          .replace(/\./g, " ")
                          .replace(",", ".")}
                      </td>
                      <td className="text-[--light-white] font-semibold text-lg">
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

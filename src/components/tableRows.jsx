"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const TableRows = ({
  countries,
  setCountries,
  orderProp = "population",
  setCountriesFounded,
}) => {
  const [amountOfCountries, setAmountOfCountries] = useState(10);

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
  }, []);

  useEffect(() => {
    const arrayOrder = orderBy(countries, orderProp);
    setCountries([...arrayOrder]);
  }, [orderProp]);

  return (
    <div
      className="ml-20 h-[600px] w-full overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
      onScroll={handleScroll}
      key={"ABACATE"}
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
          {countries.map(
            (country, idx) =>
              idx < amountOfCountries && (
                <tr key={country.name.common} className="cursor-pointer">
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

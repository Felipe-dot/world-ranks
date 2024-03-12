"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const TableRows = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  return countries.map(
    (country, idx) =>
      idx < 20 && (
        <tr key={idx}>
          <td>
            <Image
              src={country.flags.svg}
              width={80}
              height={10}
              alt={country.flags.alt}
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
  );
};

export default TableRows;

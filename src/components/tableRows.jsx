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
      idx < 5 && (
        <tr key={idx}>
          <td className="text-[--light-white">
            <Image
              src={country.flags.svg}
              width={80}
              height={10}
              alt={country.flags.alt}
            />
          </td>
          <td className="text-[--light-white]">{country.name.common}</td>
          <td className="text-[--light-white]">{country.population}</td>
          <td className="text-[--light-white]">{country.area}</td>
          <td className="text-[--light-white]">{country.region}</td>
        </tr>
      )
  );
};

export default TableRows;

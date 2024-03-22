"use client";

import { useSearchParams } from "next/navigation";

const CountryPage = ({ params }) => {
  const searchParams = useSearchParams();
  let countryName = searchParams.get("name");
  console.log(countryName);
  return <div>CountryPage</div>;
};

export default CountryPage;

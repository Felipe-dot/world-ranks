"use client";

import Image from "next/image";
import CheckInput from "../components/checkInput";
import RegionTag from "../components/regionTag";
import TableRows from "../components/tableRows";

import { useState } from "react";

const Home = () => {
  const [orderProp, setOrderProp] = useState("population");
  const [countries, setCountries] = useState([]);
  const [countriesFounded, setCountriesFounded] = useState(250);
  const [arrOfRegions, setArrOfRegions] = useState([]);
  const [checkMuInput, setCheckMuInput] = useState(false);
  const [checkIndpInput, setCheckIndpInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setOrderProp(event.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative md:bottom-20 bg-[--gray-black] md:shadow-2xl w-11/12 h-[700px] rounded-md z-20">
        <div className="flex mt-4 items-center justify-between md:ml-5 md:mr-5">
          <h3 className="text-[--gray]  text-sm sm:text-base font-semibold">
            Found {countriesFounded} countries
          </h3>
          <div className="relative w-80 md:w-auto">
            <div className="absolute inset-y-0 left-2 flex items-center ">
              <Image
                src="Search.svg"
                width={25}
                height={25}
                alt="Search logo"
              />
            </div>
            <input
              className="pl-10 appearance-none focus:outline-none p-2 rounded-lg w-full md:w-96 bg-[--dark-black] shadow-md text-[--light-white] text-sm md:text-base "
              type="text"
              name="searchby"
              id="srcby"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.currentTarget.value);
              }}
              placeholder="Search by Name, Region, Subregion"
            />
          </div>
        </div>
        <div className="md:ml-5 flex-col md:flex md:flex-row justify-between">
          <div className="flex flex-col h-96 justify-between">
            {/* Sort by */}
            <div>
              <p className="text-[--gray] mb-2 mt-8 text-sm font-semibold">
                Sort By
              </p>
              <div className="relative">
                <div className="absolute inset-y-5 right-0 flex items-center px-2">
                  <Image
                    src="Expand_down.svg"
                    width={25}
                    height={25}
                    alt="expand down logo"
                  />
                </div>
              </div>
              <select
                className="appearance-none focus:outline-none rounded-lg w-full md:w-72 p-2 pl-2 bg-[--gray-black] text-[--light-white] border-2 border-[--gray] mb-4"
                name="sortBy"
                value={orderProp}
                onChange={handleChange}
              >
                <option value="population">Population</option>
                <option value="name">Name</option>
                <option value="area">Area</option>
              </select>
            </div>
            {/* Region */}
            <div>
              <p className="text-[--gray] mb-2 text-sm font-semibold">Region</p>
              {/* Tags */}
              <div className="grid grid-cols-6 md:grid-cols-3 gap-2 mb-5">
                <RegionTag
                  region="Americas"
                  arrOfRegions={arrOfRegions}
                  setArrOfRegions={setArrOfRegions}
                />
                <RegionTag
                  region="Antarctic"
                  arrOfRegions={arrOfRegions}
                  setArrOfRegions={setArrOfRegions}
                />
                <RegionTag
                  region="Africa"
                  arrOfRegions={arrOfRegions}
                  setArrOfRegions={setArrOfRegions}
                />
                <RegionTag
                  region="Asia"
                  arrOfRegions={arrOfRegions}
                  setArrOfRegions={setArrOfRegions}
                />
                <RegionTag
                  region="Europe"
                  arrOfRegions={arrOfRegions}
                  setArrOfRegions={setArrOfRegions}
                />
                <RegionTag
                  region="Oceania"
                  arrOfRegions={arrOfRegions}
                  setArrOfRegions={setArrOfRegions}
                />
              </div>
            </div>
            <div>
              <p className="text-[--gray] mb-2 text-sm font-semibold ">
                Status
              </p>
              <CheckInput
                inputText="Member of the United Nations"
                checkInput={checkMuInput}
                setCheckInput={setCheckMuInput}
              />
              <CheckInput
                inputText="Independent"
                checkInput={checkIndpInput}
                setCheckInput={setCheckIndpInput}
              />
            </div>
          </div>
          <TableRows
            countries={countries}
            setCountries={setCountries}
            orderProp={orderProp}
            arrOfRegions={arrOfRegions}
            setCountriesFounded={setCountriesFounded}
            checkMuInput={checkMuInput}
            checkIndpInput={checkIndpInput}
            inputValue={inputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

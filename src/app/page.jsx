import Image from "next/image";

const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative bottom-10 bg-[--gray-black] shadow-2xl w-11/12 h-[700px] rounded-md z-20">
        <div className="flex mt-4 items-center justify-between ml-5 mr-5">
          <h3 className="text-[--gray] font-semibold">Found 234 countries</h3>
          <div className="relative">
            <div className="absolute inset-y-0 left-2 flex items-center ">
              <Image
                src="Search.svg"
                width={25}
                height={25}
                alt="Search logo"
              />
            </div>
            <input
              className="pl-10 appearance-none focus:outline-none p-2 rounded-lg w-80 bg-[--dark-black] shadow-md text-[--light-white] "
              type="text"
              name=""
              id=""
              placeholder="Search by Name, Region, Subregion"
            />
          </div>
        </div>
        <div className="ml-5 flex justify-between">
          <div className="flex flex-col h-80 justify-around">
            {/* Sort by */}
            <div>
              <p className="text-[--gray] mb-2">Sort By</p>
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
                className="appearance-none focus:outline-none rounded-lg w-64 p-1 pl-2 bg-[--gray-black] text-[--light-white] border-2 border-[--gray]"
                name="sortBy"
                id="sb"
              >
                <option value="population">Population</option>
                <option value="name">Name</option>
                <option value="area">Area</option>
                <option value="region">Region</option>
              </select>
            </div>
            {/* Region */}
            <div>
              <p className="text-[--gray] mb-2">Region</p>
              {/* Tags */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <p className="flex items-center justify-center rounded-lg p-1 text-[--light-white] bg-[--gray]">
                  Americas
                </p>
                <p className="text-[--gray] font-medium cursor-pointer">
                  Antarctic
                </p>
                <p className="text-[--gray] font-medium cursor-pointer">
                  Africa
                </p>
                <p className="text-[--gray] font-medium cursor-pointer">Asia</p>
                <p className="text-[--gray] font-medium cursor-pointer">
                  Europe
                </p>
                <p className="text-[--gray] font-medium cursor-pointer">
                  Oceania
                </p>
              </div>
            </div>
            <div>
              <p className="text-[--gray] mb-2">Status</p>
              <div className="relative">
                {false && (
                  <div className="absolute inset-y-3 flex items-center justify-center">
                    <Image
                      src="Done_round.svg"
                      height={22}
                      width={22}
                      alt="Done round logo"
                    />
                  </div>
                )}
              </div>
              <div className="flex mb-2">
                <input
                  className="w-[1.4em] h-[1.4em] cursor-pointer mr-4 appearance-none border-[1px] rounded-lg checked:bg-[--blue]"
                  type="checkbox"
                  name="Member of the United Nations"
                  id="mun"
                  value="Member"
                />
                <label className="text-[--light-white] font-semibold">
                  Member of the United Nations
                </label>
              </div>
              <div className="relative">
                {false && (
                  <div className="absolute inset-y-3 flex items-center justify-center">
                    <Image
                      src="Done_round.svg"
                      height={22}
                      width={22}
                      alt="Done round logo"
                    />
                  </div>
                )}
              </div>
              <div className="flex">
                <input
                  className="w-[1.4em] h-[1.4em] cursor-pointer mr-4 appearance-none border-[1px] rounded-lg checked:bg-[--blue]"
                  type="checkbox"
                  name="Independent"
                  id="idpt"
                  value="Independent"
                />
                <label className="text-[--light-white] font-semibold">
                  Independent
                </label>
              </div>
            </div>
          </div>
          <table className="appearance-none mt-4 w-10/12 border-2 border-red-500">
            <thead>
              <tr className="">
                <th className="text-[--gray] text-left">Flag</th>
                <th className="text-[--gray] text-left">Name</th>
                <th className="text-[--gray] text-left">Population</th>
                <th className="text-[--gray] text-left">Area(km²)</th>
                <th className="text-[--gray] text-left">Region</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-[--light-white]">Bandeira</td>
                <td className="text-[--light-white]">China</td>
                <td className="text-[--light-white]">1,402,112,000</td>
                <td className="text-[--light-white]">9,706,961</td>
                <td className="text-[--light-white]">Asia</td>
              </tr>
              <tr>
                <td className="text-[--light-white]">Bandeira</td>
                <td className="text-[--light-white]">China</td>
                <td className="text-[--light-white]">1,402,112,000</td>
                <td className="text-[--light-white]">9,706,961</td>
                <td className="text-[--light-white]">Asia</td>
              </tr>
              <tr>
                <td className="text-[--light-white]">Bandeira</td>
                <td className="text-[--light-white]">China</td>
                <td className="text-[--light-white]">1,402,112,000</td>
                <td className="text-[--light-white]">9,706,961</td>
                <td className="text-[--light-white]">Asia</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;

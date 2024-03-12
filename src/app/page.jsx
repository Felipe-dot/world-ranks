import Image from "next/image";
import CheckInput from "../components/checkInput";
import RegionTag from "../components/regionTag";
import TableRows from "../components/tableRows";

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
                <RegionTag selected={true} region="Americas" />
                <RegionTag selected={false} region="Antarctic" />
                <RegionTag selected={false} region="Africa" />
                <RegionTag selected={false} region="Europe" />
                <RegionTag selected={false} region="Oceania" />
              </div>
            </div>
            <div>
              <p className="text-[--gray] mb-2">Status</p>
              <CheckInput inputText="Member of the United Nations" />
              <CheckInput inputText="Independent" />
            </div>
          </div>
          <div className="ml-20 h-[600px] w-full overflow-y-auto">
            <table className="table-auto border-separate border-spacing-y-5  appearance-none mt-4 w-11/12">
              <thead>
                <tr>
                  <th className="text-[--gray] text-left w-32 border-b-2 border-[--gray]">
                    Flag
                  </th>
                  <th className="text-[--gray] text-left w-72 border-b-2 border-[--gray]">
                    Name
                  </th>
                  <th className="text-[--gray] text-left border-b-2 border-[--gray] ">
                    Population
                  </th>
                  <th className="text-[--gray] text-left border-b-2 border-[--gray]">
                    Area(km²)
                  </th>
                  <th className="text-[--gray] text-left border-b-2 border-[--gray]">
                    Region
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableRows />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

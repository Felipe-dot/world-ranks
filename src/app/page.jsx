import Image from "next/image";

const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative bottom-10 bg-[--gray-black] shadow-2xl w-11/12 h-[700px] rounded-md z-20">
        <div className="flex mt-4 items-center justify-between ml-5 mr-5">
          <h3 className="text-[--gray]">Found 234 countries</h3>
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
              className="pl-10 appearance-none focus:outline-none p-2 rounded-lg w-80 bg-[--dark-black] shadow-md text-[--light-white]"
              type="text"
              name=""
              id=""
              placeholder="Search by Name, Region, Subregion"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p>Sort By</p>
            <input
              list="sort"
              id="sortBy"
              name="sortBy"
              placeholder="Select a type"
              value="Population"
            />
            <datalist id="sort">
              <option value="Population" />
              <option value="Name" />
              <option value="Area" />
              <option value="Region" />
            </datalist>
            <p>Region</p>
            {/* Tags */}
            <div>
              <p>Americas</p>
              <p>Antarctic</p>
              <p>Africa</p>
              <p>Asia</p>
              <p>Europe</p>
              <p>Oceania</p>
            </div>
            <p>Status</p>
            <div className="flex">
              <input
                type="checkbox"
                name="Member of the United Nations"
                id="mun"
                value="Member"
              />
              <label>Member of the United Nations</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                name="Independent"
                id="idpt"
                value="Independent"
              />

              <label>Independent</label>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Flag</th>
                <th>Name</th>
                <th>Population</th>
                <th>Area(km²)</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bandeira</td>
                <td>China</td>
                <td>1,402,112,000</td>
                <td>9,706,961</td>
                <td>Asia</td>
              </tr>
              <tr>
                <td>Bandeira</td>
                <td>China</td>
                <td>1,402,112,000</td>
                <td>9,706,961</td>
                <td>Asia</td>
              </tr>
              <tr>
                <td>Bandeira</td>
                <td>China</td>
                <td>1,402,112,000</td>
                <td>9,706,961</td>
                <td>Asia</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;

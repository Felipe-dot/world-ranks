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
      </div>
    </div>
  );
};

export default Home;

const RegionTag = ({ region, arrOfRegions, setArrOfRegions }) => {
  const setRegionTag = () => {
    if (arrOfRegions.includes(region)) {
      setArrOfRegions((prevArr) => prevArr.filter((r) => r !== region));
    } else {
      setArrOfRegions((prevArr) => [...prevArr, region]);
      console.log(arrOfRegions);
    }
  };
  return (
    <p
      onClick={() => setRegionTag()}
      className={`${
        arrOfRegions.includes(region)
          ? "flex items-center justify-center rounded-lg p-1 text-[--light-white] bg-[--gray] cursor-pointer sm:text-base text-xs"
          : "flex items-center justify-center text-[--gray] font-medium cursor-pointer  sm:text-base text-xs"
      } `}
    >
      {region}
    </p>
  );
};

export default RegionTag;

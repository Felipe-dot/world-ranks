const RegionTag = ({ region, arrOfRegions }) => {
  return (
    <p
      className={`${
        arrOfRegions.includes(region)
          ? "flex items-center justify-center rounded-lg p-1 text-[--light-white] bg-[--gray]"
          : "flex items-center justify-center text-[--gray] font-medium cursor-pointer"
      } `}
    >
      {region}
    </p>
  );
};

export default RegionTag;

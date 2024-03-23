const CountryAtrRow = ({ title, content }) => {
  return (
    <div className="flex justify-between border-t border-b border-t-[--gray] border-b-[--gray] p-5">
      <p className="text-[--gray] ml-5">{title}</p>
      <p className="text-[--light-white] mr-5">{content}</p>
    </div>
  );
};

export default CountryAtrRow;

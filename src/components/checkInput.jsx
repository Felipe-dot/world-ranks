import Image from "next/image";

const CheckInput = ({ inputText, checkInput, setCheckInput }) => {
  const setInput = () => {
    setCheckInput((prev) => !prev);
  };
  return (
    <>
      <div className="relative">
        {checkInput && (
          <div
            className="absolute inset-y-3 flex items-center justify-center cursor-pointer"
            onClick={() => setInput()}
          >
            <Image
              src="Done_round.svg"
              height={22}
              width={22}
              alt="Done round logo"
            />
          </div>
        )}
      </div>
      <div className="flex mb-2 items-center">
        <input
          className="w-[1.5em] h-[1.5em] cursor-pointer mr-4 appearance-none border-[1px] rounded-md checked:bg-[--blue]"
          type="checkbox"
          name={inputText}
          id={inputText}
          checked={checkInput}
          onChange={() => setInput()}
        />
        <label
          className="text-[--light-white] text-xs sm:text-base font-semibold 
        "
        >
          {inputText}
        </label>
      </div>
    </>
  );
};

export default CheckInput;

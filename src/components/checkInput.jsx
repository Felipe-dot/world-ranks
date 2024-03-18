import Image from "next/image";

const CheckInput = ({ inputText }) => {
  return (
    <>
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
          name={inputText}
          id={inputText}
          value="Member"
        />
        <label className="text-[--light-white] font-semibold">
          {inputText}
        </label>
      </div>
    </>
  );
};

export default CheckInput;

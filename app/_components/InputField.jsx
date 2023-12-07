const InputField = ({
  placeholder,
  width,
  height,
  onChange,
  value,
  name,
  type,
}) => {
  return (
    <div
      className={`grow ${width} shrink ${height} basis-0 px-2 py-3 bg-stone-50 rounded-[10px] justify-start items-center gap-4 flex`}
    >
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-none bg-transparent h-full w-full focus:border-none focus:outline-none text-base font-medium font-['Poppins']"
      />
    </div>
  );
};

export default InputField;

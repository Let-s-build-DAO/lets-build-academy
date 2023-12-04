/* eslint-disable react/prop-types */
// Button.js

import Link from "next/link";

const Button = ({
  text,
  onClick,
  bg,
  to,
  hover,
  height,
  border,
  width,
  icon,
  textColor,
  additionalClasses,
}) => {
  const bgColor = bg || "bg-[#8F0FBA]";

  return (
    <>
      {to ? (
        <div
          className={`${height}] ${width} ${additionalClasses} flex gap-4 m-2 focus:border-blue-300 transition duration-300 ${hover} hover:border-gray-300 px-6 py-2 ${bgColor} rounded-[10px] border ${border}]backdrop-blur-[400px] justify-center items-center gap-2 inline-flex`}
        >
          {icon}
          <Link
            href={to}
            className={`${textColor} text-lg font-light font-['Sora'] leading-[41.50px]`}
          >
            {text}
          </Link>
        </div>
      ) : (
        <button
          onClick={onClick}
          className={`${height} ${width} ${additionalClasses} flex gap-4 m-2 focus:border-blue-300 transition duration-300 ${hover} hover:border-gray-300 px-6 py-2 ${bgColor} rounded-[10px] border ${border} backdrop-blur-[400px] justify-center items-center gap-2 inline-flex`}
        >
          {icon}

          <p
            className={`${textColor} text-lg font-light font-['Sora'] leading-[41.50px]`}
          >
            {text}
          </p>
        </button>
      )}
    </>
  );
};

export default Button;

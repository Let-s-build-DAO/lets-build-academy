import Button from "@/app/_components/Button";
import Image from "next/image";

const About = () => {
  return (
    <div className="w-full h-full md:h-[100vh] pr-8 bg-gray-200 justify-start items-center gap-[40px] inline-flex">
      <div className="w-full md:flex justify-between hidden items-center gap-4 inline-flex">
        <Image src={"/auth-img.png"} alt="auth-img" width={650} height={200} />
      </div>
      <div className="w-full mt-8 p-4 md:p-0 self-stretch flex-col justify-start items-start gap-12 inline-flex">
        <div className="flex-col justify-start items-start gap-6 flex">
          <h1 className="w-[468px] text-2xl md:text-5xl text-black font-bold font-['Poppins'] leading-[64px]">
            Personal Details
          </h1>
          <p className="w-full md:w-[468px] text-black text-[14px] md:text-lg font-normal font-['Poppins'] leading-loose">
            Drop the below information for further verification{" "}
          </p>
        </div>
        <div className="self-stretch h-[325px] flex-col justify-start items-start gap-8 flex">
          <div className="self-stretch h-[231px] px-4 py-5 bg-stone-50 rounded-[10px] justify-start items-start gap-4 inline-flex">
            <textarea
              placeholder="Tell us about yourself"
              className="text-zinc-500 text-base h-full w-full font-medium font-['Poppins'] focus:outline-none"
            />
          </div>
          <Button
            bg="bg-[#8F0FBA]"
            width="w-full"
            height={"h-[45px]"}
            text="Proceed to dashboard"
            to={"/dashboard"}
            additionalClasses={"group"}
            hover="hover:bg-[transparent]"
            textColor={"text-white group-hover:text-[#8F0FBA]"}
          />
        </div>
      </div>
    </div>
  );
};

export default About;

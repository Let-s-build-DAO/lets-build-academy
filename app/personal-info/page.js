import Image from "next/image";
import Button from "../_components/Button";
import InputField from "../_components/InputField";

const PersonalInfo = () => {
  return (
    <div className="w-full h-full md:h-[100vh] pr-8 bg-gray-200 justify-start items-center gap-[45px] inline-flex">
      <div className="w-full md:flex justify-between hidden items-center gap-4 inline-flex">
        <Image src={"/auth-img.png"} alt="auth-img" width={650} height={200} />
      </div>
      <div className="w-full mt-8 p-4 md:p-0 md:w-[649px] self-stretch flex-col justify-start items-start gap-12 inline-flex">
        <div className="flex-col justify-start items-start gap-6 flex">
          <h1 className="w-[468px] text-black text-2xl md:text-5xl font-bold font-['Poppins'] leading-[64px]">
            Personal Details
          </h1>
          <p className="w-full md:w-[468px] text-black text-[14px] md:text-lg font-normal font-['Poppins'] leading-loose">
            Drop the below information for further verification{" "}
          </p>
        </div>
        <div className="self-stretch h-[350px] flex-col justify-start items-start gap-8 flex pr-4">
          <div className="self-stretch flex flex-col md:flex-row justify-between items-center gap-6 inline-flex ">
            <InputField
              placeholder="First name"
              height={"h-[60px]"}
              width={"w-full"}
            />
            <InputField
              placeholder="Last name"
              height={"h-[60px]"}
              width={"w-full "}
            />
          </div>
          <InputField
            placeholder="Username"
            width={"w-full"}
            height={"h-[40px]"}
          />
          <InputField
            placeholder="Email address"
            width={"w-full"}
            height={"h-[40px]"}
          />
          <div className="self-stretch justify-start items-start gap-6 inline-flex">
            <Button
              bg="bg-[transparent]"
              text="Back"
              border="border-[#8F0FBA]"
              width="w-[320px]"
              height={"h-[45px]"}
              additionalClasses={"group"}
              hover="hover:bg-[#8F0FBA]"
              textColor={"text-[#8F0FBA] group-hover:text-white"}
            />
            <Button
              bg="bg-[#8F0FBA]"
              width="w-[320px]"
              height={"h-[45px]"}
              text="Next"
              additionalClasses={"group"}
              hover="hover:bg-[transparent]"
              textColor={"text-white group-hover:text-[#8F0FBA]"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

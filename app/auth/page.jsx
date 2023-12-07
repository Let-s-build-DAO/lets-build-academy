import Button from "../_components/Button";

const Auth = () => {
  return (
    <div className="w-full bg-gray-200 justify-start items-center overflow-y-hidden md:inline-flex">
      <div className="w-1/2 md:flex justify-between items-center gap-4 inline-flex hidden">
        <img className="h-screen w-full object-cover" src={"/auth-img.png"} />
        {/* <Image src={"/auth-img.png"} alt="auth-img" width={650} height={200} /> */}
      </div>
      <div className="lg:w-1/2 p-10">
        <div className="">
          <h1 className="w-[468px] text-black text-3xl md:text-5xl font-bold font-['Poppins'] leading-[44px] md:leading-[64px]">
            Connect Your <br />
            wallet
          </h1>
          <p className=" text-black text-sm font-normal">
            Choose your preferred blockchain and connect your on-chain Identity.
          </p>
        </div>
        <div className="mt-10">
          <h3 className="text-black text-lg font-bold font-['Poppins'] leading-loose">
            Blockchain
          </h3>
          <div className="flex my-6 justify-between">
            <button className="flex justify-center bg-[#E9CFF1] w-52 p-3 rounded-md">
              <img src="/images/eth.png" alt="" />
              <p className="my-auto mx-3">Ethereum</p>
            </button>
            <button className="flex justify-center bg-[#E9CFF1] w-52 ml-10 p-3 rounded-md">
              <img src="/images/deso.png" alt="" />
              <p className="my-auto mx-3">DeSo</p>
            </button>
          </div>
        </div>
        {/* <button className="bg-purple w-full my-4 p-2 rounded-md text-white flex justify-center">
          <img src="/images/icons/MetaMask.svg" alt="" />
          <p className="my-auto mx-3">Connect with Metamask</p>
        </button> */}
      </div>
    </div>
  );
};

export default Auth;

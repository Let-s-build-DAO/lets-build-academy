/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"

function SectionTwo() {
  return (
    <div className=''>
      <div className="lg:flex z-10 relative justify-evenly bg-purple items-center lg:h-[130px] text-white text-center">
        {/* <div className='sm:p-4'>
          <p className=' font-bold'>2</p>
          <p>Years <br /> Experience</p>
        </div>
        <div className="bg-white lg:w-px w-full h-[1px] lg:h-20 mx-2"></div>
        <div className='sm:p-4'>
          <p className=' font-bold'>100+</p>
          <p>Students <br /> worldwide</p>
        </div>
        <div className="bg-white lg:w-px w-full h-[1px] lg:h-20 mx-2"></div>
        <div className='sm:p-4'>
          <p className=' font-bold'>5</p>
          <p>Sponsors</p>
        </div>
        <div className="bg-white lg:w-px w-full h-[1px] lg:h-20 mx-2"></div>
        <div className='sm:p-4'>
          <p className=' font-bold'>0</p>
          <p>Awards <br /> Received</p>
        </div> */}
      </div>
      <div className="lg:flex lg:mr-20 py-[100px] bg-white ">
        <div className="lg:w-[48%]">
          <Image src='/Rectangle 4.png' width={2500} height={600} />
        </div>
        <div className="lg:w-[52%] px-6 ">
          <h1 className="font-bold my-3 text-3xl ">Why Choose <br /> Let's Build Academy</h1>
          <div className="flex flex-wrap justify-between">
            <div className="shadow-md my-3 text-center py-8 p-3 lg:w-[49%] rounded-md">
              <h2 className="font-bold my-2">Cutting-Edge Courses</h2>
              <p className="text-sm">Our curriculum is designed to stay ahead of industry trends, ensuring that our students graduate with the latest skills and knowledge.</p>
            </div>
            <div className="shadow-md p-3 my-3 text-center py-8 lg:w-[49%] rounded-md">
              <h2 className="font-bold my-2">Web3 Expertise</h2>
              <p className="text-sm">We specialize in web3 technologies, blockchain, decentralized applications (DApps), and more. Prepare for the future of the internet.</p>
            </div>
            <div className="shadow-md p-3 my-3 text-center py-8 lg:w-[49%] rounded-md">
              <h2 className="font-bold my-2">Expert Instructors</h2>
              <p className="text-sm">Learn from seasoned professionals who are passionate about tech and dedicated to your success.</p>
            </div>
            <div className="shadow-md p-3 my-3 text-center py-8 lg:w-[49%] rounded-md">
              <h2 className="font-bold my-2"> Real-World Projects</h2>
              <p className="text-sm">Put your skills to the test with hands-on projects that mirror the challenges of the tech world.</p>
            </div>
            <div className="shadow-md my-3 p-3 text-center py-8 lg:w-[49%] rounded-md">
              <h2 className="font-bold my-2">Inclusivity</h2>
              <p className="text-sm">We welcome students from all backgrounds, fostering a diverse and vibrant learning community.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionTwo
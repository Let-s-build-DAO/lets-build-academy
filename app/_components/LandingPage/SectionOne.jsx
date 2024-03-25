/* eslint-disable @next/next/no-img-element */
import SectionTwo from './SectionTwo/SectionTwo';

function SectionOne() {
  return (
    <section className='relative'>
      <img className='lg:h-[100vh] h-[80vh] w-full' src="/BackgroundImage.jpg" alt="" />
      <section className='content'>
        <div className="absolute lg:h-[100vh] h-[80vh] top-0 bottom-0 mb-0 lg:px-20 px-4" >
          <section className='px-4'>
            <div className='lg:mt-44 mt-40 lg:w-1/2'>
              <h1 className='lg:text-5xl text-3xl font-bold leading-tight'>Unlock the Future of Learning with Web3 Technology</h1>
              <p className='my-5'>Empower yourself with knowledge of <br />
                Decentralized Web and Blockchain
              </p>
              <button className="bg-custom-purple flex justify-evenly text-white font-medium rounded-md px-4 py-5 w-52">
                Get Started
                <img src="/east.png" alt="" />
              </button>
            </div>
            <div className='lg:w-1/2 absolute sm:hidden right-0 bottom-0'>
              <img className='w-[80%]' src='/Group1.png' alt="" />
            </div>
          </section>
        </div>
        <SectionTwo />
      </section>
    </section>
  )
}

export default SectionOne;

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import SectionTwo from './SectionTwo/SectionTwo';

function SectionOne() {
  return (
    <section className='relative'style={{backgroundColor:"#FBF7FD"}}>
      <img className='lg:h-[100vh] h-[80vh] object-cover w-full' src="/BackgroundImage.jpg" alt="" />
      <section className='content'>
        <div className="absolute lg:flex items-center lg:h-[100vh] h-[80vh] top-0 bottom-0 mb-0 lg:px-20 px-4" >
          <div className='mt-40 lg:w-1/2'>
            <h1 className='lg:text-5xl text-3xl font-bold leading-tight'>Unlock the Future of Learning with Web3 Technology</h1>
            <p className='my-5'>Empower yourself with knowledge of <br />
              Decentralized Web and Blockchain
            </p>
            <Link href={'/auth'}>
              <button className="bg-custom-purple flex justify-evenly text-white font-medium rounded-md px-4 lg:py-5 py-3 w-52">
                Get Started
                <img src="/east.png" alt="" />
              </button>
            </Link>
          </div>
          <div className='lg:w-1/2 absolute sm:hidden right-0 bottom-0'>
            <img className='w-[80%]' src='/Group1.png' alt="" />
          </div>
        </div>
        <SectionTwo />
      </section>
    </section>
  )
}

export default SectionOne;

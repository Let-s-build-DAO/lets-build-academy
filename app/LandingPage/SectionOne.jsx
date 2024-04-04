import Image from 'next/image'
import SectionTwo from './SectionTwo/SectionTwo';
import './SectionOne.css'
import SectionThree from '../_components/LandingPage/SectionThree/SectionThree';
import SectionFour from '../_components/LandingPage/SectionFour/SectionFour';
import SectionFive from '../_components/LandingPage/SectionFive/SectionFive';


function SectionOne() {
  return (
    <>
    <div className="section-one-bg pt-5 pl-20" >
      <header className="flex items-center px-4 ">
        <Image src= '/Logo.jpg' width={231} height={79}/>
        <nav className='flex-1 flex justify-center'>
          <ul className="flex">
           <li className="mr-6"><a href="#home" className="text-black ">Home</a></li>
            <li className="mr-6"><a href="#courses" className="text-black ">Courses</a></li>
            <li className="mr-6"><a href="#about" className="text-black ">About Us</a></li>
            <li><a href="#contact" className="text-black ">Contact Us</a></li>
          </ul>
        </nav>
      </header>
      <section className='flex items-center px-4'>
       <div>
          <h1 className='text-5xl font-bold mb-5'>Unlock the Future of</h1> 
          <h1 className='text-5xl font-bold mb-5'>Learning with Web3</h1> 
          <h1 className='text-5xl font-bold mb-5'>Technology</h1>
    
          <p className='mb-5'>Empower yourself with knowledge of 
            <span aria-hidden="true">Decentralized Web and Blockchain</span>
          </p>
        <button className="bg-custom-purple text-white font-medium rounded-md px-4 py-5 w-223 h-72">
          Get Started
        </button>
      </div>
      <div className='flex-1 flex justify-center'>
      <Image src='/Group1.png' alt="Group Image" width={700} height={700}/>
    </div>
  </section>
</div>
<SectionTwo />
<SectionThree />
<SectionFour />
<SectionFive />
</>
  )
}

export default SectionOne;


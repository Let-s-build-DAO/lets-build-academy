import React from 'react';
import Image from 'next/image'
import './SectionOne.css'

function SectionOne() {
  return (
    <div className="section-one-bg" >
      <header className="flex justify-between ">
        <Image src= '/Images/Logo.jpg' width={50} height={50}/>
        <nav>
          <ul className="flex">
           <li className="mr-6"><a href="#home" className="text-black ">Home</a></li>
            <li className="mr-6"><a href="#courses" className="text-black ">Courses</a></li>
            <li className="mr-6"><a href="#about" className="text-black ">About Us</a></li>
            <li><a href="#contact" className="text-black ">Contact Us</a></li>
          </ul>
        </nav>
      </header>
      <section className='flex justify-between'>
        <div>
            <h1>Unlocking the Future of <br />
                Learning with Web3 <br />
                Technology 
            </h1>
            <p>Empower yourself with knowledge of <br />
                Decentralized Web and Blockchain
            </p>
            <button>
                Get Started
            </button>
        </div>
        <div>
            <p>Hello</p>
        </div>
      </section>
    </div>
  )
}

export default SectionOne;

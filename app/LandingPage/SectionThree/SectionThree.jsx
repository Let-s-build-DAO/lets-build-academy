import './SectionThree.css';
import Image from 'next/image'

function SectionThree() {
  return (
    <section className="section-three-bg pt-12 pb-12 sm:pt-16 sm:pb-16">
    <header className="flex justify-between text-white px-8 sm:px-20">
        <h1 className="font-bold text-2xl sm:text-3xl">EXPLORE OUR <br />COURSES</h1>
        <p className="text-base sm:text-lg">EXPLORE ALL COURSES</p>
    </header>
    <main className="flex flex-col sm:flex-row items-center justify-evenly mt-12">
        {[1, 2, 3].map((item) => (
            <article key={item} className="first-div text-white mb-8 sm:mb-0">
                <Image src='/Rectangle 5.png' alt='Course Image' width={400} height={179}/>
                <div className='flex mt-12'>
                    <div>
                        <Image src='/Ellipse 1.png' alt='Instructor Image' width={50} height={50}/>
                    </div>
                    <div className="ml-4">
                        <h1 className='font-bold'>Web 3 Development</h1>
                        <p>Lets Build Labs</p>
                    </div>
                </div>
            </article>
        ))}
    </main>
</section>
  )
}

export default SectionThree

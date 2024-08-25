import './SectionThree.css';
import Image from 'next/image'
import Link from 'next/link';

function SectionThree() {
    return (
        <section className="section-three-bg  lg:px-16 py-12 sm:py-16 ">
            <div className="lg:flex justify-between text-white px-4 ">
                <h1 className="font-bold text-2xl lg:w-52 lg:text-3xl">Explore Our Courses</h1>
                <Link href={"/courses"}>
                    <div className='flex'>
                        <p className="text-base sm:text-lg">Explore all courses </p>
                        <img className='ml-3' src="/east.png" alt="" />
                    </div>
                </Link>
            </div>
            <main className="flex sm:flex-col items-center justify-evenly sm:p-4 mt-12 gap-6">
                {[1, 2, 3].map((item) => (
                    <article key={item} className="first-div text-white mb-8 sm:mb-4">
                        <Image src='/Rectangle 5.png' alt='Course Image' width={380} height={179} />
                        <div className='flex mt-4'>
                            <div className='my-auto'>
                                <Image src='/Ellipse 1.png' alt='Instructor Image' width={40} height={50} />
                            </div>
                            <div className="ml-4">
                                <h1 className='font-bold text-base'>Web 3 Development</h1>
                                <p className='text-sm'>Lets Build Academy</p>
                            </div>
                        </div>
                    </article>
                ))}
            </main>
        </section>
    )
}

export default SectionThree

import './SectionThree.css';
import Image from 'next/image'
import Link from 'next/link';
import DisplayCourses from '../../cards/DisplayCourses';

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
            <DisplayCourses page={false} />
        </section>
    )
}

export default SectionThree

import Image from 'next/image'

function SectionFour() {
  return (
    <section className='text-center pt-12 pb-12 sm:pt-16 sm:pb-16'>
    <div>
        <h1 className='font-bold text-3xl sm:text-4xl pb-12'>What Our <br /> Students Say</h1>
    </div>
    <main className='flex flex-col sm:flex-row justify-between px-4'>
        <div className="hidden sm:block">1</div>
        <article className=' p-12 items-center'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            Eveniet quod officiis perferendis voluptate unde non est <br />
            quo aut inventore magnam qui labore iusto, maxime asperiores <br />
            quos doloribus cum omnis aspernatur.</p>
            <div className='flex justify-center items-center mt-8'>
                <Image src='/Ellipse 1.png' alt='Student Image' width={50} height={50}/>
                <p className='font-bold ml-2'>Sarah L.</p>
            </div>
        </article>
        <div className="hidden sm:block">3</div>
    </main>
</section>
  )
}

export default SectionFour

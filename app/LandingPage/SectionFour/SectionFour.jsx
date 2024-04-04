import Image from 'next/image'

function SectionFour() {
  return (
    <section className='text-center pt-12 pb-12 sm:pt-16 sm:pb-16'>
    <header>
        <h1 className='font-bold text-3xl sm:text-4xl pb-12'>What Our <br /> Students Say</h1>
    </header>
    <main className='flex flex-col sm:flex-row justify-between px-4'>
        <div className="hidden sm:block">1</div>
        <article className='bg-white p-12 items-center'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            Eveniet quod officiis perferendis voluptate unde non est <br />
            quo aut inventore magnam qui labore iusto, maxime asperiores <br />
            quos doloribus cum omnis aspernatur.</p>
            <footer className='flex justify-center items-center mt-8'>
                <Image src='/Ellipse 1.png' alt='Student Image' width={50} height={50}/>
                <p className='font-bold ml-2'>Sarah L.</p>
            </footer>
        </article>
        <div className="hidden sm:block">3</div>
    </main>
</section>
  )
}

export default SectionFour
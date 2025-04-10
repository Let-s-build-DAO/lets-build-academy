import './SectionFive.css';

function SectionFive() {
    return (
        <section className='section-five-bg text-white items-center text-center p-4 sm:p-8 md:p-12'>
            <header>
                <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl p-4'>Join our community</h1>
            </header>
            <main>
                <p className='text-base sm:text-lg md:text-xl'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br />
                    Sed iste similique velit non maiores ab ullam, corrupti magni. <br />
                    Molestiae, velit! Aperiam, fugit maxime ullam sunt <br />
                    voluptas voluptatem! Quisquam, magnam voluptate.
                </p>
            </main>
            <footer>
                <div className='flex flex-col sm:flex-row justify-center items-center mt-5 sm:mt-10 md:mt-12'>
                    <a href="https://t.me/letsbuilddaocommunity">
                        <button className='border border-white rounded px-3 py-4 w-48 h-12 mb-4 sm:mb-0 sm:mr-4'>Telegram</button>
                    </a>
                    <a href="https://discord.gg/M9jx85nJkN">
                        <button className='border border-black rounded px-3 py-4 w-48 h-12 sm:ml-4'>Discord</button>
                    </a>
                </div>
            </footer>
        </section>
    )
}

export default SectionFive

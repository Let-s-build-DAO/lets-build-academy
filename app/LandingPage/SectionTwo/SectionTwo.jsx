import Image from "next/image"

function SectionTwo() {
  return (
    <div className='bg-white pb-[150px]'>
         <div className="flex justify-evenly bg-customPurple items-center w-[80%] h-[130px] rounded-md mx-auto text-white text-center">
        <div className=''>
          <p className=' font-bold'>2</p>
          <p>Years <br /> Experience</p>
        </div>
        <div class="bg-white w-px h-20 mx-2"></div>
        <div>
          <p className=' font-bold'>100+</p>
          <p>Students <br /> worldwide</p>
        </div>
        <div class="bg-white w-px h-20 mx-2"></div>
        <div>
          <p className=' font-bold'>5</p>
          <p>Sponsors</p>
        </div>
        <div class="bg-white w-px h-20 mx-2"></div>
        <div>
          <p className=' font-bold'>0</p>
          <p>Awards <br /> Received</p>
        </div>
      </div>
      <div className="flex pt-[100px] bg-white ">
        <div >
            <Image src= '/Rectangle 4.png' width={2500} height={600} />
        </div>
        <div className="pl-[20px]">
            <h1 className="font-bold text-3xl ">Why Choose <br /> Let's Build Labs</h1>
            <div className="flex justify-evenly">
                <div className="text-center">
                    <div className="border border-black rounded p-4 text-center my-2 mr-2 mt-12  h-[180px] w-[400px]">
                        <h2 className="font-bold">CUTTING-EDGE COURSES</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                            Rem velit at repudiandae consectetur, suscipit quam fuga nisi 
                            dolorem eveniet, 
                            ab ducimus quae illum dicta veniam id natus rerum. Ab, laboriosam.</p>
                    </div>
                    <div className="border border-black rounded p-4 text-center my-2 mr-2 h-[180px] w-[400px]" >
                        <h2 className="font-bold">CUTTING-EDGE COURSES</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                            Rem velit at repudiandae consectetur, suscipit quam fuga nisi 
                            dolorem eveniet, 
                            ab ducimus quae illum dicta veniam id natus rerum. Ab, laboriosam.</p>
                    </div>
                    <div className="border border-black rounded p-4 text-center my-2 mr-2 h-[180px] w-[400px]">
                        <h2 className="font-bold">CUTTING-EDGE COURSES</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                            Rem velit at repudiandae consectetur, suscipit quam fuga nisi 
                            dolorem eveniet, 
                            ab ducimus quae illum dicta veniam id natus rerum. Ab, laboriosam.</p>
                    </div>
                </div>

                <div>
                <div className="border border-black rounded p-4 text-center my-2 mr-12 mt-12 h-[180px] w-[400px]">
                        <h2 className="font-bold">CUTTING-EDGE COURSES</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                            Rem velit at repudiandae consectetur, suscipit quam fuga nisi 
                            dolorem eveniet, 
                            ab ducimus quae illum dicta veniam id natus rerum. Ab, laboriosam.</p>
                    </div>
                    <div className="border border-black rounded p-4 text-center my-2 mr-12 h-[180px] w-[400px]">
                        <h2 className="font-bold">CUTTING-EDGE COURSES</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                            Rem velit at repudiandae consectetur, suscipit quam fuga nisi 
                            dolorem eveniet, 
                            ab ducimus quae illum dicta veniam id natus rerum. Ab, laboriosam.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SectionTwo
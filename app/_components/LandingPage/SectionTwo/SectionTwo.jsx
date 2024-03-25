/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"

function SectionTwo() {
  return (
    <div className='bg-white'>
         <div className="flex justify-evenly bg-customPurple items-center w-[80%] h-[130px] rounded-md  mx-auto text-white text-center">
        <div className=''>
          <p className=' font-bold'>2</p>
          <p>Years <br /> Experience</p>
        </div>
        <div className="bg-white w-px h-20 mx-2"></div>
        <div>
          <p className=' font-bold'>100+</p>
          <p>Students <br /> worldwide</p>
        </div>
        <div className="bg-white w-px h-20 mx-2"></div>
        <div>
          <p className=' font-bold'>5</p>
          <p>Sponsors</p>
        </div>
        <div className="bg-white w-px h-20 mx-2"></div>
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
                    <div>
                        <h2 className="font-bold">CUTTING-EDGE COURSES</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                            Rem velit at repudiandae consectetur, suscipit quam fuga nisi 
                            dolorem eveniet, 
                            ab ducimus quae illum dicta veniam id natus rerum. Ab, laboriosam.</p>
                    </div>
                    <div>
                        <h2 className="font-bold">CUTTING-EDGE COURSES</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                            Rem velit at repudiandae consectetur, suscipit quam fuga nisi 
                            dolorem eveniet, 
                            ab ducimus quae illum dicta veniam id natus rerum. Ab, laboriosam.</p>
                    </div>
                    <div>
                        <h2 className="font-bold">CUTTING-EDGE COURSES</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                            Rem velit at repudiandae consectetur, suscipit quam fuga nisi 
                            dolorem eveniet, 
                            ab ducimus quae illum dicta veniam id natus rerum. Ab, laboriosam.</p>
                    </div>
                </div>

                <div>
                <div>
                        <h2 className="font-bold">CUTTING-EDGE COURSES</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                            Rem velit at repudiandae consectetur, suscipit quam fuga nisi 
                            dolorem eveniet, 
                            ab ducimus quae illum dicta veniam id natus rerum. Ab, laboriosam.</p>
                    </div>
                    <div>
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
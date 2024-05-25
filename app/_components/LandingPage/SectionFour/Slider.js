'use client'

import { Carousel } from "react-responsive-carousel";
import { items } from ".///items.json";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Slider.css'
export default function ResponsiveCarousel() {
  const { responsive } = items;

  console.log(items)
  return (

    <div style={{ backgroundColor: "#FBF7FD", paddingTop: "80px", paddingBottom: "100px" }}>
      <h1 className="font-bold text-3xl sm:text-4xl pb-12 " style={{ width: '250px', margin: '0 auto', textAlign: 'center' }}>What Our Students Say</h1>
      <div className="w-[90%] mx-auto">
        <Carousel  >
          {items.bootstrap.map((item) => (
            <div key={item.id} style={{ backgroundColor: "white", maxWidth: '60rem', margin: "0 auto" }}>
              <p style={{ width: '450px', margin: '0 auto', paddingTop: "3rem" }}>{item.body}</p>
              <div className='flex justify-around items-center mt-8'>
                <img src={item.imageUrl} className="carouselImage" />
                <h3 className="font-bold w-100px mb-12" style={{ marginRight: "50%", whiteSpace: "nowrap" }}>{item.text}</h3>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

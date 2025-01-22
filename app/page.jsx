'use client'

import SectionFive from './_components/LandingPage/SectionFive/SectionFive'
import SectionOne from './_components/LandingPage/SectionOne'
import SectionThree from './_components/LandingPage/SectionThree/SectionThree'
import MainLayout from './_layouts/MainLayout'
import Slider from './_components/LandingPage/SectionFour/Slider'
import MentorPage from './admin/mentors/page'

export default function Home() {
 
  const sendEmail = async (email) => {
    try {
      await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
        })
      });
    } catch (e) {
      console.error(e);
    }
  }

  // const sendEmailWithDelay = async () => {
  //   for (const email of subscribers) {
  //     await sendEmail(email);
  //     console.log('sent to ' + email)
  //     await new Promise(resolve => setTimeout(resolve, 2000)); // Delay in milliseconds
  //   }
  // };

  // const loop = () => {
  //   subscribers.map(single => {
  //     sendEmail(single)
  //     console.log('sent to ' + single)
  //   })
  // }
  return (
    <>
      <MainLayout style={{ backgroundColor: "#F3F3F3" }}>
        <SectionOne />
        {/* <button onClick={() => sendEmailWithDelay()} className='bg-primary p-4'>send Email</button> */}

        <SectionThree />
        {/* <Slider /> */}
        {/* <SectionFive /> */}
      </MainLayout>
      {/* <MentorPage /> */}
    </>
  )
}

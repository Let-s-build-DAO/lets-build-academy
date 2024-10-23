import SectionFive from './_components/LandingPage/SectionFive/SectionFive'
import SectionOne from './_components/LandingPage/SectionOne'
import SectionThree from './_components/LandingPage/SectionThree/SectionThree'
import MainLayout from './_layouts/MainLayout'
import Slider from './_components/LandingPage/SectionFour/Slider'
import MentorPage from './admin/mentors/page'

export default function Home() {
  return (
    <>
      <MainLayout style={{ backgroundColor: "#F3F3F3" }}>
        <SectionOne />
        <SectionThree />
        {/* <Slider /> */}
        {/* <SectionFive /> */}
      </MainLayout>
      {/* <MentorPage /> */}
    </>
  )
}

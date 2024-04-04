import SectionFive from './_components/LandingPage/SectionFive/SectionFive'
import SectionFour from './_components/LandingPage/SectionFour/SectionFour'
import SectionOne from './_components/LandingPage/SectionOne'
import SectionThree from './_components/LandingPage/SectionThree/SectionThree'
import MainLayout from './_layouts/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      <SectionOne />
      <SectionThree />
      <SectionFour />
      {/* <SectionFive /> */}
    </MainLayout>
  )
}

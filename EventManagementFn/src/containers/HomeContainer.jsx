import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import Hero from '../components/Hero'
import RecentEvent from './RecentEvent'
import TicketIng from '../assets/image/ticketing.avif' 

function HomeContainer() {
  return (
    <div>
<Navbar/>

<div className='text-white'
style={{ 
  backgroundImage: `url(${TicketIng})`, 
  backgroundSize: "cover", 
  backgroundPosition: "center", 
  backgroundRepeat: "no-repeat",
}}
>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>


        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Fast, flexible financing for
          </p>

        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Your Trusted Paterners in Event Perfection. Every Time.</p>
        <button className='bg-[#F04520] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
      </div>
    </div>
    <RecentEvent/>
    <Hero/>
    <Footer/>

    </div>
  )
}

export default HomeContainer
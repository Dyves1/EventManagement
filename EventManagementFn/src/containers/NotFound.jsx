import NotFound from "../assets/image/NotFound.svg";
import Navbar from "../components/navbar/Navbar";
const Notfound = () => {
    return (
<div>
  <Navbar/>
<main className='w-full flex flex-col justify-center items-center mt-[10%] mb-[15%]'>
        <h1 className='text-xl'> Whoops, looks like you got lost... </h1>
        <img className='mt-[2rem]' src={NotFound} alt='#' />
      </main>
</div>
    );
  };
  
  export default Notfound;
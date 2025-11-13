import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';



const Navbar = () => {
    const navigate = useNavigate();
    // const { navigate,token } = useAppContext();
    return (
        <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
            <img className='w-32 sm:w-44 cursor-pointer' src={assets.logo} onClick={() => navigate('/')} alt="" />
            <div className='flex '>
             <button onClick={() => navigate('/admin')} className='m-1 py-2.5 flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10'>
                {'Dashboard'}
                <img src={assets.arrow} alt="arrow" className='w-3' />
            </button>
            <button onClick={() => navigate('/Login')} className='m-1 py-2.5 flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10'>
                {'Login'}
                <img src={assets.arrow} alt="arrow" className='w-3' />
            </button>
            </div>

      
        </div>
        
      
    )
}

export default Navbar

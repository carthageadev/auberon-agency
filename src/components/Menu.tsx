'use client'
import Header from './CanvasMenu';

const Menu = () => {
  return (
    <div className='flex justify-end items-center w-full fixed z-50 px-6 md:px-10 py-5 pointer-events-none'>
        <div className='pointer-events-auto'>
            <Header />
        </div>
    </div>
  )
}

export default Menu

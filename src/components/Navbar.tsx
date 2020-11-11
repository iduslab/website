import React, { FC } from 'react'
import Button from './Button'

const Navbar: FC = () => {
  return (
    <nav>
      <div className='flex fixed top-0 inset-x-0 z-100 h-16 justify-between items-center text-white mx-8 pt-4'>
        <div className='text-2xl font-semibold'>Idus Lab</div>
        <div>
          <Button onClick={() => {}} text={'Join Discord'} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

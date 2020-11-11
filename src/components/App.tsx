import React, { FC } from 'react'
import Navbar from './Navbar'

const App: FC = ({ children }) => {
  return (
    <div id='app' className='bg-4'>
      <Navbar />
      <div className='w-full max-w-screen-xl mx-auto px-6'>
        <div className='pb-16 w-full pt-24 lg:pt-28 text-white'>{children}</div>
      </div>
    </div>
  )
}

export default App

import React from 'react'

const navbas = () => {
  return (
    <div>
      <nav className='bg-transparent flex items-center justify-between p-4 px-8 text-xl'> 
        <div className='logo font-bold text-3xl'>
          <span className='text-green-700'>&lt;</span>
          PASS
          <span className='text-green-700'>OP/&gt;</span>
        </div>
        <ul className='flex space-x-4'>
          <li className='hover:text-gray-200'>Home</li>
          <li className='hover:text-gray-200'>About</li>
          <li className='hover:text-gray-200'>Services</li>
          <li className='hover:text-gray-200'>Contact</li>
        </ul>
      </nav>
    </div>
  )
}

export default navbas

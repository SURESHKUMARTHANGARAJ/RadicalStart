import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'

const Calender = () => {
  return (
    <div className='grid-container'>
      <Nav />
      <Sidebar />
      <main className='not-available'>
        <h2 className='fw-bold text-secondary'>Page Not Available</h2>
      </main>
    </div>
  )
}

export default Calender

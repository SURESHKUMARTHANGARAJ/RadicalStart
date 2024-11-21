import React from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'

const Home = () => {
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

export default Home

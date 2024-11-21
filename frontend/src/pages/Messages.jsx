import React, { useContext } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { GlobalContext } from '../Context/GlobalContext'

const Messages = () => {

  const {isOpen} = useContext(GlobalContext)
  return (
    <div className={isOpen?"grid-container active":"grid-container"}>
      <Nav />
      <Sidebar />
      <main className='not-available'>
        <h2 className='fw-bold text-secondary'>Page Not Available</h2>
      </main>
    </div>
  )
}

export default Messages

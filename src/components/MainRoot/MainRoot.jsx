import React from 'react'
import Navber from '../Navber/Navber'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router'

function MainRoot() {
  return (
    <>
    <Navber></Navber>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default MainRoot
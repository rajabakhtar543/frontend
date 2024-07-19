import React from 'react'
import Footer2 from './Footer2'
import Header from './Header'
import  { Toaster } from 'react-hot-toast';


const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        <main style={{height:"auto"}}>
        <Toaster />
        {children}
      
        </main>
        <Footer2/>
   
    </div>
  )
}

export default Layout

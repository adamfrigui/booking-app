import React from 'react'
import Featured from '../../components/featured/Featured'
import FeaturedPropreties from '../../components/featuredPropreties/FeaturedPropreties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import PropretyList from '../../components/propretyList/PropretyList'
import './Home.scss'

const Home = () => {
  document.body.style.backgroundColor = "white";
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by proprety type</h1>
        <PropretyList/> 
        <h1 className="homeTitle">Home guests love</h1>
        <FeaturedPropreties/>
        <MailList/>
        <Footer/> 
      </div>
    </div>
  )
}

export default Home
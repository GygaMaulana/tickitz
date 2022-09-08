import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import NowShowing from "./components/NowShowing/NowShowing";
import UpcomingMovies from "./components/UpcomingMovies/UpcomingMovies";
import Subscribe from "./components/Subscribe/Subscribe";
import { useEffect } from "react";
import { GetMovies } from "../../redux/actions/Movies";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom"


const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(GetMovies())
  }, [dispatch])
  
  const navigate = useNavigate()
  const {data, error, loading } = useSelector((state) => state.movies);
 
  if(loading) {
    return <div>loading...</div>
  }
  if(error) {
   return  <div>error</div>
  }
  


  return (
    <>
      <Navbar />
      <Banner />
      <NowShowing />
      <UpcomingMovies />
      <Subscribe />
      <Footer />
    </>
  );
};

export default Home;

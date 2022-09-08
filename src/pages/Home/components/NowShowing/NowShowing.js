import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import "./mobile.css"
import { Link } from "react-router-dom";
import Slider from 'react-slick'

const NowShowing = () => {
  const [movieSchedule, setMovieSchedule] = useState([])

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3006/api/v1/schedule",
    }).then((res) => {
      setMovieSchedule(res.data.data);
    }).catch((err)=> {
      console.log(err)
    })
  }, []);

  const Loading = () => {
    <div>Loading...</div>
  } 

  const [ toggle, setToggle ] = useState(false)
  const isOpen = () => {
    setToggle(!toggle)
  }

  const config = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay:false,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 468,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <>
      <section className="now-showing">
        <div className="container">
          <div className="nw-title">
            <h2>Now Showing</h2>
            <Link to="/movies">view all</Link>
          </div>
            
          <Slider {...config}>
            {!movieSchedule.length ? (<Loading/>) : movieSchedule.map((movie, index)=> {
                return (
                  <div className="nw-box-items" key={index}>
                    <img src={movie.cover} alt={movie.title} title={movie.title} onClick={isOpen}/>
                    <div className={toggle ? "nw-item-details active" : "nw-item-details"}>
                      <div className="movie-title">{movie.title}</div>
                      <div className="movie-genre">{movie.categoryName}</div>
                      <button>Details</button>
                    </div>
                  </div>
                )
            })}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default NowShowing;

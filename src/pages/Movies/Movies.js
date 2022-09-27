import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarLogin from '../../components/Navbar/NavbarLogin'
import Footer from '../../components/Footer/Footer'
import { useSelector } from "react-redux";
import './styles.scss'
import Slider from "react-slick";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const {isLogin} = useSelector((state)=> state.auth)
  const [ movie, setMovie ] = useState([])
  const [ search, setSearch ] = useState('')
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 468,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://tickitz-debe.herokuapp.com/api/v1/movies`,
    }).then((res) => {
      setMovie(res.data.data);
    }).catch((err)=> {
      console.log(err)
    })
  }, []);

  return (
    <>
      {isLogin ? <NavbarLogin/>: <Navbar />}
      <div className="container">
        <div className="header">
          <h2>List Movies</h2>
          <div className="header-content d-flex justify-content-between">
            <select className="form-select form-select-sm sort-movie">
              <option selected>Sort</option>
              <option value="1">ASC</option>
              <option value="2">DESC</option>
            </select>
            <div className="search-movie">
              <input type="text" placeholder="Search movie name..." onChange={(e) => setSearch(e.target.value)}/>
            </div>
          </div>
        </div>

        <Slider {...settings}>
            <div className="month active">September</div>
            <div className="month">October</div>
            <div className="month">November</div>
            <div className="month">December</div>
            <div className="month">January</div>
            <div className="month">February</div>
            <div className="month">March</div>
            <div className="month">April</div>
            <div className="month">May</div>
            <div className="month">June</div>
            <div className="month">July</div>
            <div className="month">August</div>
        </Slider>

          <div className="movie-box">
            {movie?.results?.filter((item) => {
                if (search === '') {
                  return movie?.results
                } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
                  return movie?.results
                }
              }).map((item, index)=> {
              return (
                <div className="movie-card" key={index}>
                  <div className="movie-image">
                    <img src={`https://tickitz-debe.herokuapp.com/uploads/${item.cover}`} alt={item.title} title={item.title}/>
                  </div>
                  <div className="movie-details">
                    <h3>{item.title}</h3>
                    <p>{item.genre}</p>
                  </div>
                  <div className="button-details">
                    <Link to={`/details/${item.movieID}`}><button>Details</button></Link>
                  </div>
                </div>
              )
            })}
          </div>
          <ul className="pagination">
            <li className="page-item">
              <Link to="/" className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            <li className="page-item"><Link to="/" className="page-link active">1</Link></li>
            <li className="page-item"><Link to="/" className="page-link">2</Link></li>
            <li className="page-item"><Link to="/" className="page-link">3</Link></li>
            <li className="page-item">
              <Link to="/" className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          </ul>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
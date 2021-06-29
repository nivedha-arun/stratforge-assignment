import './App.css';
import Logo from './assets/spacex_logo.png'
import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import History from './components/History';
import { Homepage } from './components/Homepage';
import { Rockets } from './components/Rockets';
import { Ships } from './components/Ships';
import { Details } from './components/DetailsScreen';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Search } from "./components/Search";

var historyresults = "", shipresults = "", rocketresults = "";

function App() {
  const [history, setHistory] = useState([]);
  const [rockets, setRockets] = useState([]);
  const [ships, setShips] = useState([]);
  const ref = useRef();


  //Setting default values
  if (historyresults.length === 0) { historyresults = [...history]; }

  if (shipresults.length === 0) { shipresults = [...ships]; }

  if (rocketresults.length === 0) { rocketresults = [...rockets]; }

  //Toggling nav bar menu 
  const handleMenuClick = () => {
    let element = ref.current
    let display = element.style.display
    if (display === "block") {
      element.style.display = "none";
    }
    else {
      element.style.display = "block";
    }
  }

  //Default data for Homescreen information
  const homescreen = [{
    id: "1",
    category: "Recent Launch",
    title: "GPS III SPACE VEHICLE 05 MISSION",
    url: "https://www.spacex.com/static/images/backgrounds-2021/gps3/post-launch/Homepage_GPSIIISV05_pad39A_DSC_5125_Desktop.webp"
  }, {
    id: "2",
    category: "Recent Launch",
    title: "CRS-22 MISSION",
    url: "https://www.spacex.com/static/images/backgrounds-2021/sl28/HP_Star28_DSC_9214_Desktop.webp"
  }, {
    id: "3",
    category: "Completed Mission",
    title: "DRAGON RETURNS TO EARTH",
    url: "https://www.spacex.com/static/images/crew-2/splashdown/Crew-1_Crew_Desktop.webp"
  }];

  //Service call to fetch History data
  const fetchHistory = async () => {
    const response = await fetch('https://api.spacexdata.com/v3/history')
      .then((response) => response.json())
    setHistory(response);
  }

  //Service call to fetch Rockets data
  const fetchRockets = async () => {
    const response = await fetch('https://api.spacexdata.com/v3/rockets')
      .then((response) => response.json())
    setRockets(response);
  }

  //Service call to fetch Ships data
  const fetchShips = async () => {
    const response = await fetch('https://api.spacexdata.com/v3/ships')
      .then((response) => response.json())
    setShips(response);
  }

  //Search Functionality
  const searchData = (value) => {
    var path = window.location.pathname;
    if (path === "/history") {
      if (value) {
        var historysearch = historyresults.filter(element => element.title.toLowerCase().includes(value.toLowerCase()))
        setHistory(historysearch);
      }
      else {
        setHistory(historyresults)
      }
    }
    else if (path === "/ships") {
      if (value) {
        var shipsearch = shipresults.filter(element => element.ship_name.toLowerCase().includes(value.toLowerCase()))
        setShips(shipsearch);
      }
      else {
        setShips(shipresults)
      }
    }
    else if (path === "/rockets") {
      if (value) {
        var rocketsearch = rocketresults.filter(element => element.rocket_name.toLowerCase().includes(value.toLowerCase()))
        setRockets(rocketsearch);
      }
      else {
        setRockets(rocketresults)
      }
    }
  }

  useEffect(() => {
    fetchHistory()
    fetchRockets()
    fetchShips()
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        {/* Navigation Menu */}
        <div className="navigation">
          <div className="logo">
            <a href="/"><img src={Logo} alt="Logo" /></a>
          </div>
          <div id="nav" ref={ref} className="links">
            <div className="nav">
              <a href="/history">History</a>
              <a href="/ships">Ships</a>
              <a href="/rockets">Rockets</a>
            </div>
          </div>
          {/* Responsive Navigation Menu */}
          <label htmlFor="">
            <AiOutlineMenu className="menu-btn" onClick={handleMenuClick} />
            <AiOutlineClose className="close-btn" />
          </label>
        </div>

        {/*Search Component*/}
        <div className={window.location.pathname === "/" ? "hide" : ""}>
          <Search searchFunc={searchData} />
        </div>

        {/* Home Screen */}
        <div className={window.location.pathname === "/" ? "home" : "hide"}>
          {homescreen.map((detail) => {
            return (
              <Route exact activeClassName="active" path="/" component={() => <Homepage key={detail.id} detail={detail} />} />
            )
          })};
        </div>

        {/* History Screen */}
        <div className={window.location.pathname === "/history" ? "grid gridhistory" : "hide"}>
          {history.map((record) => {
            return (
              <Route exact activeClassName="active" path="/history" component={() => <History key={record.id} record={record} />} />
            )
          })}
        </div>

        {/* Rockets Screen */}
        <div className={window.location.pathname === "/rockets" ? "gridrocket" : "hide"}>
          {rockets.map((record) => {
            return (
              <Route exact activeClassName="active" path="/rockets" component={() => <Rockets key={record.id} record={record} />} />
            )
          })}
        </div>

        {/* Ships Screen */}
        <div className={window.location.pathname === "/ships" ? "grid" : "hide"}>
          {ships.map((record) => {
            return (
              <Route exact activeClassName="active" path="/ships" component={() => <Ships key={record.ship_id} record={record} />} />
            )
          })}
        </div>

        {/* Ships Detail Screen */}
        <Route path="/ships/:recordId" component={() => <Details />} />

        {/* Rockets Detail Screen */}
        <Route path="/rockets/:recordId" component={() => <Details />} />

      </div>
    </BrowserRouter>
  );
}

export default App;

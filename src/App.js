import './App.css';
import { useEffect, useState } from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import History from './components/History';
import { Homepage } from './components/Homepage';
import { Rockets } from './components/Rockets';
import { Launches } from './components/Launches';
import { Details } from './components/DetailsScreen'
 
function App() {
  const [history, setHistory] = useState([]);
  const [rockets, setRockets] = useState([]);
  const [launches, setLaunches] = useState([]);

  const homescreen = [{
    id: "1",
    category: "Recent Launch",
    title: "GPS III SPACE VEHICLE 05 MISSION",
    url: "https://www.spacex.com/static/images/backgrounds-2021/gps3/post-launch/Homepage_GPSIIISV05_pad39A_DSC_5125_Desktop.webp"
  },{
    id: "2",
    category: "Recent Launch",
    title: "CRS-22 MISSION",
    url: "https://www.spacex.com/static/images/backgrounds-2021/sl28/HP_Star28_DSC_9214_Desktop.webp"
  },{
    id: "3",
    category: "Completed Mission",
    title: "DRAGON RETURNS TO EARTH",
    url: "https://www.spacex.com/static/images/crew-2/splashdown/Crew-1_Crew_Desktop.webp"
  }];

  const fetchHistory = async() => {
    const response = await fetch('https://api.spacexdata.com/v3/history')
    .then((response) => response.json())
    setHistory(response);
  }

  const fetchRockets = async() => {
    const response = await fetch('https://api.spacexdata.com/v3/rockets')
    .then((response) => response.json())
    setRockets(response);
  }

  const fetchLaunches = async() => {
    const response = await fetch('https://api.spacexdata.com/v3/launches/past')
    .then((response) => response.json())
    setLaunches(response);
  }

  useEffect(() => {
    fetchHistory()
    fetchRockets()
    fetchLaunches()
  }, [])  

  return (
    <BrowserRouter>
    <div className="App">
      <div className="navigation">
        <div className="logo">
          <a href="/"><img src="/assets/spacex_logo.png" alt="Logo"/></a>
        </div>
        <div className="links">
        <a href="/history">History</a>
        <a href="/launches">Launches</a>
        <a href="/rockets">Rockets</a>
      </div>
      </div>
      <div className={window.location.pathname === "/" ? "home" : "hide"}>
      {homescreen.map((detail)=> {
        return(
          <Route exact activeClassName="active" path="/" component={() => <Homepage key={detail.id} detail={detail}/>} />
        )
      })};
      </div>
      <div className={window.location.pathname === "/history" ? "grid" : "hide"}>
      {history.map((record) => {
        return( 
          <Route path="/history" component={() => <History key={record.id} record={record}/>} />
        )
      })}
      </div>
      <div className={window.location.pathname === "/rockets" ? "grid" : "hide"}>
      {rockets.map((record) => {
        return( 
          <Route path="/rockets" component={() => <Rockets key={record.id} record={record}/>} />
        )
      })}
      </div>
      <div className={window.location.pathname === "/launches" ? "grid" : "hide"}>
      {launches.map((record) => {
        return( 
          <Route path="/launches" component={() => <Launches key={record.flight_number} record={record}/>} />
        )
      })}
      </div>
      <Route path="/details" component={() => <Details />} />
    </div>
    </BrowserRouter>
  );
}

export default App;

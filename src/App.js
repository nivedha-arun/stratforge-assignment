import './App.css';
import Logo from './assets/spacex_logo.png'
import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import History from './components/History';
import { Homepage } from './components/Homepage';
import { Rockets } from './components/Rockets';
import { Ships } from './components/Ships';
import { Details } from './components/DetailsScreen';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
 
function App() {
  const [history, setHistory] = useState([]);
  const [rockets, setRockets] = useState([]);
  const [ships, setShips] = useState([]);

  //Toggling nav bar menu 
  const handleMenuClick = () => {
    var display = document.getElementById('nav')
    if(display.style.display === "block")
    {
      display.style.display = "none";
    }
    else{
      display.style.display = "block";
    }
  }

  //Default data for Homescreen information
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

  //Service call to fetch History data
  const fetchHistory = async() => {
    const response = await fetch('https://api.spacexdata.com/v3/history')
    .then((response) => response.json())
    setHistory(response);
  }

  //Service call to fetch Rockets data
  const fetchRockets = async() => {
    const response = await fetch('https://api.spacexdata.com/v3/rockets')
    .then((response) => response.json())
    setRockets(response);
  }

  //Service call to fetch Ships data
  const fetchShips = async() => {
    const response = await fetch('https://api.spacexdata.com/v3/ships')
    .then((response) => response.json())
    setShips(response);
  }

  useEffect(() => {
    fetchHistory()
    fetchRockets()
    fetchShips()
  }, [])  

  return (
    <BrowserRouter>
    <Switch>
    <div className="App">
      {/* Navigation Menu */}
      <div className="navigation">
        <div className="logo">
          <a href="/"><img src={Logo} alt="Logo"/></a>
        </div>
        <div id="nav" className="links">
          <div className="nav">
        <a href="/history">History</a>
        <a href="/ships">Ships</a>
        <a href="/rockets">Rockets</a>
        </div>
      </div>
      {/* Responsive Navigation Menu */}
      <label for="">
          <AiOutlineMenu className="menu-btn" onClick={handleMenuClick}/>
          <AiOutlineClose className="close-btn"/>
      </label>
      </div>
      {/* Home Screen */}
      <div className={window.location.pathname === "/" ? "home" : "hide"}>
      {homescreen.map((detail)=> {
        return(
          <Route exact activeClassName="active" path="/" component={() => <Homepage key={detail.id} detail={detail}/>} />
        )
      })};
      </div>
      {/* History Screen */}
      <div className={window.location.pathname === "/history" ? "grid gridhistory" : "hide"}>
      {history.map((record) => {
        return( 
          <Route path="/history" component={() => <History key={record.id} record={record}/>} />
        )
      })}
      </div>
      {/* Rockets Screen */}
      <div className={window.location.pathname === "/rockets" ? "grid" : "hide"}>
      {rockets.map((record) => {
        return( 
          <Route path="/rockets" component={() => <Rockets key={record.id} record={record}/>} />
        )
      })}
      </div>
      {/* Ships Screen */}
      <div className={window.location.pathname === "/ships" ? "grid" : "hide"}>
      {ships.map((record) => {
        return( 
          <Route path="/ships" component={() => <Ships key={record.ship_id} record={record}/>} />
        )
      })}
      </div>
      {/* Detials Screen */}
      <Route path="/details" component={() => <Details />} />
    </div>
    </Switch>
    </BrowserRouter>
  );
}

export default App;

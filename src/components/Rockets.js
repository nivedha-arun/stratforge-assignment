import React from 'react';
import { useHistory } from 'react-router-dom';

export const Rockets = ({record}) => { 
  const history = useHistory();
  const handleClick = () => history.push({
    pathname: '/details',
    state: { detail: record },
    navigatedFrom : "Rockets"
  });

    return(
      <div className="flip-card">
        <div className="container">
        <div className="card-details" style={{backgroundImage: `url(${record.flickr_images[0]})`,backgroundSize: "cover", width: "100%", height: "100%"}}>
        <div className="card-text">
        <h2>{record.rocket_name}</h2>
        <h1>{record.first_flight}</h1>
        </div>
        </div>
        <div className="flip-details">
        <h2>{record.description}</h2>
        <button className="readmore" type="button" onClick={handleClick}>Read More...</button>
        </div>
      </div>
      </div>
      
      )}
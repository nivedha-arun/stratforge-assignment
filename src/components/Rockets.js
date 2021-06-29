import React from 'react';
import { useHistory, Link } from 'react-router-dom';

export const Rockets = ({ record }) => {

  //Setting navigation related details and state to useHistory
  const history = useHistory();
  const handleClick = () => {
    history.push({
      navigatedFrom: "Rockets"
    })
  }

  return (
    <div className="flip-card">
      <div className="container">
        <div className="card-details" style={{ backgroundImage: `url(${record.flickr_images[0]})`, backgroundSize: "cover", width: "100%", height: "100%" }}>
          <div className="card-text">
            <h2>{record.rocket_name}</h2>
            <h1>{record.first_flight}</h1>
          </div>
        </div>
        <div className="flip-details" onClick={handleClick}>
          <h2>{record.description}</h2>
          <Link className="readmore" to={`/rockets/${record.rocket_id}`} onClick={handleClick}>Know More...</Link>
        </div>
      </div>
    </div>
  )
}
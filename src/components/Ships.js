import { useHistory, Link } from 'react-router-dom';

export const Ships = ({record}) => { 

  //Setting navigation details to useHistory
  const history = useHistory();
  const handleClick = () => {history.push({
    navigatedFrom : "Ships"
  })}

    return(
        <div className="textcontainer">
        <div className="card">
          <div className="main-content">
          <header className="content-title">
              <h1>{record.ship_name}</h1>
          </header>  
          </div>
          <div className="secondary-content" onClick={handleClick}>
            <h2>Ship Type : {record.ship_type}</h2>
            <h2>Home Port : {record.home_port}</h2>
            <Link className="readmore" to={`/ships/${record.ship_id}`} onClick={handleClick}>Know More...</Link>
          </div>
      </div>
      </div>
      )}
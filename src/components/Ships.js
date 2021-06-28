import { useHistory } from 'react-router-dom';

export const Ships = ({record}) => { 

  //Setting navigation related details and state to useHistory
  const history = useHistory();
  const handleClick = () => history.push({
    pathname: '/details',
    state: { detail: record },
    navigatedFrom : "Ships"
  })

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
            <button className="readmore" type="button" onClick={handleClick}>Know More...</button>
          </div>
      </div>
      </div>
      )}
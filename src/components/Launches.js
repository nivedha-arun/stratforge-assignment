export const Launches = ({record}) => { 
    return(
        <div className="textcontainer">
        <div className="card">
        <h2>{record.rocket.rocket_name}</h2>
        <h1>{record.rocket.rocket_type}</h1>
      </div>
      </div>
      )}
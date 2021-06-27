
const History = ({record}) => {
    return (
      <div className="flip-card">
        <div className="container">
        <div className="card-details">
          <header className="content-title">
        <h1>{record.title}</h1>
        </header>  
        <h2>{Date(record.event_date_utc)}</h2>
          </div>
        <div className="history-card">
            <h1>{record.details}</h1>
        </div>
      </div>
      </div>)
}

export default History;
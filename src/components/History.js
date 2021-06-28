
const History = ({ record }) => {
  return (
    <div className="flip-card">
        <div className="container">
        <div className="card-details card-flip" style={{width: "100%", height: "100%"}}>
        <div className="card-text">
        <h1>{record.title}</h1>
        <hr></hr>
        <h2>{Date(record.event_date_utc)}</h2>
        </div>
        </div>
        <div className="flip-details history-flip">
        <h2>{record.details}</h2>
        </div>
      </div>
      </div>
    )
}

export default History;
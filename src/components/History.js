
const History = ({record}) => {
    return (
        <div className="textcontainer">
        <div className="card">
        <h1>{record.title}</h1>
        <h2>{Date(record.event_date_utc)}</h2>
      </div>
      </div>)
}

export default History;
export const Homepage = ({detail}) => { 
    return(
        <div className="section">
        <div className="image" style={{backgroundImage: `url(${detail.url})`}}>
        <div className="section-text">  
        <h2>{detail.category}</h2>
        <h1>{detail.title}</h1>
        </div>
      </div>
      </div>
      )}
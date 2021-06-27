import { useHistory } from 'react-router-dom'; 
import ReactTable from "react-table";  

export const Details = () => {
    let tableDets = []
    const history = useHistory();
    var detail = history.location.state.detail;

    var params = ["company", "diameter", "height", "mass", "cost_per_launch", "success_rate_pct"]

    params.map((value) => {
        var info = "";
        if(detail[value]["meters"]){
            info = detail[value]["meters"] + " meters";
        }
        else if(detail[value]["kg"]){
            info = detail[value]["kg"] + " kg";
        }
        else{
            info = detail[value];
        }
        return (
            tableDets.push({
                name : value,
                data : info
            })
        )
    })

    console.log(tableDets);

    return(
        <div className="detailsScreen">
            <div className="detailsBackground" 
                style={{
                    position: "absolute",
                    backgroundImage: `url(${detail.flickr_images[1]})`,
                    backgroundSize: "cover", 
                    width: "100%", 
                    height: "100%"
                }}>
            <div className="title">
                <h1>{detail.rocket_name}</h1>
                </div>
            </div>
            <div className="info">
                <h1> Overview </h1>
                {tableDets.map((record) => {
                    return (
                        <div>
                        <h1>{record.name}</h1>
                        <h1>{record.data}</h1>
                        </div>
                    )
                })}
            </div>
        </div>

    )
} 
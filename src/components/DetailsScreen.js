import { useHistory } from 'react-router-dom';

export const Details = () => {
    let tableDets = []
    var image = "", title= "", description= "";

    //Have used useHistory to get the navigated from details and state
    const history = useHistory();
    var detail = history.location.state.detail;
    var navigation = history.location.navigatedFrom;

    //Format data for the Rocket details screen
    if (navigation === "Rockets") {
        var params = ["company", "diameter", "height", "mass", "cost_per_launch", "success_rate_pct"]
        image = detail.flickr_images[1];
        title = detail.rocket_name;
        description = detail.description;

        params.map((value) => {
            var info = "";
            if (detail[value]["meters"]) {
                info = detail[value]["meters"] + " meters";
            }
            else if (detail[value]["kg"]) {
                info = detail[value]["kg"] + " kg";
            }
            else {
                info = detail[value];
            }
            return (
                tableDets.push({
                    name: value,
                    data: info
                })
            )
        })
    }
    //Format data for the Ship details screen
    else if(navigation === "Ships"){
        image = detail.image;
        title = detail.ship_name;
        if(detail.url){
        description = "For more details refer to this link ("+detail.url+")";}
        let param = ["ship_name", "roles", "year_built", "missions", "weight_kg", "home_port"];
        let info = "";
        
        param.map((value) => {
            if(detail[value]){
            if (value === "missions"){
                info = detail[value][0].name;
            }
            else{
                info = detail[value];
            }}
            return(
                tableDets.push({
                    name : value,
                    data : info
                }))}
        )
    }

    return (
        <div className="detailsScreen">
            <div className="detailsBackground"
                style={{
                    position: "absolute",
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "100%"
                }}>
                <div className="title">
                    <h1>{title}</h1>
                </div>
            </div>

            {/* Overview Section */}
            <div className="info">
                <h1 className="info-title"> Overview </h1>
                {tableDets.map((record) => {
                    return (
                        <div>
                            <h1>{record.name}</h1>
                            <h1>{record.data}</h1>
                        </div>
                    )})}
            </div>

            {/* Description Section */}
            <div className={description ? "description" : "hide"}>
                <h1>Description</h1>
                <p>{description}</p>
            </div>
        </div>

    )
}
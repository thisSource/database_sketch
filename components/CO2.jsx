function CO2(props){
    return(
        <div className="content">
              <div key={props.co2_id} className="grid grid-cols-3 gap-1">
            <span className="mr-5">{Number(props.co2_value).toFixed(1)}</span>
            <span className="mr-5">{Number(props.co2_per_share).toFixed(4)}</span>
        </div>
        </div>
    )
}

export default CO2
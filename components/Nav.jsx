function Nav(props){
    return(
        <div key={props.nav_id} className="grid grid-cols-3 gap-1">
            <span className="mr-5">{Number(props.nav_value).toFixed(1)}</span>
            <span className="mr-5">{Number(props.total_shares).toFixed(1)}</span>
            <span className="mr-5">{Number(props.nav_per_share).toFixed(4)}</span>
        </div>
    )
}

export default Nav

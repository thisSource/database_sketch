function Users(props){
    return(
        <div key={props.user_id} className="grid grid-cols-4 gap-1">
            <span className="mr-5">{props.user_name}</span>
            <span className="mr-5">{props.balance}</span>
            <span className="mr-5">{props.shares}</span>
            <span className="mr-5">{props.cash_claim}</span>
        </div>
    )
}

export default Users
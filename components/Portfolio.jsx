function Portfolio(props) {
  return (
    <div className="content">
      <div key={props.asset_id} className="grid grid-cols-2 gap-1">
        <span className="mr-5">{props.asset_name}</span>
        <span className="mr-5">{props.asset_value}</span>
      </div>
    </div>
  );
}

export default Portfolio;

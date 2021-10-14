import "./updates_widget.css"

export function Updates(props) {
  var arr = props.update_arr;

  const format_updates = (str) => {
    str = str.trim();
    let msgs = str.split(":");
    console.log(msgs);
    return (
      <div className="updates_widget_item">
        <h3 className="updates_widget_header">{msgs[0].trim()}</h3>
        <hr className="updates_widget_hr" />
        <div className="updates_widget_value">{msgs[1].trim()}</div>
      </div>
    );
  };

  return (
    <div className="updates_widget">
      {arr.map((itm) => (
        <div>{format_updates(itm)}</div>
      ))}
    </div>
  );
}

export default Updates;

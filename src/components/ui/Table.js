import React, { useState } from "react";
import { HardwareSecurity } from "material-ui/svg-icons";

const compareValues = (key, neworder) => {
  //
  return function(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return neworder === "desc" ? comparison * -1 : comparison;
  };
};
// Props: data, header
const Table = props => {
  var { data, onChangePage, headers } = props;
  const [order, setOrder] = useState("asc");

  console.log("######", props);

  if (data.length === 0) {
    return <p />;
  }
  if (headers) {
    headers = [...headers];
  } else {
    headers = Object.keys(data[0]); //all headers
  }
  const doOrder = h => {
    let newOrder = order;
    newOrder === "asc" ? (newOrder = "desc") : (newOrder = "asc");

    setOrder(newOrder);
    const sortedData = data.sort(compareValues(h, newOrder));
    //setData(props.data.sort(compareValues("title", newOrder)));
    onChangePage(sortedData);
  };

  let tableElement = null;
  tableElement = (
    <div className="card">
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            {headers.map((header, key) => (
              <th key={key} className="header is-danger">
                <button
                  className="button is-danger"
                  id={header.name}
                  onClick={() => {
                    doOrder(header.name);
                  }}
                >
                  {header.dispname}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, key) => (
            <tr key={key}>
              {headers.map((header, k) => (
                <td key={k} className="is-size-7">
                  {header.type === "value" && ":"}
                  {header.type === "date" &&
                    new Date(row[header.name]).toLocaleString()}
                  {header.type === "text" && row[header.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return [<div>{tableElement}</div>];
};
export default Table;

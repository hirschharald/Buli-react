import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./ui/Table";

const compareValues = key => {
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
    return comparison * -1;
  };
};
//
const Bltable = props => {
  //const [url] = props;

  var { url } = props;

  const [results, setResults] = useState({ data: [] });

  useEffect(() => {
    fetchTableDate()
      .then(result => {
        setResults({
          data: result.data
        });
      })
      .catch(error => {
        return error;
      });
  }, []);

  const fetchTableDate = () => {
    return axios.get(url);
  };

  console.log(results);

  const chartList = results.data.map((team, index) => {
    console.log(team);

    const props = {
      key: index,
      points: team.Points,
      goals: team.Goals,
      spiele: team.Matches,
      team: team.TeamName
    };

    return { ...props };
  });

  const sortedData = chartList.sort(compareValues("points"));
  sortedData.map((team, i) => {
    team.key = i + 1;
    return { ...team };
  });

  const headers = [
    { dispname: "Rang", name: "key", type: "text" },
    { dispname: "Team", name: "team", type: "text" },
    { dispname: "Punkte", name: "points", type: "text" },
    { dispname: "Spiele", name: "spiele", type: "text" },
    { dispname: "Tore", name: "goals", type: "text" }
  ];

  return (
    <>
      <Table data={chartList} headers={headers} filterable={true} />
    </>
  );
};

export default Bltable;

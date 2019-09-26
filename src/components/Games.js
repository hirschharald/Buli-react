import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./ui/Table";

const Games = props => {
  //const [spieltag, url] = props;

  var { spieltag, url } = props;

  const [results, setResults] = useState({ games: [] });

  useEffect(() => {
    fetchAllGames()
      .then(result => {
        setResults({
          games: result.data
        });
      })
      .catch(error => {
        return error;
      });
  }, [spieltag]);

  const fetchAllGames = () => {
    return axios.get(props.url + props.spieltag);
  };

  console.log(results);

  const listOfGames = results.games.map((game, index) => {
    var goalTeam1 = null,
      goalTeam2 = null;

    if (game.MatchResults.length === 0) {
      console.log("*********************");
    } else {
      goalTeam1 = game.MatchResults[0].PointsTeam1;
      goalTeam2 = game.MatchResults[0].PointsTeam2;
    }

    const props = {
      key: game.MatchID,
      homeiconsrc: game.Team1.TeamIconUrl,
      guesticonsrc: game.Team2.TeamIconUrl,
      hometeamname: game.Team1.TeamName,
      guestteamname: game.Team2.TeamName,
      isGameFinished: game.MatchIsFinished,
      hometeamgoals: goalTeam1,
      guestteamgoals: goalTeam2
    };

    return { ...props };
  });
  console.log(listOfGames);

  const headers = [
    { dispname: "Heim", name: "hometeamname", type: "text" },
    { dispname: "", name: "hometeamgoals", type: "text" },
    { dispname: "", name: "", type: "value" },
    { dispname: "", name: "guestteamgoals", type: "text" },
    { dispname: "Gast", name: "guestteamname", type: "text" }
  ];

  return (
    <>
      <Table data={listOfGames} headers={headers} />
    </>
  );
};

export default Games;

import React, { useState } from "react";
import Games from "./Games";
import Bltable from "./BlTable";

const App = () => {
  // Tabelle https://www.openligadb.de/api/getbltable/bl1/2019

  const [spieltag, setSpielTag] = useState("1");

  var optionmap = [];
  for (let index = 1; index < 18; index++) {
    optionmap.push(
      '<option value="' +
        index.toString() +
        '">' +
        index.toString() +
        ". Spieltag </option>"
    );
  }
  const onClickHandler = e => {
    setSpielTag(e.target.value);
  };

  return (
    <>
      <div class="columns">
        <div class="columns">
          <div class="column" />
          <div class="column">
            <br />
            <br />
            <br />
            <br />
            <div class="select">
              <select onClick={onClickHandler}>
                <option value="1">1. Spieltag </option>
                <option value="2">2. Spieltag</option>
                <option value="3">3. Spieltag </option>
                <option value="4">4. Spieltag </option>
                <option value="5">5. Spieltag </option>
                <option value="6">6. Spieltag </option>
                <option value="7">7. Spieltag </option>
                <option value="8">8. Spieltag </option>
                <option value="9">9. Spieltag </option>
                <option value="10">10. Spieltag </option>
                <option value="11">11. Spieltag </option>
                <option value="12">12. Spieltag </option>
                <option value="13">13. Spieltag </option>
                <option value="14">14. Spieltag </option>
                <option value="15">15. Spieltag </option>
                <option value="16">16. Spieltag </option>
                <option value="17">17. Spieltag </option>
              </select>
            </div>
          </div>
          <div class="column" />
        </div>
        <div class="column">
          <h1 className="title has-text-link"> Tabelle </h1>
          <Bltable url="https://www.openligadb.de/api/getbltable/bl1/2019" />
          <h1 className="title has-text-link"> {spieltag}. Spieltag </h1>
          <Games
            url="https://www.openligadb.de/api/getmatchdata/bl1/2019/"
            spieltag={spieltag}
          />
        </div>
        <div class="column" />
      </div>
    </>
  );
};

export default App;

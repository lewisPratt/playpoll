//allows the user to start a new poll to share with friends.
//starts with a minimum of two options with ability to add more as needed
//should allow user to search for a game via IGDB, with realtime search result

import GameOption from "./GameOption";
import { useState } from "react";

class GameChoice {
  name: string;
  votes: number;
  constructor(name: string, votes: number = 0) {
    this.name = name;
    this.votes = votes;
  }
}

function StartNewPoll() {
  const gameChoiceFirst = new GameChoice("EmptyOption1");
  const gameChoiceSecond = new GameChoice("EmptyOption2");
  let defaultGamesArray: GameChoice[] = [];
  defaultGamesArray.push(gameChoiceFirst);
  defaultGamesArray.push(gameChoiceSecond);

  const [gameSelections, setGameSelections] =
    useState<GameChoice[]>(defaultGamesArray);

  //add a new empty game container to allow extra games to be added to poll.
  //creates a new array and pushes current games selection into it, otherwise state does not
  //detect a change as previousArray is the same array as before, despite having additional contents.
  function addAnotherOption() {
    const previousArray = gameSelections;
    let newArray = [...previousArray];
    newArray.push(new GameChoice(`EmptyOption${newArray.length + 1}`));
    setGameSelections(newArray);
  }

  function clearGames() {
    setGameSelections(defaultGamesArray);
  }

  function clearSingleGame(e: React.MouseEvent<HTMLButtonElement>) {
    //get name of current game that's been clicked from data atrtibute
    const gameToClear = e.currentTarget.parentElement?.dataset.gameName;
    if (!gameToClear) return;
    const gamesArray = gameSelections;
    const foundGame = gamesArray.find((x) => gameToClear === x.name);
    if (foundGame) {
      const foundGameIndex = gamesArray.indexOf(foundGame);
      gamesArray.splice(foundGameIndex, 1);
      const newGamesArray = [...gamesArray];
      setGameSelections(newGamesArray);
    } else {
      console.log("game not found");
    }
  }
  return (
    <>
      <p>
        Pick at least two games below to create a new poll, then share the code
        with friends to start the voting!
      </p>
      <section id="game-option-container">
        {gameSelections.map((value, index) => (
          <div key={`${value.name} - ${index}`}>
            <GameOption
              keyValue={value.name}
              name={value.name}
              votes={value.votes}
              clearFunc={clearSingleGame}
            />
          </div>
        ))}
        <div id="add-more-games" onClick={addAnotherOption}>
          Add
        </div>
        <div id="add-more-games" onClick={clearGames}>
          Clear
        </div>
      </section>
    </>
  );
}
export default StartNewPoll;

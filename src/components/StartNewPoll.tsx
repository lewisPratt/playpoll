//allows the user to start a new poll to share with friends.
//starts with a minimum of two options with ability to add more as needed
//should allow user to search for a game via IGDB, with realtime search result
import { v4 as uuidv4 } from "uuid";
import GameOption from "./GameOption";
import { useState } from "react";

class GameChoice {
  name: string;
  votes: number;
  identifier: string;
  constructor(name: string, votes: number = 0, identifier = uuidv4()) {
    this.name = name;
    this.votes = votes;
    this.identifier = identifier;
  }
}

function StartNewPoll() {
  const gameChoiceFirst = new GameChoice(`Empty Slot`);
  const gameChoiceSecond = new GameChoice(`Empty Slot`);
  let defaultGamesArray: GameChoice[] = [];
  defaultGamesArray.push(gameChoiceFirst);
  defaultGamesArray.push(gameChoiceSecond);

  const [gameSelections, setGameSelections] =
    useState<GameChoice[]>(defaultGamesArray);

  //add a new empty game container to allow extra games to be added to poll.
  //creates a new array and pushes current games selection into it, otherwise state does not
  //detect a change as previousArray is the same array as before, despite having additional contents.
  function addAnotherOption() {
    if (gameSelections.length < 12) {
      const previousArray = gameSelections;
      let newArray = [...previousArray];
      newArray.push(new GameChoice(`Empty Slot`));
      setGameSelections(newArray);
    } else {
      //show notification of limit
    }
  }

  function clearGames() {
    setGameSelections(defaultGamesArray);
  }

  function clearSingleGame(e: React.MouseEvent<HTMLButtonElement>) {
    if (gameSelections.length > 2) {
      //get name of current game that's been clicked from data atrtibute
      const gameToClear = e.currentTarget.parentElement?.dataset.slotId;
      if (!gameToClear) return;
      const gamesArray = gameSelections;
      const foundGame = gamesArray.find((x) => gameToClear === x.identifier);
      if (foundGame) {
        const foundGameIndex = gamesArray.indexOf(foundGame);
        gamesArray.splice(foundGameIndex, 1);
        const newGamesArray = [...gamesArray];
        setGameSelections(newGamesArray);
      } else {
        console.log("game not found");
      }
    }
  }
  return (
    <>
      <p>
        Pick at least two games below to create a new poll, then share the code
        with friends to start the voting!
      </p>
      <section id="game-option-container">
        <div id="add-more-container">
          {gameSelections.length > 2 ? (
            <button id="reset-slots" onClick={clearGames}>
              Reset
            </button>
          ) : null}
          <button id="add-more-games" onClick={addAnotherOption}>
            Add Game Slot
          </button>
        </div>
        {gameSelections.map((value, index) => (
          <div key={`${value.name}-${index}`}>
            <GameOption
              identifier={value.identifier}
              name={`${value.name}`}
              votes={value.votes}
              clearFunc={clearSingleGame}
              slotCount={gameSelections.length}
            />
          </div>
        ))}
      </section>
    </>
  );
}
export default StartNewPoll;

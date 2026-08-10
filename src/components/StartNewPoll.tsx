//allows the user to start a new poll to share with friends.
//starts with a minimum of two options with ability to add more as needed
//should allow user to search for a game via IGDB, with realtime search result
import { v4 as uuidv4 } from "uuid";
import GameOption from "./GameOption";
import SearchBox from "./SearchBox";
import { useState } from "react";

class GameChoice {
  name: string;
  votes: number;
  identifier: string;
  cover: string;
  constructor(
    name: string,
    votes: number = 0,
    identifier = uuidv4(),
    cover: string = "",
  ) {
    this.name = name;
    this.votes = votes;
    this.identifier = identifier;
    this.cover = cover;
  }
}

function StartNewPoll() {
  const gameChoiceFirst = new GameChoice(`Empty Slot`);
  const gameChoiceSecond = new GameChoice(`Empty Slot`);
  const maxSlots: number = 12;
  let defaultGamesArray: GameChoice[] = [];
  defaultGamesArray.push(gameChoiceFirst);
  defaultGamesArray.push(gameChoiceSecond);

  const [gameSelections, setGameSelections] =
    useState<GameChoice[]>(defaultGamesArray);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [searchBoxString, setSearchBox] = useState<string>("");

  //add a new empty game container to allow extra games to be added to poll.
  //creates a new array and pushes current games selection into it, otherwise state does not
  //detect a change as previousArray is the same array as before, despite having additional contents.
  function addAnotherOption() {
    if (gameSelections.length < maxSlots) {
      const previousArray = gameSelections;
      let newArray = [...previousArray];
      newArray.push(new GameChoice(`Empty Slot`));
      setGameSelections(newArray);
    } else {
      setErrorMsg(`${maxSlots} is the maximum!`);
    }
  }

  function clearGames() {
    if (errorMsg != "") setErrorMsg("");
    setGameSelections(defaultGamesArray);
  }

  function clearSingleGame(e: React.MouseEvent<HTMLButtonElement>) {
    if (gameSelections.length > 2) {
      setErrorMsg("");
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
  function setSelectedGame(gameName: string, gameCover: string, slot: string) {
    // alert("you selected ".concat(gameName) + " in slot:" + slot);
    const slotToFill = gameSelections.find((currentSlot) => {
      return currentSlot.identifier === slot;
    });
    if (slotToFill) {
      slotToFill.cover = gameCover;
      const updatedSelections = [...gameSelections];
      setGameSelections(updatedSelections);
    }
  }
  console.log(gameSelections);
  return (
    <>
      <p>
        Pick at least two games below to create a new poll, then share the code
        with friends to start the voting!
      </p>
      {searchBoxString ? (
        <SearchBox
          searchBoxSetter={setSearchBox}
          slotIdentifier={searchBoxString}
          selectedGameSetter={setSelectedGame}
        />
      ) : null}

      <section id="game-option-container">
        <div id="add-more-container">
          {errorMsg ? <span>{errorMsg}</span> : null}
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
              searchBoxSetter={setSearchBox}
              cover={value.cover}
            />
          </div>
        ))}
      </section>
    </>
  );
}
export default StartNewPoll;

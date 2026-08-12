//allows the user to start a new poll to share with friends.
//starts with a minimum of two options with ability to add more as needed
//should allow user to search for a game via IGDB, with realtime search result
import { v4 as uuidv4 } from "uuid";
import GameOption from "./GameOption";
import SearchBox from "./SearchBox";
import { useState } from "react";
import ShareCodeGenerator from "./ShareCodeGenerator";
import { supabase } from "./supabaseClient";
import ShareCodeOverlay from "./ShareCodeOverlay";
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
  const [saveState, setSaveState] = useState<string | null>(null);
  const [shareCodeOverlay, setShareCodeOverlay] = useState<boolean>(false);
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
      slotToFill.name = gameName;
      const updatedSelections = [...gameSelections];
      setGameSelections(updatedSelections);
      setSearchBox("");
    }
  }

  async function savePoll(gamesArray: GameChoice[]) {
    const shareCode = ShareCodeGenerator();

    const { data, error } = await supabase.from("polls").insert([
      {
        share_code: shareCode,
        selected_games: gamesArray,
      },
    ]);

    if (error) {
      console.error("Error creating poll:", error);
    } else {
      console.log("Poll created:", data);
      //sucessful poll insertion
      setSaveState(shareCode);
      setShareCodeOverlay(true);
    }
  }

  return (
    <>
      <p>
        Pick at least two games below to create a new poll, then share the code
        with friends to start the voting!
      </p>
      {shareCodeOverlay && saveState ? (
        <ShareCodeOverlay
          shareCode={saveState}
          shareOverlaySetter={setShareCodeOverlay}
        />
      ) : null}
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

        {gameSelections.find((game) => {
          //check the game selections array to see if any of the games have the default empty name
          //find() returns true if the condition is met so renders null
          // if there are no games that have the default empty slot name, render save button
          //check runs every time a game is added to a slot due to re render
          return game.name === "Empty Slot";
        }) && saveState === null ? null : (
          <div id="save-poll-button-container">
            <button
              id="save-poll-button"
              onClick={() => {
                savePoll(gameSelections);
              }}
            >
              Save Poll
            </button>
          </div>
        )}
      </section>
    </>
  );
}
export default StartNewPoll;

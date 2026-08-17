//allows the user to start a new poll to share with friends.
//starts with a minimum of two options with ability to add more as needed
//should allow user to search for a game via IGDB, with realtime search result
import { v4 as uuidv4, type UUIDTypes } from "uuid";
import GameOption from "./GameOption";
import SearchBox from "./SearchBox";
import { useState } from "react";
import ShareCodeGenerator from "./ShareCodeGenerator";
import { supabase } from "./supabaseClient";
import ShareCodeOverlay from "./ShareCodeOverlay";
import { Link } from "react-router-dom";

class GameChoice {
  name: string;
  identifier: string;
  cover: string;
  constructor(name: string, identifier = uuidv4(), cover: string = "") {
    this.name = name;
    this.identifier = identifier;
    this.cover = cover;
  }
}
interface gameChoiceShape {
  name: string;
  identifier: UUIDTypes;
  cover: string;
}
interface votesArrayShape {
  [key: string]: number;
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
  const [clipboardCopied, setClipboardCopied] = useState<boolean>(false);

  //add a new empty game container to allow extra games to be added to poll.
  //creates a new array and pushes current games selection into it, otherwise state does not
  //detect a change as previousArray is the same array as before, despite having additional contents.
  function handleAddSlot() {
    if (gameSelections.length < maxSlots) {
      const previousArray = gameSelections;
      let newArray = [...previousArray];
      newArray.push(new GameChoice(`Empty Slot`));
      setGameSelections(newArray);
    } else {
      setErrorMsg(`${maxSlots} is the maximum!`);
    }
  }

  function handleClearSelectedGames() {
    if (errorMsg != "") setErrorMsg("");
    setGameSelections(defaultGamesArray);
  }

  function handleClearSingleGame(e: React.MouseEvent<HTMLButtonElement>) {
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
  function handleSaveToClipboard(e: React.MouseEvent<HTMLParagraphElement>) {
    console.log(e.currentTarget.innerText);
    navigator.clipboard.writeText(e.currentTarget.innerText);
    setClipboardCopied(true);
  }

  async function handleSavePoll(gamesArray: gameChoiceShape[]) {
    const shareCode = ShareCodeGenerator();
    const gameVotes: votesArrayShape = {};

    gamesArray.forEach((game) => {
      gameVotes[String(game.identifier)] = 0;
    });
    const { data, error } = await supabase.from("polls").insert([
      {
        share_code: shareCode,
        selected_games: gamesArray,
        votes: gameVotes,
        voters: [],
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
        {saveState === null ? (
          <div id="add-more-container">
            {errorMsg ? <span>{errorMsg}</span> : null}
            {gameSelections.length > 2 ? (
              <button id="reset-slots" onClick={handleClearSelectedGames}>
                Reset
              </button>
            ) : null}
            <button id="add-more-games" onClick={handleAddSlot}>
              Add Game Slot
            </button>
          </div>
        ) : null}
        {gameSelections.map((value, index) => (
          <div key={`${value.name}-${index}`}>
            <GameOption
              identifier={value.identifier}
              name={`${value.name}`}
              handleClearSingleGame={handleClearSingleGame}
              slotCount={gameSelections.length}
              searchBoxSetter={setSearchBox}
              cover={value.cover}
              saveState={saveState}
            />
          </div>
        ))}

        {gameSelections.find((game) => {
          //check the game selections array to see if any of the games have the default empty name
          //find() returns true if the condition is met so renders null
          // if there are no games that have the default empty slot name, render save button
          //check runs every time a game is added to a slot due to re render
          return game.name === "Empty Slot";
        }) || saveState != null ? null : (
          <div id="save-poll-button-container">
            <button
              id="save-poll-button"
              onClick={() => {
                handleSavePoll(gameSelections);
              }}
            >
              Save Poll
            </button>
          </div>
        )}
        {saveState ? (
          <div id="share-code-container">
            <p id="instruct">
              Share this code with your friends to start voting!
            </p>
            <p id="code" onClick={handleSaveToClipboard}>
              {saveState}
            </p>
            {clipboardCopied ? (
              <p id="copied-p">
                Share code copied to clipboard{" "}
                <Link id="author-join-link" to="/join">
                  Join
                </Link>
              </p>
            ) : null}
          </div>
        ) : null}
      </section>
    </>
  );
}
export default StartNewPoll;

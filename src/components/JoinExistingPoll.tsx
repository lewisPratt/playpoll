import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import GameOptionViewer from "./GameOptionViewer";
import { supabase } from "./supabaseClient";
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
interface storedGame {
  cover: string;
  identifier: string;
  name: string;
  votes: number;
}

interface returnedGameData {
  selected_games: storedGame[];
}

function JoinExistingPoll() {
  const [gameSelections, setGameSelections] = useState<GameChoice[] | null>(
    null,
  );

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [voteStatus, setVoteStatus] = useState<boolean>(false);
  const [voteIdentifier, setVoteIdentifier] = useState<string | null>(null);
  const [alreadyVoted, setAlreadyVoted] = useState<boolean>(false);
  const [currentShareCode, setCurrentShareCode] = useState<string>("");

  function handleVoteCast(e: React.MouseEvent<HTMLDivElement>) {
    if (voteStatus && voteIdentifier != null) {
      console.log("You've already voted");
      setAlreadyVoted(true);
    }
    if (!voteStatus && voteIdentifier === null) {
      const gameVotedFor = e.currentTarget.dataset.slotId
        ? e.currentTarget.dataset.slotId
        : "unkown";
      localStorage.setItem(
        "pollChoice",
        JSON.stringify({ currentShareCode, gameVotedFor }),
      );

      setVoteStatus(true);
      setVoteIdentifier(gameVotedFor);
    }
  }

  async function getPoll(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const shareCode = formData.get("share-code");
    console.log(shareCode);
    if (shareCode) {
      setCurrentShareCode(shareCode.toString());
      console.log("set local sharecode");
    }
    const { data, error } = await supabase
      .from("polls")
      .select("selected_games")
      .eq("share_code", shareCode);

    if (error) {
      console.error("Error creating poll:", error);
    } else {
      console.log("Poll grabbed:", data);
      //sucessful poll insertion
      console.log(data[0].selected_games);
      const storedGames: GameChoice[] = data[0].selected_games;
      setGameSelections(storedGames);
    }
  }
  return (
    <>
      {voteStatus && voteIdentifier != null ? (
        <p>Your vote has been cast</p>
      ) : (
        <p>Cast your vote below</p>
      )}
      {alreadyVoted ? <p>You've already voted you silly goose!</p> : null}
      <section id="game-option-container">
        {gameSelections ? (
          gameSelections.map((value, index) => (
            <div key={`${value.name}-${index}`}>
              <GameOptionViewer
                identifier={value.identifier}
                name={`${value.name}`}
                votes={value.votes}
                handleVoteCast={handleVoteCast}
                slotCount={gameSelections.length}
                cover={value.cover}
                votedFor={voteIdentifier}
              />
            </div>
          ))
        ) : (
          <div id="join-poll-input-container">
            <h2>Join an existing poll</h2>
            <form id="join-form" onSubmit={getPoll}>
              <input type="text" name="share-code" id="share-code"></input>
              <button>Join Poll</button>
            </form>
          </div>
        )}
      </section>
    </>
  );
}

export default JoinExistingPoll;

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

function JoinExistingPoll() {
  const [gameSelections, setGameSelections] = useState<GameChoice[] | null>(
    null,
  );

  const [errorMsg, setErrorMsg] = useState<string>("");

  function castUserVote() {
    return <p>A vote was cast</p>;
  }

  async function getPoll(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const shareCode = formData.get("share-code");
    console.log(shareCode);

    const { data, error } = await supabase
      .from("polls")
      .select("selected_games")
      .eq("share_code", shareCode);

    if (error) {
      console.error("Error creating poll:", error);
    } else {
      console.log("Poll created:", data);
      //sucessful poll insertion
      // setSaveState(shareCode);
    }
  }
  return (
    <>
      {gameSelections ? (
        gameSelections.map((value, index) => (
          <div key={`${value.name}-${index}`}>
            <GameOptionViewer
              identifier={value.identifier}
              name={`${value.name}`}
              votes={value.votes}
              castVote={castUserVote}
              slotCount={gameSelections.length}
              cover={value.cover}
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
    </>
  );
}

export default JoinExistingPoll;

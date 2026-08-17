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
interface localPollDataShape {
  share_code: string;
  voterId: string;
  gameVotedFor: string;
}
interface localStoreShape {
  polls: localPollDataShape[];
}
function JoinExistingPoll() {
  const [gameSelections, setGameSelections] = useState<GameChoice[] | null>(
    null,
  );
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [voteStatus, setVoteStatus] = useState<boolean>(false);
  const [voteIdentifier, setVoteIdentifier] = useState<string | null>(null);
  const [alreadyVoted, setAlreadyVoted] = useState<boolean>(false);
  const [currentShareCode, setCurrentShareCode] = useState<string>("");
  const localPollsData = localStorage.getItem("polls");

  if (localPollsData) {
    const parsedData: localStoreShape = JSON.parse(localPollsData);
    console.log(parsedData.polls);
    if (
      parsedData.polls.find((poll: localPollDataShape) => {
        return poll.share_code === currentShareCode;
      })
    ) {
      console.log("already voted in this poll");
    }
  }

  async function submitVote(
    gameIdent: string,
    voterId: string,
    shareCode: string,
  ) {
    const fetchData = async () => {
      const response = await fetch(
        `https://lmzsnthuaysxrqgygfwm.supabase.co/functions/v1/cast-vote`,
        {
          method: "POST",
          body: JSON.stringify({
            gameIdent,
            voterId,
            shareCode,
          }),
          headers: {
            Authorization: `Bearer ${publishableKey}`,
            accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.error) {
        console.log("error");
        //setErrorMsg(data.error.error);
        console.log(data);
      } else {
        //successful api call
        console.log(data);
      }
    };

    fetchData();
  }
  function handleVoteCast(e: React.MouseEvent<HTMLDivElement>) {
    if (voteStatus && voteIdentifier != null) {
      console.log("You've already voted");
      setAlreadyVoted(true);
    }
    if (!voteStatus && voteIdentifier === null) {
      const gameVotedFor = e.currentTarget.dataset.slotId
        ? e.currentTarget.dataset.slotId
        : "unkown";
      const voterId = uuidv4();
      if (localStorage.getItem("polls")) {
        //polls already stored locally, update them
        const localPollsData = localStorage.getItem("polls");
        const pollsObject = localPollsData && JSON.parse(localPollsData);
        let localPolls = [...pollsObject.polls];
        localPolls.push({
          share_code: currentShareCode,
          gameVotedFor,
          voterId,
        });
        const updatedLocalPolls = { polls: localPolls };
        localStorage.setItem("polls", JSON.stringify(updatedLocalPolls));
      } else {
        //no local data stored, save first poll
        localStorage.setItem(
          "polls",
          JSON.stringify({
            polls: [{ share_code: currentShareCode, gameVotedFor, voterId }],
          }),
        );
      }

      setVoteStatus(true);
      setVoteIdentifier(gameVotedFor);
      submitVote(gameVotedFor, voterId, currentShareCode);
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
      {voteStatus && voteIdentifier != null && (
        <div id="vote-cast-container">
          <p id="vote-status-text">Your vote has been cast</p>
          <p id="vote-hangout-prompt">
            Hang out here or come back later to see the results!
          </p>
        </div>
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

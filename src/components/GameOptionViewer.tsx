import React, { useState } from "react";
import cn from "classnames";

interface gameOptionProps {
  name: string;
  votes: number;
  identifier: string;
  slotCount: number;
  cover: string;
  votedFor: string | null;
  castVote: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function GameOptionViewer({
  name,
  votes,
  identifier,
  castVote,
  slotCount,
  cover,
  votedFor,
}: gameOptionProps) {
  const [slideInAnimation, setSlideInAnimation] = useState<boolean>(false);

  return (
    <div
      data-slot-id={identifier}

      onClick={
        votedFor === null
          ? castVote
          : () => {
              console.log("nno longer attached");
            }
      }
      onAnimationEnd={(e: React.AnimationEvent) => setSlideInAnimation(true)}
      className={cn(
        !slideInAnimation ? "game-slot-insert-class" : null,
        slideInAnimation && votedFor === null
          ? "game-slot-mounted-class"
          : null,
        votedFor === null && "game-option-viewer-item", // no vote as yet so set the default card styling
        votedFor === identifier && "vote-choice", //this is the card the user voted on
        votedFor != identifier && votedFor != null && "not-picked", //this game card was not voted on so style accordingly
      )}
    >
      <div>
        <h2>{name}</h2>
      </div>

      {cover ? (
        <figure>
          <img className="game-cover" src={cover} />
        </figure>
      ) : null}
    </div>
  );
}

export default GameOptionViewer;

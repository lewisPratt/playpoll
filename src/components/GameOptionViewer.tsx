import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import cn from "classnames";

interface gameOptionProps {
  name: string;
  votes: number;
  identifier: string;
  slotCount: number;
  cover: string;
  castVote: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function GameOptionViewer({
  name,
  votes,
  identifier,
  castVote,
  slotCount,
  cover,
}: gameOptionProps) {
  const [boxShadowColor, _setBoxShadowColor] = useState<string>(
    "10px 10px 10px rgba(0,0,0,.5)",
  );
  const [slideInAnimation, setSlideInAnimation] = useState<boolean>(false);

  return (
    <div
      onAnimationEnd={(e: React.AnimationEvent) => setSlideInAnimation(true)}
      className={cn(
        "game-option-item",
        slideInAnimation ? "game-slot-mounted-class" : "game-slot-insert-class",
      )}
      style={{ boxShadow: `${boxShadowColor}` }}
    >
      <div data-slot-id={identifier}>
        <h2>{name}</h2>
        {slotCount > 2 ? (
          <button className="remove-slot-button" onClick={castVote}>
            Remove slot
          </button>
        ) : null}
      </div>

      {cover ? <img className="game-cover" src={cover} /> : null}
    </div>
  );
}

export default GameOptionViewer;

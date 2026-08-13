import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import cn from "classnames";

interface gameOptionProps {
  name: string;
  votes: number;
  identifier: string;
  slotCount: number;
  cover: string;
  castVote: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function GameOptionViewer({
  name,
  votes,
  identifier,
  castVote,
  slotCount,
  cover,
}: gameOptionProps) {
  const [slideInAnimation, setSlideInAnimation] = useState<boolean>(false);

  return (
    <div
      onClick={castVote}
      onAnimationEnd={(e: React.AnimationEvent) => setSlideInAnimation(true)}
      className={cn(
        "game-option-viewer-item",
        slideInAnimation ? "game-slot-mounted-class" : "game-slot-insert-class",
      )}
    >
      <div data-slot-id={identifier}>
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

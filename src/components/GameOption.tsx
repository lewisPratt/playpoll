import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import cn from "classnames";
interface gameOptionProps {
  name: string;
  votes: number;
  identifier: string;
  clearFunc: (e: React.MouseEvent<HTMLButtonElement>) => void;
  slotCount: number;
  searchBoxSetter: Dispatch<SetStateAction<string>>;
  cover: string;
}

function GameOption({
  name,
  votes,
  identifier,
  clearFunc,
  slotCount,
  cover,
  searchBoxSetter,
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
          <button className="remove-slot-button" onClick={clearFunc}>
            Remove slot
          </button>
        ) : null}
      </div>

      <button
        className="add-game-button"
        onClick={() => searchBoxSetter(identifier)}
      >
        {cover ? "Change" : "Add"}
      </button>
      {cover ? <img className="game-cover" src={cover} /> : null}
    </div>
  );
}

export default GameOption;

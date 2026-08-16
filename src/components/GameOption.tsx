import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import cn from "classnames";
interface gameOptionProps {
  name: string;
  identifier: string;
  handleClearSingleGame: (e: React.MouseEvent<HTMLButtonElement>) => void;
  slotCount: number;
  searchBoxSetter: Dispatch<SetStateAction<string>>;
  cover: string;
  saveState: string | null;
}

function GameOption({
  name,
  identifier,
  handleClearSingleGame,
  slotCount,
  cover,
  searchBoxSetter,
  saveState,
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
        {slotCount > 2 && saveState === null ? (
          <button
            className="remove-slot-button"
            onClick={handleClearSingleGame}
          >
            Remove slot
          </button>
        ) : null}
      </div>
      {saveState === null ? (
        <button
          className="add-game-button"
          onClick={() => searchBoxSetter(identifier)}
        >
          {cover ? "Change" : "Add"}
        </button>
      ) : null}
      {cover ? <img className="game-cover" src={cover} /> : null}
    </div>
  );
}

export default GameOption;

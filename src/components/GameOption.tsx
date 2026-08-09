import React, { useState } from "react";
import SearchBox from "./SearchBox";
import type { Dispatch, SetStateAction } from "react";

interface gameOptionProps {
  name: string;
  votes: number;
  identifier: string;
  clearFunc: (e: React.MouseEvent<HTMLButtonElement>) => void;
  slotCount: number;
  searchBoxSetter: Dispatch<SetStateAction<boolean>>;
}

function GameOption({
  name,
  votes,
  identifier,
  clearFunc,
  slotCount,
  searchBoxSetter,
}: gameOptionProps) {
  return (
    <div className="game-option-item">
      <div data-slot-id={identifier}>
        <h2>{name}</h2>
        {slotCount > 2 ? (
          <button onClick={clearFunc}>Remove slot</button>
        ) : null}
      </div>

      <button className="add-game-button" onClick={() => searchBoxSetter(true)}>
        ADD
      </button>
    </div>
  );
}

export default GameOption;

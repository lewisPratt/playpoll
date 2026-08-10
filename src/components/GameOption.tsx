import React, { useState } from "react";
import SearchBox from "./SearchBox";
import type { Dispatch, SetStateAction } from "react";
import Vibrant from "node-vibrant";
import type { Vec3 } from "node-vibrant/lib/color";

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
  const opts = {};
  let vibrantDominant: Vec3;
  let shadowColour: string = "";
  const [boxShadowColor, setBoxShadowColor] = useState<string>(
    "10px 10px 10px rgba(0,0,0,.5)",
  );
  if (cover) {
    let v = new Vibrant(cover, opts);
    v.getPalette().then((palette) => {
      if (palette.Vibrant) {
        vibrantDominant = palette.Vibrant.getRgb();
        vibrantDominant.forEach((colorValue) => {
          shadowColour = shadowColour + colorValue.toString() + ",";
        });
        const shadowColor = `10px 10px 10px rgba(${shadowColour}.5)`;
        setBoxShadowColor(shadowColor);
      }
    });
  }
  return (
    <div
      className="game-option-item"
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

import type { Dispatch, SetStateAction } from "react";

interface SearchBoxProps {
  searchBoxSetter: Dispatch<SetStateAction<string>>;
  slotIdentifier: string;
}

function SearchBox({ searchBoxSetter, slotIdentifier }: SearchBoxProps) {
  function closeOverlay(e: React.MouseEvent<HTMLDivElement>) {
    const clicked = e.target;
    if (clicked === e.currentTarget) {
      searchBoxSetter("");
    }
  }

  return (
    <>
      <div className="overlay" onClick={closeOverlay}>
        <div className="search-container">
          <form>
            <input
              id="search-box"
              type="text"
              placeholder="Name of your game"
            />
            <input
              id="game-slot"
              type="text"
              name="game-slot"
              hidden
              value={slotIdentifier}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchBox;

import type { Dispatch, SetStateAction } from "react";

interface SearchBoxProps {
  searchBoxSetter: Dispatch<SetStateAction<string>>;
  slotIdentifier: string;
}

function SearchBox({ searchBoxSetter, slotIdentifier }: SearchBoxProps) {
  let timer: number;
  function closeOverlay(e: React.MouseEvent<HTMLDivElement>) {
    const clicked = e.target;
    if (clicked === e.currentTarget) {
      searchBoxSetter("");
    }
  }

  function debounceSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value != "") {
      clearTimeout(timer);
      timer = setTimeout(searchGame, 2000);
    }
  }

  async function searchGame() {
    alert("search sent");
  }
  return (
    <>
      <div className="overlay" onClick={closeOverlay}>
        <div className="search-container">
          <form>
            <input
              id="search-box"
              type="text"
              onChange={debounceSearch}
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

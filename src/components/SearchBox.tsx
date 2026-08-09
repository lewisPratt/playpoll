import type { Dispatch, SetStateAction } from "react";

interface SearchBoxProps {
  searchBoxSetter: Dispatch<SetStateAction<boolean>>;
}

function SearchBox({ searchBoxSetter }: SearchBoxProps) {
  function closeOverlay(e: React.MouseEvent<HTMLDivElement>) {
    const clicked = e.target;
    if (clicked === e.currentTarget) {
      searchBoxSetter(false);
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
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchBox;

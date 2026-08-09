import type { Dispatch, SetStateAction } from "react";

interface SearchBoxProps {
  searchBoxSetter: Dispatch<SetStateAction<string>>;
  slotIdentifier: string;
}

function SearchBox({ searchBoxSetter, slotIdentifier }: SearchBoxProps) {
  let timer: number;
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  function closeOverlay(e: React.MouseEvent<HTMLDivElement>) {
    const clicked = e.target;
    if (clicked === e.currentTarget) {
      searchBoxSetter("");
    }
  }

  function debounceSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value != "") {
      clearTimeout(timer);
      timer = setTimeout(function () {
        searchGame(e.target.value);
      }, 2000);
    }
  }

  async function searchGame(searchTerm: string) {
    console.log(searchTerm);
    const fetchData = async () => {
      const response = await fetch(
        `https://lmzsnthuaysxrqgygfwm.supabase.co/functions/v1/quick-api`,
        {
          method: "POST",
          body: JSON.stringify({
            searchTerm: `${searchTerm}`,
          }),
          headers: {
            Authorization: `Bearer ${publishableKey}`,
            accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.error) {
        console.log("error");
        //setErrorMsg(data.error.error);
        console.log(data);
      } else {
        //successful api call
        console.log(data);
      }
    };

    fetchData();
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
              readOnly
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchBox;

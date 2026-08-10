import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { v4 as uuidv4 } from "uuid";
interface SearchBoxProps {
  searchBoxSetter: Dispatch<SetStateAction<string>>;
  slotIdentifier: string;
  selectedGameSetter: (
    arg_one: string,
    arg_two: string,
    arg_three: string,
  ) => void;
}
interface gameResults {
  name: string;
  coverUrl: string;
  image_id: string;
}
function SearchBox({
  searchBoxSetter,
  slotIdentifier,
  selectedGameSetter,
}: SearchBoxProps) {
  const [searchResults, setSearchResults] = useState<gameResults[] | null>(
    null,
  );
  const [loadingState, setLoadingState] = useState<boolean>(false);

  let timer: ReturnType<typeof setTimeout>;
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  //closes the search box and overlay if the overlay is clicked.
  function closeOverlay(e: React.MouseEvent<HTMLDivElement>) {
    const clicked = e.target;
    if (clicked === e.currentTarget) {
      searchBoxSetter("");
    }
  }
  //closes the search box and overlay if escape is pressed while focus is on the searchbox input
  function closeOverlayKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      searchBoxSetter("");
    }
  }

  //delay the sending of api query to give user a chance to type in their game name
  //when timer is finished call api query function
  function debounceSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchResults(null);
    if (e.target.value.length >= 3) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        searchGame(e.target.value);
      }, 500);
    } else {
      //setSearchResults(null);
    }
  }

  //query api endpoint, first check that search term is above 3 characters to avoid pointless calls
  async function searchGame(searchTerm: string) {
    if (searchTerm.length >= 3) {
      console.log("sendign search query: " + searchTerm);
      setLoadingState(true);
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
          setLoadingState(false);
          if (data.length > 0) {
            setSearchResults(data);
          } else {
            setSearchResults(null);
          }
        }
      };

      fetchData();
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
              onChange={debounceSearch}
              placeholder="Name of your game"
              autoComplete="off"
              onKeyUp={closeOverlayKey}
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
          <>
            <div id="results-container">
              {loadingState ? <p>Searching..</p> : null}
              {searchResults ? (
                searchResults.map((result) => (
                  <div
                    key={uuidv4()}
                    onClick={() =>
                      selectedGameSetter(
                        result.name,
                        "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/" +
                          result.image_id +
                          ".jpg",

                        slotIdentifier,
                      )
                    }
                  >
                    <SearchResult name={result.name} image={result.coverUrl} />
                  </div>
                ))
              ) : (
                <p id="no-results-p">Waiting for pro gamer knowledge...</p>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default SearchBox;

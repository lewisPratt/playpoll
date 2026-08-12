interface searchResultProps {
  name: string;
  image: string;
  release: number;
}
function SearchResult({ name, image, release }: searchResultProps) {
  const gameLargeCover =
    "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/".concat(image);
  const releaseDate = new Date(release * 1000);
  return (
    <div
      className="search-result"
      data-game-name={name}
      data-game-cover={gameLargeCover}
    >
      <h4>{name}</h4>
      <p>{releaseDate.toLocaleDateString()}</p>
      <img src={image}></img>
    </div>
  );
}

export default SearchResult;

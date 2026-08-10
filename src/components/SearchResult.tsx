interface searchResultProps {
  name: string;
  image: string;
}
function SearchResult({ name, image }: searchResultProps) {
  const gameLargeCover =
    "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/".concat(image);
  return (
    <div
      className="search-result"
      data-game-name={name}
      data-game-cover={gameLargeCover}
    >
      <h4>{name}</h4>
      <img src={image}></img>
    </div>
  );
}

export default SearchResult;

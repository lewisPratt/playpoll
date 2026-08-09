interface searchResultProps {
  name: string;
  image: string;
}
function SearchResult({ name, image }: searchResultProps) {
  return (
    <div className="search-result">
      <h4>{name}</h4>
      <img src={image}></img>
    </div>
  );
}

export default SearchResult;

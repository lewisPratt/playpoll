interface gameOptionProps {
  name: string;
  votes: number;
  keyValue: string;
  clearFunc: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function GameOption({ name, votes, keyValue, clearFunc }: gameOptionProps) {
  return (
    <div key={keyValue} className="game-option-item" data-game-name={name}>
      <h2>{name}</h2>
      <button onClick={clearFunc}>Remove game</button>
    </div>
  );
}

export default GameOption;

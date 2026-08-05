interface gameOptionProps {
  name: string;
  votes: number;
  identifier: string;
  clearFunc: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function GameOption({ name, votes, identifier, clearFunc }: gameOptionProps) {
  return (
    <div className="game-option-item" data-slot-id={identifier}>
      <h2>{name}</h2>
      <button onClick={clearFunc}>Remove game</button>
    </div>
  );
}

export default GameOption;

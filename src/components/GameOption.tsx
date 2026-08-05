interface gameOptionProps {
  name: string;
  votes: number;
  keyValue: string;
}

function GameOption({ name, votes, keyValue }: gameOptionProps) {
  return (
    <div key={keyValue} className="game-option-item">
      <h2>{name}</h2>
    </div>
  );
}

export default GameOption;

function JoinExistingPoll() {
  return (
    <div id="join-poll-input-container">
      <h2>Join an existing poll</h2>
      <form id="join-form">
        <input type="text" name="share-code" id="share-code"></input>
        <button>Join Poll</button>
      </form>
    </div>
  );
}

export default JoinExistingPoll;

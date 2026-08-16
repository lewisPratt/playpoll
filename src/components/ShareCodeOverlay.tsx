import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface shareCodeOverlayProps {
  shareCode: string;
  shareOverlaySetter: Dispatch<SetStateAction<boolean>>;
}

function ShareCodeOverlay({
  shareCode,
  shareOverlaySetter,
}: shareCodeOverlayProps) {
  const [clipboardCopied, setClipboardCopied] = useState<boolean>(false);

  //closes the search box and overlay if the overlay is clicked.
  function handleCloseOverlay(e: React.MouseEvent<HTMLDivElement>) {
    const clicked = e.target;
    if (clicked === e.currentTarget) {
      shareOverlaySetter(false);
    }
  }
  function handleSaveToClipboard(e: React.MouseEvent<HTMLParagraphElement>) {
    console.log(e.currentTarget.innerText);
    navigator.clipboard.writeText(e.currentTarget.innerText);
    setClipboardCopied(true);
  }
  return (
    <div className="overlay" onClick={handleCloseOverlay}>
      <div id="share-code-container">
        <p id="instruct">Share this code with your friends to start voting!</p>
        <p id="code" onClick={handleSaveToClipboard}>
          {shareCode}
        </p>
        {clipboardCopied ? (
          <p id="copied-p">
            Share code copied to clipboard{" "}
            <Link id="author-join-link" to="/join">
              Join
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default ShareCodeOverlay;

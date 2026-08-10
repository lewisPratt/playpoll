import { gameWords, descriptiveWords } from "./ShareCodeArrays";

//generates a share code using two seperate arrays of strings then joins them and returns
function ShareCodeGenerator() {
  //Fisher-Yates Shuffle
  function shuffleWords(a: string[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  let shareCodeArray: string[] = [];
  for (let i = 0; i < 6; i++) {
    if (i === 0 || i === 2 || i === 4) {
      shuffleWords(descriptiveWords);
      shareCodeArray.push(descriptiveWords[0]);
    } else {
      shuffleWords(gameWords);
      shareCodeArray.push(gameWords[0]);
    }
  }

  return shareCodeArray.join("-");
}

export default ShareCodeGenerator;

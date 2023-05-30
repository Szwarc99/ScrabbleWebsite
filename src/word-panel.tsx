export interface word {
  word: string;
  used: string;
  notUsed: string;
  needed: string;
  val: number;
}

interface IWordPanel {
  word: word;
}

export function WordPanel(props: IWordPanel) {
  return (
    <div className="result-box">
      <h1 className="title is-2">
        {props.word.word + ": " + props.word.val + " pkt"}
      </h1>
      <p>Użyjesz liter: {" " + props.word.used}</p>
      <p>Zostaną Ci litery:{" " + props.word.notUsed}</p>
      {/* <p>Potrzebne Ci następujące litery z planszy: {props.word.needed}</p> */}
    </div>
  );
}

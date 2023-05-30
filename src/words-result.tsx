import React, { useState, useEffect } from "react";
import { WordPanel, word } from "./word-panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface IWordsResult {
  words: word[];
}

function compare(propName: string, reversed: boolean) {
  if (reversed)
    return function (a: any, b: any) {
      if (a[propName] > b[propName]) return -1;
      if (a[propName] < b[propName]) return 1;
      return 0;
    };
  else
    return function (a: any, b: any) {
      if (a[propName] < b[propName]) return -1;
      if (a[propName] > b[propName]) return 1;
      return 0;
    };
}

function sortWords(propName: string, rev: boolean, list: word[]) {
  return list.sort(compare(propName, rev));
}

export function WordsResult(props: IWordsResult) {
  const [page, setPage] = useState(0);
  const [dropdown, setDropdown] = useState("");
  const [sortedWords, setSortedWords] = useState(Array<word>());
  const numberOfResultsPerPage = 5;
  const numberOfPages = Math.ceil(props.words.length / numberOfResultsPerPage);

  const data = sortedWords.slice(page, page + numberOfResultsPerPage);

  useEffect(() => {
    // Sort the initial words array
    const sorted = sortWords("val", true, props.words);
    setSortedWords(sorted);
  }, [props.words]);

  const handleSortClick = (propName: string, reversed: boolean) => {
    const sorted = sortWords(propName, reversed, props.words);
    setSortedWords(sorted);
    setDropdown("");
  };

  return (
    <div>
      <div className={"dropdown pb-3" + dropdown}>
        <div className="dropdown-trigger">
          <button
            className="button"
            onClick={() => {
              if (dropdown === "") {
                setDropdown(" is-active");
              } else {
                setDropdown("");
              }
            }}
          >
            <span>Sortuj</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a
              href="#"
              className="dropdown-item"
              onClick={() => handleSortClick("val", true)}
            >
              Sortuj po wartości malejąco
            </a>
            <a
              href="#"
              className="dropdown-item"
              onClick={() => handleSortClick("val", false)}
            >
              Sortuj po wartości rosnąco
            </a>
            <a
              href="#"
              className="dropdown-item"
              onClick={() => handleSortClick("word", false)}
            >
              Sortuj A-Z
            </a>
            <a
              href="#"
              className="dropdown-item"
              onClick={() => handleSortClick("word", true)}
            >
              Sortuj Z-A
            </a>
          </div>
        </div>
      </div>
      {data.map((word: word, i: number) => (
        <div key={i}>
          <WordPanel word={word} />
        </div>
      ))}
      <button
        className="button"
        onClick={() => setPage(0)}
        disabled={page === 0}
      >
        Wróć do startu
      </button>
      <button
        className="button"
        onClick={() => setPage(page - numberOfResultsPerPage)}
        disabled={page === 0}
      >
        Porzednia strona
      </button>
      <button
        className="button"
        onClick={() => setPage(page + numberOfResultsPerPage)}
        disabled={page === (numberOfPages - 1) * numberOfResultsPerPage}
      >
        Następna strona
      </button>
    </div>
  );
}

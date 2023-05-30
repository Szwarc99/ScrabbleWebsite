import React, { useState } from "react";
import "./styles/index.scss";
import { fetchWords } from "./requests";
import { WordsResult } from "./words-result";
import { Book } from "./book-search";

export function MainPage() {
  const [letters, setLetters] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLetters(event.target.value);
  };
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setWords([]);
      setLoading(true);
      const data = await fetchWords(letters);
      // console.log(data);
      setWords(JSON.parse(data)["words"]);
      // console.log(words);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="whole-background">
      <section className="scrabble-hero">
        <div className="hero-body">
          <p className="title">Asystent Scrabble</p>
          <p className="subtitle">
            Podaj swoje litery, aby otrzymać możliwe słowa.
          </p>
        </div>
      </section>
      <div className="container pt-3">
        <div className="results-wrapper">
          <div className="pb-3">
            <input
              className="scrabble-input"
              type="text"
              placeholder="twoje litery"
              onChange={handleChange}
            ></input>
            <button className="button" onClick={handleClick}>
              <span>szukaj</span>
            </button>
          </div>
          {loading && (
            <div className="book-wrapper">
              <Book />
            </div>
          )}
          {words.length > 0 && <WordsResult words={words} />}
        </div>
      </div>
    </div>
  );
}

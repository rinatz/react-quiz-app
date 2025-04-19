import React, { useRef, useState } from "react";
import quizDataJson from "./quizzes.json";
import _ from "lodash";

interface Quiz {
  id: number;
  question: string;
  choices: string[];
  answerIndex: number;
}

function App(): React.ReactElement {
  const quizzes = useRef<Quiz[]>(_.shuffle(quizDataJson.quizzes));

  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  function handleClick(choiceIndex: number) {
    if (choiceIndex === quizzes.current[quizIndex].answerIndex) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setQuizIndex(quizIndex + 1);
  }

  if (quizIndex < quizzes.current.length) {
    return (
      <>
        <span>{quizIndex + 1}問目</span>{" "}
        <span>/ {quizzes.current.length}問</span>
        <fieldset>
          <legend>{quizzes.current[quizIndex].question}</legend>

          <div>
            {quizzes.current[quizIndex].choices.map((choice, choiceIndex) => (
              <button onClick={() => handleClick(choiceIndex)}>{choice}</button>
            ))}
          </div>
        </fieldset>
        <div>
          <p>正解数: {correctAnswers}</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>あなたの正解数は...</h1>
        <h2>{correctAnswers}問</h2>
      </>
    );
  }
}

export default App;

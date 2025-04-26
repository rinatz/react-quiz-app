import React, { useEffect, useRef, useState } from "react";
import quizDataJson from "./quizzes.json";
import _ from "lodash";
import ResultScreen from "./ResultScreen";
import Answer from "./Answer";

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

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  function checkAnswer(choiceIndex: number) {
    if (choiceIndex === quizzes.current[quizIndex].answerIndex) {
      setIsCorrect(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIsCorrect(false);
    }

    setShowAnswer(true);
  }

  useEffect(() => {
    if (showAnswer) {
      const timer = setTimeout(() => {
        setShowAnswer(false);
        setQuizIndex(quizIndex + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showAnswer, quizIndex]);

  if (quizIndex < quizzes.current.length) {
    return (
      <>
        <div className="mx-auto mt-10 max-w-xl space-y-6 rounded-2xl bg-white p-6 shadow">
          <div className="text-sm text-gray-500">
            <span>{quizIndex + 1}問目</span>{" "}
            <span>/ {quizzes.current.length}問</span>
          </div>
          <fieldset className="space-y-4">
            <legend className="mb-4 text-lg font-bold text-gray-800">
              {quizzes.current[quizIndex].question}
            </legend>

            <div className="grid gap-3">
              {quizzes.current[quizIndex].choices.map((choice, choiceIndex) => (
                <button
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-left transition hover:border-blue-400 hover:bg-blue-50"
                  onClick={() => checkAnswer(choiceIndex)}
                >
                  {choice}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="text-sm text-gray-600">
            <p>
              正解数:{" "}
              <span className="font-semibold text-green-600">
                {correctAnswers}
              </span>
            </p>
          </div>
        </div>
        <Answer isCorrect={isCorrect} show={showAnswer} />
      </>
    );
  } else {
    return <ResultScreen correctAnswers={correctAnswers} />;
  }
}

export default App;

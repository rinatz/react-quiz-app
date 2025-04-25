import confetti from "canvas-confetti";
import { useEffect } from "react";

type ResultScreenProps = {
  correctAnswers: number;
};

export default function ResultScreen({ correctAnswers }: ResultScreenProps) {
  useEffect(() => {
    confetti({ particleCount: 300, spread: 150, origin: { y: 0.5 } });
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 bg-gradient-to-br from-blue-50 to-white text-center">
      <h1 className="animate-pulse text-2xl font-bold text-gray-800 sm:text-3xl">
        あなたの正解数は...
      </h1>
      <h2 className="text-5xl font-extrabold text-blue-600 drop-shadow-lg sm:text-6xl">
        {correctAnswers}問
      </h2>
    </div>
  );
}

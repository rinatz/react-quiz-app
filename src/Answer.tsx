type AnswerProps = {
  isCorrect: boolean;
  show: boolean;
};

export default function Answer(props: AnswerProps) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`text-[200px] font-extrabold drop-shadow-lg sm:text-[300px] ${
          props.isCorrect ? "text-green-400" : "text-red-400"
        }`}
      >
        {props.isCorrect ? "◯" : "✕"}
      </div>
    </div>
  );
}

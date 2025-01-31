import React from 'react';

function Result({ score, total, restartQuiz }) {
  let badge = '';
  const percentage = (score / total) * 100;
  if (percentage === 100) {
    badge = 'Quiz Master!';
  } else if (percentage >= 70) {
    badge = 'Great Job!';
  } else if (percentage >= 40) {
    badge = 'Good Effort!';
  } else {
    badge = 'Keep Practicing!';
  }

  return (
    <div>
      <h2 className="score">Quiz Completed!</h2>
      <p className="score">Your Score: {score} / {total}</p>
      <p className="score">{badge}</p>
      <button className="button" onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
}

export default Result;

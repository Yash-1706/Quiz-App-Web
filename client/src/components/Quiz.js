import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';

// Helper function to shuffle an array (Fisher–Yates algorithm)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Quiz() {
  const [quizData, setQuizData] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to start the quiz and fetch quiz data from the backend
  const startQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/quiz');
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      const data = await response.json();

      // If the quiz data indicates to shuffle, randomize questions and options
      if (data.shuffle) {
        data.questions = shuffleArray(data.questions);
        data.questions = data.questions.map(q => ({
          ...q,
          options: shuffleArray(q.options)
        }));
      }

      setQuizData(data);
      setQuizStarted(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error fetching quiz data. Please try again later.');
      setLoading(false);
    }
  };

  // Handler for when an answer is selected
  const handleAnswer = (selectedOption) => {
    const currentQuestion = quizData.questions[currentQIndex];

    // Use marks from quizData; default to 10 for correct and 0 for negative if not provided
    const correctMarks = quizData.correct_answer_marks ? parseFloat(quizData.correct_answer_marks) : 10;
    const negativeMarks = quizData.negative_marks ? parseFloat(quizData.negative_marks) : 0;

    if (selectedOption.is_correct) {
      setScore(prevScore => prevScore + correctMarks);
    } else {
      setScore(prevScore => prevScore - negativeMarks);
    }

    // Proceed to next question or mark quiz as completed
    if (currentQIndex + 1 < quizData.questions.length) {
      setCurrentQIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Restart the quiz
  const restartQuiz = () => {
    setQuizData(null);
    setCurrentQIndex(0);
    setScore(0);
    setQuizStarted(false);
    setQuizCompleted(false);
    setError('');
  };

  // Render different views based on state
  if (loading) {
    return <div className="quiz-container"><p>Loading quiz...</p></div>;
  }

  if (error) {
    return <div className="quiz-container"><p>{error}</p></div>;
  }

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <button className="button" onClick={startQuiz}>Start Quiz</button>
      </div>
    );
  }

  if (quizCompleted) {
    // Total possible score (correctMarks * number of questions)
    const correctMarks = quizData.correct_answer_marks ? parseFloat(quizData.correct_answer_marks) : 10;
    const total = correctMarks * quizData.questions.length;
    return (
      <div className="quiz-container">
        <Result score={score} total={total} restartQuiz={restartQuiz} />
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Display the quiz title if available */}
      {quizData.title && <h2>{quizData.title}</h2>}
      <Question
        question={quizData.questions[currentQIndex]}
        questionNumber={currentQIndex + 1}
        totalQuestions={quizData.questions.length}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}

export default Quiz;

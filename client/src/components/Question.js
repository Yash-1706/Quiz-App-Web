import React from 'react';

function Question({ question, questionNumber, totalQuestions, handleAnswer }) {
  return (
    <div>
      <h3 className="question">Question {questionNumber} of {totalQuestions}</h3>
      <p className="question">{question.description}</p>
      <ul className="options">
        {question.options.map((option) => (
          <li className="option" key={option.id}>
            <button onClick={() => handleAnswer(option)}>
              {option.description}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;

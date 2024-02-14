// Question.js
import React from 'react';

const Question = ({ question, handleAnswer }) => {
  return (
    <div className="question">
      <h2>{question.text}</h2>
      <ul>
        {question.options.map((option, index) => (
          <li key={index} onClick={() => handleAnswer(option.isCorrect)}>
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;

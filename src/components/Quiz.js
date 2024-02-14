// Quiz.js

import React, { useState } from 'react';
import Score from './Score';
import { questionsData } from '../data/Question';
import image from './prayer.avif'; // Import the image file

function Quiz() {
    const [level, setLevel] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const filteredQuestions = questionsData.filter(question => question.level === level);

    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < filteredQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(null);
        } else {
            setShowResult(true);
        }
    };

    const updateScore = () => {
        if (clickedOption !== null && filteredQuestions[currentQuestion]?.correct_option === clickedOption) {
            setScore(score + 1);
        }
    };

    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(null);
        setScore(0);
    };

    if (!filteredQuestions.length) {
        return <div>No questions available for the selected level.</div>;
    }

    const currentQuestionData = filteredQuestions[currentQuestion];

    return (
        <div>
            <div className="quiz-container">
                <div className="quiz-content">
                    <h2 className="heading-txt">Islamic Quiz</h2>
                    <div className="container">
                        {showResult ? (
                            <Score score={score} totalScore={filteredQuestions.length} tryAgain={resetAll} />
                        ) : (
                            <>
                                <div className="level-selection">
                                    <p>Select Level:</p>
                                    <select value={level} onChange={(e) => setLevel(parseInt(e.target.value))}>
                                        <option value={1}>Level 1</option>
                                        <option value={2}>Level 2</option>
                                        <option value={3}>Level 3</option>
                                    </select>
                                </div>
                                <div className="level-details">
                                    <p>Level {level}</p>
                                    <p>Questions: {filteredQuestions.length}</p>
                                </div>
                                <div className="question">
                                    <span id="question-number">{currentQuestion + 1}. </span>
                                    <span id="question-txt">{currentQuestionData.question}</span>
                                </div>
                                <div className="option-container">
                                    {currentQuestionData.options.map((option, i) => (
                                        <button
                                            className={`option-btn ${
                                                clickedOption === i
                                                    ? (i === currentQuestionData.correct_option ? 'correct' : 'incorrect')
                                                    : ''
                                            }`}
                                            key={i}
                                            onClick={() => setClickedOption(i)}
                                            disabled={clickedOption !== null}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <input type="button" value="Next" id="next-button" onClick={changeQuestion} disabled={clickedOption === null} />
                            </>
                        )}
                    </div>
                </div>
                <div className="image-container">
                    <img className='image-container' src={image} alt="Image" />
                </div>
            </div>
        </div>
    );
}

export default Quiz;


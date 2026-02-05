import { useState } from 'react'

export default function QuestionCard({ question, onAnswer, showFeedback }) {
    const [selected, setSelected] = useState(null)

    const handleSelect = (index) => {
        if (showFeedback) return
        setSelected(index)
    }

    const handleSubmit = () => {
        if (selected !== null) {
            onAnswer(selected)
        }
    }

    const getOptionClass = (idx) => {
        let className = 'option-btn'

        if (selected === idx) className += ' selected'

        if (showFeedback) {
            if (idx === question.correctAnswer) {
                className += ' correct'
            } else if (selected === idx && idx !== question.correctAnswer) {
                className += ' incorrect'
            }
        }

        return className
    }

    const letters = ['A', 'B', 'C', 'D']

    return (
        <div className="card fade-in">
            {/* Topic Badge */}
            <div className="topic-badge">
                {question.topic}
            </div>

            {/* Text Passage */}
            <div className="text-passage">
                {question.text}
            </div>

            {/* Question */}
            {question.question && (
                <p className="question-text">{question.question}</p>
            )}

            {/* Options */}
            <div className="options-grid">
                {question.options.map((opt, idx) => (
                    <button
                        key={idx}
                        className={getOptionClass(idx)}
                        onClick={() => handleSelect(idx)}
                        disabled={showFeedback}
                        data-letter={letters[idx]}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* Submit Button */}
            {!showFeedback && (
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        className="btn-primary"
                        onClick={handleSubmit}
                        disabled={selected === null}
                    >
                        Responder
                    </button>
                </div>
            )}

            {/* Feedback */}
            {showFeedback && (
                <div className={`feedback-section ${selected === question.correctAnswer ? 'feedback-correct' : 'feedback-incorrect'}`}>
                    <div className="feedback-title">
                        {selected === question.correctAnswer ? '✓ ¡Correcto!' : '✗ Incorrecto'}
                    </div>
                    <p className="feedback-explanation">{question.explanation}</p>
                </div>
            )}
        </div>
    )
}

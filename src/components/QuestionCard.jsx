import { useState, useEffect } from 'react'

export default function QuestionCard({
    question,
    onAnswer,
    showFeedback,
    mode = 'simulacro',
    previousAnswer,
    onContinue,
    isLastQuestion
}) {
    const [selected, setSelected] = useState(previousAnswer ?? null)

    // Reset selected when question changes
    useEffect(() => {
        setSelected(previousAnswer ?? null)
    }, [question.id, previousAnswer])

    const handleSelect = (index) => {
        if (showFeedback || previousAnswer !== undefined) return
        setSelected(index)
    }

    const handleSubmit = () => {
        if (selected !== null && previousAnswer === undefined) {
            onAnswer(selected)
        }
    }

    const getOptionClass = (idx) => {
        let className = 'option-btn'

        if (selected === idx) className += ' selected'

        if (showFeedback || (previousAnswer !== undefined && mode === 'simulacro')) {
            if (idx === question.correctAnswer) {
                className += ' correct'
            } else if (selected === idx && idx !== question.correctAnswer) {
                className += ' incorrect'
            }
        }

        return className
    }

    const letters = ['A', 'B', 'C', 'D']
    const isCorrect = selected === question.correctAnswer
    const hasAnswered = previousAnswer !== undefined
    const showPassage = mode !== 'rapido' || question.text.length < 300

    return (
        <div className="card fade-in">
            {/* Topic Badge */}
            <div className="topic-badge">
                {question.topic}
            </div>

            {/* Text Passage */}
            {showPassage && (
                <div className="text-passage">
                    {question.text}
                </div>
            )}

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
                        disabled={showFeedback || hasAnswered}
                        data-letter={letters[idx]}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* Submit Button - Only show if not answered yet */}
            {!showFeedback && !hasAnswered && (
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

            {/* Already Answered Indicator (simulacro mode) */}
            {hasAnswered && mode === 'simulacro' && !showFeedback && (
                <div style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    color: 'var(--text-muted)'
                }}>
                    ✓ Ya respondiste esta pregunta
                </div>
            )}

            {/* Feedback (Learning Mode) */}
            {showFeedback && (
                <div className={`feedback-section ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
                    <div className="feedback-title">
                        {isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}
                    </div>
                    <p className="feedback-explanation">{question.explanation}</p>

                    <button
                        className="btn-primary feedback-continue-btn"
                        onClick={onContinue}
                    >
                        {isLastQuestion ? '🏁 Ver Resultados' : '➡️ Siguiente Pregunta'}
                    </button>
                </div>
            )}
        </div>
    )
}


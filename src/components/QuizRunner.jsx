import { useState } from 'react'
import QuestionCard from './QuestionCard'

export default function QuizRunner({ config, onFinish }) {
    const [currentIdx, setCurrentIdx] = useState(0)
    const [answers, setAnswers] = useState({})
    const [showFeedback, setShowFeedback] = useState(false)
    const [animationClass, setAnimationClass] = useState('question-slide-enter')

    const questions = config.questions
    const mode = config.mode || 'simulacro'
    const isLearningMode = mode === 'aprendizaje'

    const handleAnswer = (selectedOptionIndex) => {
        const currentQuestion = questions[currentIdx]
        const newAnswers = { ...answers, [currentQuestion.id]: selectedOptionIndex }
        setAnswers(newAnswers)

        if (isLearningMode) {
            // Show feedback immediately in learning mode
            setShowFeedback(true)
        } else {
            // Move to next in simulacro mode
            goToNext(newAnswers)
        }
    }

    const handleContinue = () => {
        setShowFeedback(false)
        goToNext(answers)
    }

    const goToNext = (currentAnswers) => {
        if (currentIdx < questions.length - 1) {
            setAnimationClass('question-slide-exit')
            setTimeout(() => {
                setCurrentIdx(currentIdx + 1)
                setAnimationClass('question-slide-enter')
            }, 150)
        } else {
            onFinish({
                questions: questions,
                answers: currentAnswers
            })
        }
    }

    const goToPrev = () => {
        if (currentIdx > 0) {
            setAnimationClass('question-slide-exit')
            setTimeout(() => {
                setCurrentIdx(currentIdx - 1)
                setAnimationClass('question-slide-enter')
                setShowFeedback(false)
            }, 150)
        }
    }

    const currentQuestion = questions[currentIdx]
    const progress = ((currentIdx + 1) / questions.length) * 100
    const hasAnswered = answers[currentQuestion.id] !== undefined
    const isLastQuestion = currentIdx === questions.length - 1

    return (
        <div className="fade-in">
            {/* Progress Section */}
            <div className="progress-container">
                <div className="progress-header">
                    <span className="progress-text">
                        Pregunta {currentIdx + 1} de {questions.length}
                    </span>
                    <span className="progress-text" style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem'
                    }}>
                        {mode === 'simulacro' && '📝 Simulacro'}
                        {mode === 'aprendizaje' && '📚 Aprendizaje'}
                        {mode === 'rapido' && '⚡ Rápido'}
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question Card with Animation */}
            <div className={animationClass}>
                <QuestionCard
                    key={currentQuestion.id}
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    showFeedback={showFeedback}
                    mode={mode}
                    previousAnswer={answers[currentQuestion.id]}
                    onContinue={handleContinue}
                    isLastQuestion={isLastQuestion}
                />
            </div>

            {/* Navigation (only in simulacro mode) */}
            {mode === 'simulacro' && (
                <div className="quiz-navigation">
                    <button
                        className="nav-btn prev"
                        onClick={goToPrev}
                        disabled={currentIdx === 0}
                    >
                        Anterior
                    </button>
                    <span className="progress-text">
                        {Object.keys(answers).length} de {questions.length} respondidas
                    </span>
                    <button
                        className="btn-primary"
                        onClick={() => onFinish({ questions, answers })}
                        disabled={Object.keys(answers).length < questions.length}
                        style={{ padding: '0.75rem 1.5rem' }}
                    >
                        Finalizar Quiz
                    </button>
                </div>
            )}
        </div>
    )
}

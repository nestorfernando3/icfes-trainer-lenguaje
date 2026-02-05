import { useState } from 'react'
import QuestionCard from './QuestionCard'

export default function QuizRunner({ config, onFinish }) {
    const [currentIdx, setCurrentIdx] = useState(0)
    const [answers, setAnswers] = useState({})

    const questions = config.questions

    const handleAnswer = (selectedOptionIndex) => {
        const currentQuestion = questions[currentIdx]

        // Save answer
        const newAnswers = { ...answers, [currentQuestion.id]: selectedOptionIndex }
        setAnswers(newAnswers)

        // Move to next or finish
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1)
        } else {
            onFinish({
                questions: questions,
                answers: newAnswers
            })
        }
    }

    const currentQuestion = questions[currentIdx]
    const progress = ((currentIdx + 1) / questions.length) * 100

    return (
        <div className="fade-in">
            {/* Progress Section */}
            <div className="progress-container">
                <div className="progress-header">
                    <span className="progress-text">
                        Pregunta {currentIdx + 1} de {questions.length}
                    </span>
                    <span className="progress-text">
                        Progreso: {Math.round(progress)}%
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                onAnswer={handleAnswer}
                showFeedback={false}
            />
        </div>
    )
}

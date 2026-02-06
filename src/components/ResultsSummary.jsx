import { useEffect, useMemo } from 'react'
import { recordQuizResults } from '../lib/progressStorage'

export default function ResultsSummary({ results, onRetry }) {
    const { questions, answers, category, mode } = results

    // Calculate score
    const { correctCount, score } = useMemo(() => {
        let correct = 0
        questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) {
                correct++
            }
        })
        return {
            correctCount: correct,
            score: Math.round((correct / questions.length) * 100)
        }
    }, [questions, answers])

    // Record progress on mount
    useEffect(() => {
        recordQuizResults(results, category || 'General', mode || 'simulacro')
    }, [results, category, mode])

    let feedbackMsg = ""
    let feedbackEmoji = ""
    if (score >= 90) {
        feedbackMsg = "¡Excelente! Tienes un dominio excepcional."
        feedbackEmoji = "🏆"
    } else if (score >= 70) {
        feedbackMsg = "¡Muy bien! Estás bien preparado."
        feedbackEmoji = "🌟"
    } else if (score >= 50) {
        feedbackMsg = "Buen intento. Repasa algunos conceptos."
        feedbackEmoji = "💪"
    } else {
        feedbackMsg = "Sigue practicando. ¡Tú puedes!"
        feedbackEmoji = "📚"
    }

    return (
        <div className="fade-in">
            {/* Score Card */}
            <div className="card">
                <div className="score-container">
                    <div className="score-circle">
                        <span className="score-value">{score}%</span>
                        <span className="score-label">Puntuación</span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        Acertaste {correctCount} de {questions.length} preguntas
                    </p>

                    <p className="score-message">
                        {feedbackEmoji} {feedbackMsg}
                    </p>

                    <button className="btn-primary" onClick={onRetry}>
                        🔄 Volver a Intentar
                    </button>
                </div>
            </div>

            {/* Detailed Review */}
            <h3 style={{ marginBottom: '1rem' }}>Revisión Detallada</h3>

            {questions.map((q, idx) => {
                const userAnswer = answers[q.id]
                const isCorrect = userAnswer === q.correctAnswer

                return (
                    <div
                        key={q.id}
                        className={`review-card ${isCorrect ? 'correct' : 'incorrect'}`}
                    >
                        <div className="review-header">
                            <span className="review-question-num">
                                Pregunta {idx + 1}
                            </span>
                            <span className={`review-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                                {isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                            </span>
                        </div>

                        <p style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '0.5rem' }}>
                            {q.question || q.text.substring(0, 100) + '...'}
                        </p>

                        <div className="review-answers">
                            <div className={`review-answer ${!isCorrect ? 'user-wrong' : ''}`}>
                                <span>Tu respuesta:</span>
                                <span>{q.options[userAnswer]}</span>
                            </div>

                            {!isCorrect && (
                                <div className="review-answer correct-answer">
                                    <span>Respuesta correcta:</span>
                                    <span>{q.options[q.correctAnswer]}</span>
                                </div>
                            )}
                        </div>

                        <div className="review-explanation">
                            <strong>Explicación:</strong> {q.explanation}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

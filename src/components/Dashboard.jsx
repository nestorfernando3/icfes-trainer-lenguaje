import { useState, useEffect } from 'react'
import { getProgress, getOverallAccuracy, clearProgress } from '../lib/progressStorage'

export default function Dashboard({ onClose }) {
    const [progress, setProgress] = useState(null)
    const [showConfirmClear, setShowConfirmClear] = useState(false)

    useEffect(() => {
        setProgress(getProgress())
    }, [])

    const handleClear = () => {
        clearProgress()
        setProgress(getProgress())
        setShowConfirmClear(false)
    }

    if (!progress) return null

    const accuracy = getOverallAccuracy()
    const hasData = progress.totalQuizzes > 0

    return (
        <div className="dashboard-overlay" onClick={onClose}>
            <div className="dashboard-modal" onClick={e => e.stopPropagation()}>
                <div className="dashboard-header">
                    <h2>📊 Tu Progreso</h2>
                    <button className="dashboard-close" onClick={onClose}>✕</button>
                </div>

                {!hasData ? (
                    <div className="dashboard-empty">
                        <span className="empty-icon">📝</span>
                        <h3>Aún no hay datos</h3>
                        <p>Completa tu primer quiz para comenzar a registrar tu progreso.</p>
                    </div>
                ) : (
                    <>
                        {/* Stats Overview */}
                        <div className="stats-overview">
                            <div className="stat-card">
                                <span className="stat-value">{progress.totalQuizzes}</span>
                                <span className="stat-label">Quizzes</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{progress.totalQuestions}</span>
                                <span className="stat-label">Preguntas</span>
                            </div>
                            <div className="stat-card accent">
                                <span className="stat-value">{accuracy}%</span>
                                <span className="stat-label">Precisión</span>
                            </div>
                        </div>

                        {/* Category Breakdown */}
                        <div className="dashboard-section">
                            <h3>Rendimiento por Área</h3>
                            <div className="category-bars">
                                {Object.entries(progress.categoryStats).map(([cat, stats]) => {
                                    const catAccuracy = stats.questions > 0
                                        ? Math.round((stats.correct / stats.questions) * 100)
                                        : 0
                                    return (
                                        <div key={cat} className="category-bar-item">
                                            <div className="category-bar-header">
                                                <span className="category-bar-name">{cat}</span>
                                                <span className="category-bar-accuracy">{catAccuracy}%</span>
                                            </div>
                                            <div className="category-bar-track">
                                                <div
                                                    className="category-bar-fill"
                                                    style={{ width: `${catAccuracy}%` }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="dashboard-section">
                            <h3>Actividad Reciente</h3>
                            <div className="activity-list">
                                {progress.quizHistory.slice(0, 5).map((quiz, idx) => (
                                    <div key={idx} className="activity-item">
                                        <div className="activity-info">
                                            <span className="activity-category">{quiz.category}</span>
                                            <span className="activity-date">
                                                {new Date(quiz.date).toLocaleDateString('es-CO')}
                                            </span>
                                        </div>
                                        <div className="activity-result">
                                            <span className={`activity-score ${quiz.percentage >= 60 ? 'good' : 'low'}`}>
                                                {quiz.correct}/{quiz.questions}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Clear Data */}
                        <div className="dashboard-footer">
                            {showConfirmClear ? (
                                <div className="confirm-clear">
                                    <span>¿Borrar todo tu progreso?</span>
                                    <button className="btn-danger" onClick={handleClear}>Sí, borrar</button>
                                    <button className="btn-secondary" onClick={() => setShowConfirmClear(false)}>Cancelar</button>
                                </div>
                            ) : (
                                <button
                                    className="btn-text"
                                    onClick={() => setShowConfirmClear(true)}
                                >
                                    🗑️ Borrar progreso
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

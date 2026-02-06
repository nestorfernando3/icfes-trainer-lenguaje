import { useState, useEffect } from 'react'
import { getQuestions, getCategories, getQuestionCounts } from '../lib/questionBank.js'
import ModeSelector from './ModeSelector'
import CategorySelector from './CategorySelector'

export default function ConfigScreen({ onStart }) {
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [questionCounts, setQuestionCounts] = useState({})
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [limit, setLimit] = useState(20)
    const [mode, setMode] = useState('simulacro')

    useEffect(() => {
        const cats = getCategories()
        const counts = getQuestionCounts()
        setCategories(cats)
        setQuestionCounts(counts)
        setLoading(false)
    }, [])

    const handleStart = async () => {
        setLoading(true)
        const questions = await getQuestions(selectedCategory)

        // Shuffle
        let finalQuestions = [...questions].sort(() => Math.random() - 0.5)

        // Limit
        if (limit > 0 && finalQuestions.length > limit) {
            finalQuestions = finalQuestions.slice(0, limit)
        }

        onStart({
            questions: finalQuestions,
            timelimit: 0,
            category: selectedCategory === 'all' ? 'Simulacro Completo' : selectedCategory,
            mode: mode
        })
    }

    if (loading) return (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="loader"></div>
            <p>Preparando banco de preguntas...</p>
        </div>
    )

    return (
        <div className="card fade-in">
            <h2>Configura tu Entrenamiento</h2>
            <p>Selecciona el modo, área de estudio y la cantidad de preguntas para comenzar.</p>

            {/* Mode Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    Modo de Práctica
                </label>
                <ModeSelector selectedMode={mode} onSelect={setMode} />
            </div>

            {/* Category Selector - Now with cards! */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    Área de Estudio
                </label>
                <CategorySelector
                    categories={categories}
                    questionCounts={questionCounts}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                />
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    Cantidad de preguntas
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                    {[10, 20, 50, 0].map(val => (
                        <button
                            key={val}
                            type="button"
                            className={`btn-secondary ${limit === val ? 'active' : ''}`}
                            onClick={() => setLimit(val)}
                        >
                            {val === 0 ? 'Todas' : val}
                        </button>
                    ))}
                </div>
            </div>

            <button className="btn-primary" onClick={handleStart} style={{ width: '100%' }}>
                🚀 Comenzar Entrenamiento
            </button>
        </div>
    )
}


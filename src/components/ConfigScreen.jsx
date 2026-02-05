import { useState, useEffect } from 'react'
import { getQuestions, getCategories } from '../lib/questionBank.js'

export default function ConfigScreen({ onStart }) {
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [limit, setLimit] = useState(20)

    useEffect(() => {
        const cats = getCategories()
        setCategories(cats)
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
            category: selectedCategory === 'all' ? 'Simulacro Completo' : selectedCategory
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
            <p>Selecciona el área de estudio y la cantidad de preguntas para comenzar.</p>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    Área de Estudio
                </label>
                <select
                    className="select-input"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="all">📚 Todas las áreas (Simulacro Completo)</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>📖 {cat}</option>
                    ))}
                </select>
            </div>

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

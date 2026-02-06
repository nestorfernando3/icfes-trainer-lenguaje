import { useState, useMemo } from 'react'

// Category icons and colors mapping
const categoryMeta = {
    'Comprensión Lectora': { icon: '📖', color: '#667eea' },
    'Análisis Textual': { icon: '🔍', color: '#764ba2' },
    'Pensamiento Crítico': { icon: '🧠', color: '#10b981' },
    'Inferencia': { icon: '💡', color: '#f59e0b' },
    'Vocabulario': { icon: '📚', color: '#ef4444' },
    'Argumentación': { icon: '⚖️', color: '#06b6d4' },
    'default': { icon: '📝', color: '#8b5cf6' }
}

export default function CategorySelector({ categories, questionCounts, selected, onSelect }) {
    const [showAll, setShowAll] = useState(false)

    const visibleCategories = showAll ? categories : categories.slice(0, 4)

    const getMeta = (category) => categoryMeta[category] || categoryMeta['default']

    return (
        <div className="category-selector">
            {/* All Categories Option */}
            <button
                className={`category-card all-categories ${selected === 'all' ? 'active' : ''}`}
                onClick={() => onSelect('all')}
            >
                <span className="category-icon">📚</span>
                <div className="category-info">
                    <span className="category-name">Todas las áreas</span>
                    <span className="category-count">Simulacro Completo</span>
                </div>
                {selected === 'all' && <span className="category-check">✓</span>}
            </button>

            {/* Category Grid */}
            <div className="category-grid">
                {visibleCategories.map(cat => {
                    const meta = getMeta(cat)
                    const count = questionCounts[cat] || 0
                    return (
                        <button
                            key={cat}
                            className={`category-card ${selected === cat ? 'active' : ''}`}
                            onClick={() => onSelect(cat)}
                            style={{ '--category-color': meta.color }}
                        >
                            <span className="category-icon">{meta.icon}</span>
                            <div className="category-info">
                                <span className="category-name">{cat}</span>
                                <span className="category-count">{count} preguntas</span>
                            </div>
                            {selected === cat && <span className="category-check">✓</span>}
                        </button>
                    )
                })}
            </div>

            {/* Show More/Less */}
            {categories.length > 4 && (
                <button
                    className="show-more-btn"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? '▲ Mostrar menos' : `▼ Ver ${categories.length - 4} más`}
                </button>
            )}
        </div>
    )
}

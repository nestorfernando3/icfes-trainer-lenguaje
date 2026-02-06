import { useState } from 'react'

const modes = [
    {
        id: 'simulacro',
        icon: '📝',
        title: 'Modo Simulacro',
        description: 'Sin feedback hasta el final. Simula el examen real.',
        color: 'var(--accent-primary)'
    },
    {
        id: 'aprendizaje',
        icon: '📚',
        title: 'Modo Aprendizaje',
        description: 'Feedback inmediato con explicación tras cada respuesta.',
        color: 'var(--success)'
    },
    {
        id: 'rapido',
        icon: '⚡',
        title: 'Modo Rápido',
        description: 'Preguntas directas sin pasajes largos. Práctica ágil.',
        color: 'var(--warning)'
    }
]

export default function ModeSelector({ selectedMode, onSelect }) {
    return (
        <div className="mode-selector">
            {modes.map(mode => (
                <button
                    key={mode.id}
                    className={`mode-card ${selectedMode === mode.id ? 'active' : ''}`}
                    onClick={() => onSelect(mode.id)}
                    style={{ '--mode-color': mode.color }}
                >
                    <span className="mode-icon">{mode.icon}</span>
                    <div className="mode-info">
                        <span className="mode-title">{mode.title}</span>
                        <span className="mode-description">{mode.description}</span>
                    </div>
                    {selectedMode === mode.id && (
                        <span className="mode-check">✓</span>
                    )}
                </button>
            ))}
        </div>
    )
}

export { modes }

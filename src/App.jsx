import { useState } from 'react'
import ConfigScreen from './components/ConfigScreen'
import QuizRunner from './components/QuizRunner'
import ResultsSummary from './components/ResultsSummary'
import ThemeToggle from './components/ThemeToggle'
import Dashboard from './components/Dashboard'

function App() {
  // Screen state: 'config' | 'quiz' | 'results'
  const [screen, setScreen] = useState('config')
  const [config, setConfig] = useState(null)
  const [results, setResults] = useState(null)
  const [showDashboard, setShowDashboard] = useState(false)

  const startQuiz = (selectedConfig) => {
    setConfig(selectedConfig)
    setScreen('quiz')
  }

  const finishQuiz = (quizResults) => {
    setResults({ ...quizResults, category: config.category, mode: config.mode })
    setScreen('results')
  }

  const resetApp = () => {
    setScreen('config')
    setConfig(null)
    setResults(null)
  }

  return (
    <div className="fade-in">
      {/* Floating buttons */}
      <button
        className="dashboard-btn"
        onClick={() => setShowDashboard(true)}
        title="Ver progreso"
      >
        📊
      </button>
      <ThemeToggle />

      {/* Dashboard Modal */}
      {showDashboard && (
        <Dashboard onClose={() => setShowDashboard(false)} />
      )}

      <header className="app-header">
        <h1 className="app-title">ICFES Trainer</h1>
        <p className="app-subtitle">Simulador de Lectura Crítica</p>
      </header>

      <main>
        {screen === 'config' && (
          <ConfigScreen onStart={startQuiz} />
        )}

        {screen === 'quiz' && (
          <QuizRunner
            config={config}
            onFinish={finishQuiz}
          />
        )}

        {screen === 'results' && (
          <ResultsSummary
            results={results}
            onRetry={resetApp}
          />
        )}
      </main>
    </div>
  )
}

export default App

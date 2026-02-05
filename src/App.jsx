import { useState } from 'react'
import ConfigScreen from './components/ConfigScreen'
import QuizRunner from './components/QuizRunner'
import ResultsSummary from './components/ResultsSummary'

function App() {
  // Screen state: 'config' | 'quiz' | 'results'
  const [screen, setScreen] = useState('config')
  const [config, setConfig] = useState(null)
  const [results, setResults] = useState(null)

  const startQuiz = (selectedConfig) => {
    setConfig(selectedConfig)
    setScreen('quiz')
  }

  const finishQuiz = (quizResults) => {
    setResults(quizResults)
    setScreen('results')
  }

  const resetApp = () => {
    setScreen('config')
    setConfig(null)
    setResults(null)
  }

  return (
    <div className="fade-in">
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

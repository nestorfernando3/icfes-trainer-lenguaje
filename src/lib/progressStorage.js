/**
 * Progress Storage Module
 * Handles persistence of quiz statistics in localStorage
 */

const STORAGE_KEY = 'icfes-progress'

// Initialize or get existing progress data
const getStoredProgress = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            return JSON.parse(stored)
        }
    } catch (e) {
        console.error('Error reading progress from localStorage:', e)
    }
    return createEmptyProgress()
}

// Create empty progress structure
const createEmptyProgress = () => ({
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    categoryStats: {},
    quizHistory: [],
    lastUpdated: null
})

// Save progress to localStorage
const saveProgress = (progress) => {
    try {
        progress.lastUpdated = new Date().toISOString()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch (e) {
        console.error('Error saving progress to localStorage:', e)
    }
}

/**
 * Record a completed quiz
 * @param {Object} results - Quiz results object with questions and answers
 * @param {string} category - Category name
 * @param {string} mode - Quiz mode (simulacro, aprendizaje, rapido)
 */
export const recordQuizResults = (results, category, mode) => {
    const progress = getStoredProgress()

    const { questions, answers } = results
    let correct = 0

    questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) {
            correct++
        }
    })

    // Update totals
    progress.totalQuizzes++
    progress.totalQuestions += questions.length
    progress.correctAnswers += correct

    // Update category stats
    if (!progress.categoryStats[category]) {
        progress.categoryStats[category] = {
            quizzes: 0,
            questions: 0,
            correct: 0
        }
    }
    progress.categoryStats[category].quizzes++
    progress.categoryStats[category].questions += questions.length
    progress.categoryStats[category].correct += correct

    // Add to history (keep last 20 quizzes)
    progress.quizHistory.unshift({
        date: new Date().toISOString(),
        category,
        mode,
        questions: questions.length,
        correct,
        percentage: Math.round((correct / questions.length) * 100)
    })

    if (progress.quizHistory.length > 20) {
        progress.quizHistory = progress.quizHistory.slice(0, 20)
    }

    saveProgress(progress)
    return progress
}

/**
 * Get current progress statistics
 */
export const getProgress = () => {
    return getStoredProgress()
}

/**
 * Get overall accuracy percentage
 */
export const getOverallAccuracy = () => {
    const progress = getStoredProgress()
    if (progress.totalQuestions === 0) return 0
    return Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
}

/**
 * Get category-specific accuracy
 */
export const getCategoryAccuracy = (category) => {
    const progress = getStoredProgress()
    const stats = progress.categoryStats[category]
    if (!stats || stats.questions === 0) return 0
    return Math.round((stats.correct / stats.questions) * 100)
}

/**
 * Clear all progress data
 */
export const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY)
}

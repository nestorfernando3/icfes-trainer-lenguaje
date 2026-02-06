import questions from './questions.json';

export const questionBank = questions;

export const getQuestions = (category = 'all') => {
  return new Promise((resolve) => {
    // Artificial delay to simulate loading
    setTimeout(() => {
      if (category === 'all') {
        resolve(questionBank);
      } else {
        resolve(questionBank.filter(q => q.topic.includes(category)));
      }
    }, 500);
  });
};

export const getCategories = () => {
  const categories = [...new Set(questionBank.map(q => q.topic))];
  return categories;
};

export const getQuestionCounts = () => {
  const counts = {};
  questionBank.forEach(q => {
    counts[q.topic] = (counts[q.topic] || 0) + 1;
  });
  return counts;
};

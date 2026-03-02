// ============================================================
// Quiz Engine — Navegação, pontuação
// Respostas só são reveladas após submeter todas as 20
// ============================================================

const QuizEngine = (function () {
  let currentQuestion = 0;
  let answers = {};  // { questionId: optionIndex }
  let lang = 'pt';
  let shuffledQuestions = null;

  // Fisher-Yates shuffle for option order randomization
  function shuffleOptions(questions) {
    return questions.map(function (q) {
      var indices = q.options.map(function (_, i) { return i; });
      for (var i = indices.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = indices[i];
        indices[i] = indices[j];
        indices[j] = tmp;
      }
      var newOptions = indices.map(function (idx) { return q.options[idx]; });
      var newCorrect = indices.indexOf(q.correct);
      return {
        id: q.id,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        options: newOptions,
        correct: newCorrect
      };
    });
  }

  function init(language) {
    lang = language;
    currentQuestion = 0;
    answers = {};
    shuffledQuestions = shuffleOptions(QUESTIONS[lang]);
  }

  function getQuestions() {
    return shuffledQuestions || QUESTIONS[lang];
  }

  function getCurrentIndex() {
    return currentQuestion;
  }

  function getTotalQuestions() {
    return getQuestions().length;
  }

  function getCurrentQuestion() {
    return getQuestions()[currentQuestion];
  }

  function getSelectedOption(index) {
    const q = getQuestions()[index];
    return answers[q.id] !== undefined ? answers[q.id] : -1;
  }

  function selectAnswer(optionIndex) {
    const q = getCurrentQuestion();
    answers[q.id] = optionIndex;
  }

  function hasAnsweredCurrent() {
    const q = getCurrentQuestion();
    return answers[q.id] !== undefined;
  }

  function canGoNext() {
    return hasAnsweredCurrent() && currentQuestion < getTotalQuestions() - 1;
  }

  function canGoBack() {
    return currentQuestion > 0;
  }

  function isLastQuestion() {
    return currentQuestion === getTotalQuestions() - 1;
  }

  function allAnswered() {
    const qs = getQuestions();
    return qs.every(q => answers[q.id] !== undefined);
  }

  function goNext() {
    if (currentQuestion < getTotalQuestions() - 1) {
      currentQuestion++;
      return true;
    }
    return false;
  }

  function goBack() {
    if (currentQuestion > 0) {
      currentQuestion--;
      return true;
    }
    return false;
  }

  function goTo(index) {
    if (index >= 0 && index < getTotalQuestions()) {
      currentQuestion = index;
      return true;
    }
    return false;
  }

  function calculateResults() {
    const qs = getQuestions();
    let score = 0;
    const details = [];

    qs.forEach(q => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correct;
      if (isCorrect) score++;
      details.push({
        questionId: q.id,
        selected: selected,
        correct: q.correct,
        isCorrect: isCorrect,
        category: q.category
      });
    });

    const weakCats = {};
    details.forEach(d => {
      if (!d.isCorrect) {
        weakCats[d.category] = (weakCats[d.category] || 0) + 1;
      }
    });

    const levels = LEVELS[lang];
    let level = levels[0];
    for (const l of levels) {
      if (score >= l.min && score <= l.max) {
        level = l;
        break;
      }
    }

    return {
      score,
      total: qs.length,
      level,
      details,
      weakCategories: Object.keys(weakCats)
    };
  }

  function getAnsweredCount() {
    return Object.keys(answers).length;
  }

  return {
    init,
    getQuestions,
    getCurrentIndex,
    getTotalQuestions,
    getCurrentQuestion,
    getSelectedOption,
    selectAnswer,
    hasAnsweredCurrent,
    canGoNext,
    canGoBack,
    isLastQuestion,
    allAnswered,
    goNext,
    goBack,
    goTo,
    calculateResults,
    getAnsweredCount
  };
})();

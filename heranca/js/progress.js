// ============================================================
// Progress — localStorage persistence for inheritance tutorial
// ============================================================

const Progress = (function () {
  const STORAGE_KEY = 'heranca-progress';

  function getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveAll(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* silent */ }
  }

  function getTutorial(tutorialId) {
    const all = getAll();
    return all[tutorialId] || { currentStep: 0, completedSteps: [], completed: false };
  }

  function completeStep(tutorialId, stepIndex) {
    const all = getAll();
    if (!all[tutorialId]) {
      all[tutorialId] = { currentStep: 0, completedSteps: [], completed: false };
    }
    if (!all[tutorialId].completedSteps.includes(stepIndex)) {
      all[tutorialId].completedSteps.push(stepIndex);
    }
    all[tutorialId].currentStep = stepIndex;
    saveAll(all);
  }

  function completeTutorial(tutorialId) {
    const all = getAll();
    if (!all[tutorialId]) {
      all[tutorialId] = { currentStep: 0, completedSteps: [], completed: false };
    }
    all[tutorialId].completed = true;
    saveAll(all);
  }

  function setCurrentStep(tutorialId, stepIndex) {
    const all = getAll();
    if (!all[tutorialId]) {
      all[tutorialId] = { currentStep: 0, completedSteps: [], completed: false };
    }
    all[tutorialId].currentStep = stepIndex;
    saveAll(all);
  }

  function resetTutorial(tutorialId) {
    const all = getAll();
    delete all[tutorialId];
    saveAll(all);
  }

  function fundamentalsRead() {
    const all = getAll();
    return all._fundamentalsRead === true;
  }

  function markFundamentalsRead() {
    const all = getAll();
    all._fundamentalsRead = true;
    saveAll(all);
  }

  function getSummary() {
    const all = getAll();
    const summary = {};
    Object.keys(TUTORIALS).forEach(function (id) {
      const p = all[id];
      if (p) {
        summary[id] = {
          started: p.completedSteps.length > 0,
          completed: p.completed,
          stepsCompleted: p.completedSteps.length
        };
      }
    });
    return summary;
  }

  return {
    getTutorial: getTutorial,
    completeStep: completeStep,
    completeTutorial: completeTutorial,
    setCurrentStep: setCurrentStep,
    resetTutorial: resetTutorial,
    fundamentalsRead: fundamentalsRead,
    markFundamentalsRead: markFundamentalsRead,
    getSummary: getSummary
  };
})();

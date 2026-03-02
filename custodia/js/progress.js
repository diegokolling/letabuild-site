// ============================================================
// Progress — localStorage persistence for tutorial progress
// ============================================================

const Progress = (function () {
  const STORAGE_KEY = 'custodia-progress';

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

  // Get progress for a specific tutorial
  // Returns { currentStep: number, completedSteps: [number], completed: boolean }
  function getTutorial(tutorialId) {
    const all = getAll();
    return all[tutorialId] || { currentStep: 0, completedSteps: [], completed: false };
  }

  // Mark a step as completed
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

  // Mark tutorial as fully completed
  function completeTutorial(tutorialId) {
    const all = getAll();
    if (!all[tutorialId]) {
      all[tutorialId] = { currentStep: 0, completedSteps: [], completed: false };
    }
    all[tutorialId].completed = true;
    saveAll(all);
  }

  // Set current step (for navigation)
  function setCurrentStep(tutorialId, stepIndex) {
    const all = getAll();
    if (!all[tutorialId]) {
      all[tutorialId] = { currentStep: 0, completedSteps: [], completed: false };
    }
    all[tutorialId].currentStep = stepIndex;
    saveAll(all);
  }

  // Reset a specific tutorial
  function resetTutorial(tutorialId) {
    const all = getAll();
    delete all[tutorialId];
    saveAll(all);
  }

  // Check if fundamentals were read
  function fundamentalsRead() {
    const all = getAll();
    return all._fundamentalsRead === true;
  }

  function markFundamentalsRead() {
    const all = getAll();
    all._fundamentalsRead = true;
    saveAll(all);
  }

  // Get summary of all progress (for browse screen)
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

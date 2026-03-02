// ============================================================
// Tutorial — Step rendering engine
// ============================================================

const Tutorial = (function () {
  let currentTutorialId = null;
  let currentStepIndex = 0;
  let steps = [];
  let lang = 'pt';

  function load(tutorialId, language) {
    currentTutorialId = tutorialId;
    lang = language;
    const meta = TUTORIALS[tutorialId];
    if (!meta) return false;

    // Get content from global TUTORIAL_CONTENT
    const content = TUTORIAL_CONTENT[meta.contentKey];
    if (!content || !content[lang]) return false;

    steps = content[lang];

    // Restore progress
    const progress = Progress.getTutorial(tutorialId);
    currentStepIndex = progress.currentStep || 0;
    if (currentStepIndex >= steps.length) currentStepIndex = steps.length - 1;

    return true;
  }

  function getCurrentStep() {
    return steps[currentStepIndex] || null;
  }

  function getStepIndex() {
    return currentStepIndex;
  }

  function getTotalSteps() {
    return steps.length;
  }

  function getTutorialId() {
    return currentTutorialId;
  }

  function getSteps() {
    return steps;
  }

  function goToStep(index) {
    if (index >= 0 && index < steps.length) {
      currentStepIndex = index;
      Progress.setCurrentStep(currentTutorialId, index);
    }
  }

  function goNext() {
    if (currentStepIndex < steps.length - 1) {
      // Mark current step as completed when moving forward
      Progress.completeStep(currentTutorialId, currentStepIndex);
      currentStepIndex++;
      Progress.setCurrentStep(currentTutorialId, currentStepIndex);
      return true;
    }
    return false;
  }

  function goPrev() {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      Progress.setCurrentStep(currentTutorialId, currentStepIndex);
      return true;
    }
    return false;
  }

  function isFirst() {
    return currentStepIndex === 0;
  }

  function isLast() {
    return currentStepIndex === steps.length - 1;
  }

  function finishTutorial() {
    Progress.completeStep(currentTutorialId, currentStepIndex);
    Progress.completeTutorial(currentTutorialId);
  }

  function getProgress() {
    return Progress.getTutorial(currentTutorialId);
  }

  function getMeta() {
    return TUTORIALS[currentTutorialId];
  }

  function getWallet() {
    const meta = TUTORIALS[currentTutorialId];
    return WALLETS.find(function (w) { return w.id === meta.wallet; });
  }

  return {
    load: load,
    getCurrentStep: getCurrentStep,
    getStepIndex: getStepIndex,
    getTotalSteps: getTotalSteps,
    getTutorialId: getTutorialId,
    getSteps: getSteps,
    goToStep: goToStep,
    goNext: goNext,
    goPrev: goPrev,
    isFirst: isFirst,
    isLast: isLast,
    finishTutorial: finishTutorial,
    getProgress: getProgress,
    getMeta: getMeta,
    getWallet: getWallet
  };
})();

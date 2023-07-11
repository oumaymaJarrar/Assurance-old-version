// get the step from the url query
const getStep = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const step = searchParams.get("step");
  return step === null ? 1 : parseInt(step);
};

// navigate to the next step
const navigateToNextStep = () => {
  if (isLastPage()) return (window.location.href = "page1.html");

  const curretStep = getStep();
  return curretStep < 1
    ? (window.location.href = "page1.html")
    : (window.location.href = `page${curretStep + 1}.html?step=${
        curretStep + 1
      }`);
};

// navigate to the previous step
const navigateToPreviousStep = () => {
  const curretStep = getStep();
  return curretStep === 1
    ? null
    : (window.location.href = `page${curretStep - 1}.html?step=${
        curretStep - 1
      }`);
};

// add query to the url when the first page loads
const addStepToFirstPage = () => {
  window.history.pushState({}, "", `?step=1`);
};

// add to assurance type to session storage (selected in first page)
const setAssurance = type => {
  sessionStorage.setItem("assurance", type);
};

// get the assurance type from session storage
const getAssurance = () => {
  return sessionStorage.getItem("assurance");
};

// used in page 3
// deduce which page to hit next (either next step , enfants or conjoint page)
function chooseNextPageByAssuranceType() {
  const assurance = getAssurance();

  switch (assurance) {
    case "moi":
      navigateToNextStep();
      break;
    case "enfants":
      navigateToPage("enfant", 4);
      break;
    case "conjoint":
    case "enfantsConjoint":
      navigateToPage("conjoint", 4);
      break;
    default:
      navigateToPage(1, 1);
      break;
  }
}

function navigateToPage(page, step) {
  window.location.href = `${page}.html?step=${step}`;
}

// used in conjoint page
// deduce which page to hit next (either location or enfants page)
function navigateToLocationOrEnfantPage() {
  const assurance = getAssurance();

  switch (assurance) {
    case "conjoint":
      navigateToPage("page4", 5);
      break;
    case "enfantsConjoint":
      navigateToPage("enfant", 5);
      break;
    default:
      navigateToPage("page1", 1);
      break;
  }
}

// get page name from url
const isLastPage = () => {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  return page === "page5.html" ? true : false;
};

// get steps count

const stepsCount = () => {
  const assurance = getAssurance();

  switch (assurance) {
    case "moi":
      return 5;
    case "conjoint":
    case "enfants":
      return 6;
    case "enfantsConjoint":
      return 7;
    default:
      null;
      break;
  }
};

const page4navigateBack = () => {
  const assurance = getAssurance();

  switch (assurance) {
    case "moi":
      navigateToPreviousStep();
      break;

    case "enfants":
      navigateToPage("enfant", 4);
      break;

    case "conjoint":
      navigateToPage("conjoint", 4);
      break;

    case "enfantsConjoint":
      navigateToPage("enfant", 5);
      break;

    default:
      navigateToPage("page1", 1);
      break;
  }
};


const setProgress = () => {
  const step = getStep();
  const steps = stepsCount();
  const progress = (step / steps) * 100;
  setTimeout(() => {
    document.getElementById("progress").style.width = `${progress}%`;
  }, 100);
}

setProgress();

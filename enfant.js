function getCounterValue() {
  return parseInt(document.getElementById("counter").value);
}

function incrementCounter() {
  document.getElementById("counter").value = getCounterValue() + 1 || 1;

  addEnfant();
}

function decrementCounter() {
  const counter = getCounterValue();
  if (counter > 0) {
    document.getElementById("counter").value = counter - 1;
  }

  removeEnfant();
}

const addEnfant = () => {
  const container = document.getElementById("enfantInfo");

  container.insertAdjacentHTML(
    "beforeend",
    `
    <div class="parent">
      <div class="div1">
        <div class="form-group" style="width: 100%">
          <input
            class="date-input form-group-input"
            type="date"
            name=""
            id=""
            style="
              font-size: inherit !important;
              text-transform: uppercase;
            "
          />
        </div>
      </div>
      <div class="div2">
        <select class="form-group-input drop-down" name="cars" id="cars">
          <option value="Sécurité Sociale">Sécurité Sociale</option>
          <option value="Travailleur non salarié">
            Travailleur non salarié
          </option>
          <option value="Régime Agricole">Régime Agricole</option>
          <option value="Alsace / Moselle">Alsace / Moselle</option>
        </select>
      </div>
    </div>
    `
  );
};

const removeEnfant = () => {
  const container = document.getElementById("enfantInfo");
  const children = container.children;
  if (children.length > 0) {
    container.removeChild(children[children.length - 1]);
  }
};

const pageEnfantNavigateNext = () => {
  switch (getAssurance()) {
    case "enfants":
      navigateToPage("page4", 5);
      break;
    case "enfantsConjoint":
      navigateToPage("page4", 6);
      break;

    default:
      navigateToPage("page1", 1);
      break;
  }
};

const pageEnfantNavigateBack = () => {
  switch (getAssurance()) {
    case "enfants":
      navigateToPage("page3", 3);
      break;
    case "enfantsConjoint":
      navigateToPage("conjoint", 4);
      break;

    default:
      navigateToPage("page1", 1);
      break;
  }
}

const rootElement = document.documentElement;
const titleElement = document.getElementById("title") as HTMLElement;
const goToJoanaVideoElement = document.getElementById(
  "gotojoanavideo"
) as HTMLElement;
const contentElement = document.getElementById("content-layout") as HTMLElement;

function start() {
  setCSSProperties();
  addEventListeners();
}

function setCSSProperties() {
  setTitleSizeCSSProperty();
  setIndividualContentSizeCSSProperty();
}

function setTitleSizeCSSProperty() {
  setElementDimensionCSSProperty(titleElement, "title", "height");
}

function setIndividualContentSizeCSSProperty() {
  setElementDimensionCSSProperty(
    goToJoanaVideoElement,
    "individualContent",
    "width"
  );
}

function addEventListeners() {
  goToJoanaVideoElement.addEventListener("click", () => goToJoanaVideo());
}

function goToJoanaVideo() {
  for (const element of Array.from(contentElement.children)) {
    element.classList.add("exitAnimation");
  }
}

// utils

function capitalize(str: string) {
  const stringInArray = str.split("");
  stringInArray[0] = stringInArray[0].toUpperCase();
  const stringInString = stringInArray.join("");
  return stringInString;
}

function setElementDimensionCSSProperty(
  element: HTMLElement,
  elementName: string,
  dimensionName: "width" | "height"
) {
  const dimensionValue =
    dimensionName === "width" ? element.clientWidth : element.clientHeight;
  const dimensionValueWithPx = dimensionValue.toString() + "px";

  const CSSPropertyToChange = `--${elementName}${capitalize(dimensionName)}`;

  rootElement.style.setProperty(CSSPropertyToChange, dimensionValueWithPx);
}

start();

const rootElement = document.documentElement;
const titleElement = $("#title");
const goToJoanaVideoElement = $("#gotojoanavideo");
const contentElement = $("#content-layout");
const joanaVideoElement = $<HTMLVideoElement>("#poetryVideo");
const joanaVideoElementContainer = $("#poetryVideoContainer");
const goBackToHomepageElement = $("#gobacktohomepage");

function start() {
  setCSSProperties();
  addEventListeners();
}

function goToJoanaVideo() {
  exitContentAnimation();
  videoEnterAnimation();
  autoplayVideo();
}

function joanaVideoEnded() {
  setGoBackToHomepageElementToPrimaryState();
}

function exitContentAnimation() {
  for (const element of Array.from(contentElement.children)) {
    element.classList.add("exitAnimation");
  }
}

function autoplayVideo(): void {
  joanaVideoElement.play();
}

function videoEnterAnimation(): void {
  joanaVideoElementContainer.classList.add("enterAnimation");
}

function setGoBackToHomepageElementToPrimaryState() {
  goBackToHomepageElement.dataset.state = "primary";
}

function setCSSProperties() {
  setTitleSizeCSSProperty();
  setIndividualContentSizeCSSProperty();
  setPoetryVideoContainerSizeCSSProperty();
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

function setPoetryVideoContainerSizeCSSProperty() {
  setElementDimensionCSSProperty(
    joanaVideoElementContainer,
    "poetryVideoContainer",
    "height"
  );
}

function goBackToHomepage(): void {}

function addEventListeners(): void {
  const elementsToListeners: Array<
    [element: HTMLElement, event: string, eventHandler: () => void]
  > = [
    [goToJoanaVideoElement, "click", goToJoanaVideo],
    [joanaVideoElement, "ended", joanaVideoEnded],
    [goBackToHomepageElement, "click", goBackToHomepage],
  ];

  elementsToListeners.forEach(([element, event, eventHandler]) =>
    element.addEventListener(event, eventHandler)
  );
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

function enterAndExitAnimations(
  enterElements: HTMLElement[],
  exitElements: HTMLElement[]
) {
  const elementsAnimationMap = new Map<string, elements:HTMLElement[]>()
  for(const elem)
}

function $<T extends HTMLElement = HTMLElement>(selector: string) {
  return document.querySelector(selector) as T;
}

start();

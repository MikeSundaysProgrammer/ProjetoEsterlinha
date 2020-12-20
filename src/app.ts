const rootElement = document.documentElement;
const titleElement = $("#title");
const goToJoanaVideoElement = $("#gotojoanavideo");
const contentElement = $("#content-layout");
const joanaVideoElement = $<HTMLVideoElement>("#poetryVideo");
const joanaVideoContainerElement = $("#poetryVideoContainer");
const goBackToHomepageElement = $("#gobacktohomepage");
const individualContentElements = Array.from(
  contentElement.children
) as HTMLElement[];

function start() {
  setCSSProperties();
  addEventListeners();
}

function goToJoanaVideo() {
  goToJoanaVideoAnimations();
  autoplayVideo();
}

function goToJoanaVideoAnimations() {
  enterAndExitAnimations(
    [joanaVideoContainerElement],
    individualContentElements
  );
}

function joanaVideoEnded() {
  setGoBackToHomepageElementToPrimaryState();
}

function autoplayVideo(): void {
  joanaVideoElement.play();
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
    joanaVideoContainerElement,
    "poetryVideoContainer",
    "height"
  );
  setElementDimensionCSSProperty(
    joanaVideoContainerElement,
    "poetryVideoContainer",
    "width"
  );
}

function stopPoetryVideo() {
  joanaVideoElement.currentTime = 0;
  joanaVideoElement.pause();
}

function goBackToHomepage(): void {
  goBackToHomepageAnimations();
  stopPoetryVideo();
}

function goBackToHomepageAnimations(): void {
  enterAndExitAnimations(individualContentElements, [
    joanaVideoContainerElement,
  ]);
}

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
    dimensionName === "width" ? element.offsetWidth : element.offsetHeight;
  const dimensionValueWithPx = createPixelMeasure(dimensionValue);

  const CSSPropertyToChange = `--${elementName}${capitalize(dimensionName)}`;

  rootElement.style.setProperty(CSSPropertyToChange, dimensionValueWithPx);
}

function enterAndExitAnimations(
  enterElements: HTMLElement[],
  exitElements: HTMLElement[]
) {
  enum animationTypes {
    EXIT = "exitAnimation",
    ENTER = "enterAnimation",
  }

  const elementsAnimationMap = new Map<animationTypes, HTMLElement[]>([
    [animationTypes.EXIT, exitElements],
    [animationTypes.ENTER, enterElements],
  ]);

  for (const [animationClass, elements] of elementsAnimationMap.entries()) {
    for (const element of elements) {
      const animationClassToBeRemoved =
        animationClass === animationTypes.ENTER
          ? animationTypes.EXIT
          : animationTypes.ENTER;

      element.classList.remove(animationClassToBeRemoved);
      element.classList.add(animationClass);
    }
  }
}

function createPixelMeasure(value: number) {
  return value.toString() + "px";
}

function $<T extends HTMLElement = HTMLElement>(selector: string) {
  return document.querySelector(selector) as T;
}

document.addEventListener("DOMContentLoaded", start);

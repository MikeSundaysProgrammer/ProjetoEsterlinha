const rootElement = document.documentElement;
const titleElement = $("#title");
const goToJoanaVideoElement = $("#gotojoanavideo");
const contentElement = $("#content-layout");
const joanaVideoElement = $<HTMLVideoElement>("#poetryVideo");
const joanaVideoContainerElement = $("#poetryVideoContainer");
const goBackToHomepageElement = $("#gobacktohomepage");
const accessContentFirstEnterAnimationDelayElement = $(
  "#access-content-first-enter-animation-delay"
);
const accessPoetryVideoEnterAnimationDelayElement = $(
  "#access-poetry-video-enter-animation-delay"
);
const accessPoetryVideoExitAnimationDelayElement = $(
  "#access-poetry-video-exit-animation-delay"
);
const individualContentElements = Array.from(
  contentElement.children
) as HTMLElement[];
const goToMikePuzzleElement = $("#gotomikepuzzle");

let currentURLUserName = "";

function start() {
  setTitleText();
  setCSSProperties();
  addEventListeners();
  startEnterAndExitAnimations();
}

function getCurrentURLUsername() {
  const currentURL = new URL(window.location.href);
  const currentURLParams = currentURL.searchParams;
  return currentURLParams.get("username") || "";
}

function setTitleText() {
  const currentURLUserName = getCurrentURLUsername();
  if (currentURLUserName)
    titleElement.textContent = makeHappyChristmasMessage(currentURLUserName);
}

function makeHappyChristmasMessage(personName: string) {
  return `Feliz Natal ${capitalize(personName)}!`;
}

function startEnterAndExitAnimations() {
  enterAndExitAnimations(individualContentElements, [], {
    elementToGetValue: accessContentFirstEnterAnimationDelayElement,
    type: "enter",
  });
}

function goToJoanaVideoAnimations() {
  enterAndExitAnimations(
    [joanaVideoContainerElement],
    individualContentElements,
    {
      elementToGetValue: accessPoetryVideoEnterAnimationDelayElement,
      type: "enter",
    }
  );
}

function goBackToHomepageAnimations(): void {
  enterAndExitAnimations(
    individualContentElements,
    [joanaVideoContainerElement],
    {
      elementToGetValue: accessPoetryVideoExitAnimationDelayElement,
      type: "exit",
    }
  );
}

function goToJoanaVideo() {
  goToJoanaVideoAnimations();
  autoplayVideo();
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

function stopPoetryVideo() {
  joanaVideoElement.currentTime = 0;
  joanaVideoElement.pause();
}

function goBackToHomepage(): void {
  goBackToHomepageAnimations();
  stopPoetryVideo();
}

function goToMikePuzzle() {
  const currentURLUserName = getCurrentURLUsername();
  const basePuzzleURL = `https://cuzzleware.netlify.app/?id=${2202212}`;
  const puzzleURL =
    currentURLUserName.length > 0
      ? `${basePuzzleURL}&name=${currentURLUserName}`
      : basePuzzleURL;
  window.location.href = puzzleURL;
}

function addEventListeners(): void {
  const elementsToListeners: Array<
    [element: HTMLElement, event: string, eventHandler: () => void]
  > = [
    [goToJoanaVideoElement, "click", goToJoanaVideo],
    [joanaVideoElement, "ended", joanaVideoEnded],
    [goBackToHomepageElement, "click", goBackToHomepage],
    [goToMikePuzzleElement, "click", goToMikePuzzle],
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

function getCSSPropertyWithSecondsValue(
  elementHoldingCSSPropertyValue: HTMLElement
) {
  console.log(
    "getComputedStyle(elementHoldingCSSPropertyValue).transitionDelay",
    getComputedStyle(elementHoldingCSSPropertyValue).transitionDelay
  );
  return parseFloat(
    getComputedStyle(elementHoldingCSSPropertyValue).transitionDelay.replace(
      "s",
      ""
    )
  );
}

function enterAndExitAnimations(
  enterElements: HTMLElement[],
  exitElements: HTMLElement[],
  delay?: { elementToGetValue: HTMLElement; type: "exit" | "enter" }
) {
  enum animationClasses {
    ENTER = "enterAnimation",
  }

  const enterClasses: string[] = [animationClasses.ENTER];
  const exitClasses: string[] = [];

  const enterAnimationHandler = () => {
    for (const enterElement of enterElements) {
      enterElement.classList.remove(...exitClasses);
      enterElement.classList.add(...enterClasses);
    }
  };

  const exitAnimationHandler = () => {
    for (const exitElement of exitElements) {
      exitElement.classList.add(...exitClasses);
      exitElement.classList.remove(...enterClasses);
    }
  };

  if (delay?.type === "enter") {
    setTimeout(
      enterAnimationHandler,
      getCSSPropertyWithSecondsValue(delay.elementToGetValue) * 1000
    );
  } else {
    enterAnimationHandler();
  }

  if (delay?.type === "exit") {
    console.log(
      "getCSSPropertyWithSecondsValue(delay.elementToGetValue) * 1000",
      getCSSPropertyWithSecondsValue(delay.elementToGetValue) * 1000
    );
    setTimeout(
      exitAnimationHandler,
      getCSSPropertyWithSecondsValue(delay.elementToGetValue) * 1000
    );
  } else {
    exitAnimationHandler();
  }
}

function createPixelMeasure(value: number) {
  return value.toString() + "px";
}

function $<T extends HTMLElement = HTMLElement>(selector: string) {
  return document.querySelector(selector) as T;
}

window.onload = start;

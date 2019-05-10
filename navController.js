// Navigation controlling function
const mobileNav = function (element, trigger, breakpointWidth, animationTransitionLength, effect = "fade", direction = "") {
  // Define our navigation element
  const nav = document.querySelector(`${element}`);
  // Define a trigger element
  const navTrigger = document.querySelector(`${trigger}`);
  // Create the Header variable, to be able to append an element to it later
  const header = document.querySelector("header");
  // create a variable to store the navigation block height
  let navOffsetHeight = document.querySelector(`${element}`).offsetHeight;
  let navOffsetWidth = document.querySelector(`${element}`).offsetWidth;
  // Create a placeholder to append to to the Header later
  const placeholder = document.createElement("div");
  // Add a ".placeholder" class to the placeholder div element
  placeholder.classList.add("placeholder");
  // Hide placeholder by default
  placeholder.setAttribute("style", `height: ${navOffsetHeight}px; margin-top: -${navOffsetHeight}px;`);
  // First detect the screen width and height
  let screenWidth = document.querySelector("html").offsetWidth;
  // Check if current screen width matching the defined width (must be in pixeles)
  if (screenWidth <= `${breakpointWidth}`) {
    // If the current screen size is matching or smaller than specified width, set the navigation positioning to absolute
    nav.classList.add("absolute");
    // enable/unhide the navigation trigger icon/button (hidden bu default for larger screens)
    navTrigger.classList.remove("hidden");
    // Appent the placeholder to be ablo to manipulate content top margin
    header.append(placeholder);
    // If matching or smaller than defined width, set the navigation positioning to absolute 
    // Then check which actionshould be performed (slide or fade, slide is set as a default value)
    const animationEffect = effect;
    const animationEffectDirection = direction;
    if (animationEffect === "slide" && animationEffectDirection === "top") {
      nav.setAttribute("style", `top: 0; margin-top:-${navOffsetHeight}px`);
      // add event listener on the navigation icon, so it would trigger the event, once icon is clicked
      navTrigger.addEventListener('click', () => {
        // when icon is clicked,
        // if navigation element has a class"hidden", the class will be removed on click
        // if navigation element does not have the class "hidden", we will add the class on click
        if (nav.classList.contains("nav-hidden")) {
          nav.setAttribute("style", `top: 0; margin-top: 0px; transition: ${animationTransitionLength}s;`);
          // When navigation is triggered, placeholder will be taking it's space to compensate for the navigation absolute positioning 
          // and smoothly move the content below as if navigation block would be pushing it down
          placeholder.setAttribute("style", `height: ${navOffsetHeight}px; margin-top: 0; transition: ${animationTransitionLength}s;`);
          nav.classList.remove("nav-hidden");
        } else {
          nav.setAttribute("style", `top: 0; margin-top:-${navOffsetHeight}px; transition: ${animationTransitionLength}s;`);
          // Hide the placeholder back, off the screen, when navigation is hidden again
          placeholder.setAttribute("style", `height: ${navOffsetHeight}px; margin-top: -${navOffsetHeight}px; transition: ${animationTransitionLength}s;`);
          nav.classList.add("nav-hidden");
        }
        // nav.classList.toggle("hidden")
        // if navigation icon has a class "open", the class will be removed on click
        // if navigation icon does not have the class "open", we will add the class on click
        navTrigger.classList.toggle("open");
      })
    } else if (animationEffect === "slide" && animationEffectDirection === "bottom") {
      nav.setAttribute("style", `bottom: 0; margin-bottom: -${navOffsetHeight}px; overflow-y: hidden;`);
      // Create a variable to store screen height value
      const screenHeight = document.querySelector("html").offsetHeight;
      // add event listener on the navigation icon, so it would trigger the event, once icon is clicked
      navTrigger.addEventListener('click', () => {
        // when icon is clicked,
        // if navigation element has a class"hidden", the class will be removed on click
        // if navigation element does not have the class "hidden", we will add the class on click
        if (nav.classList.contains("nav-hidden")) {
          let bottomSlideMargin = screenHeight - navOffsetHeight;
          nav.setAttribute("style", `bottom: 0; margin-bottom: ${bottomSlideMargin}px; transition: ${animationTransitionLength}s`);
          placeholder.setAttribute("style", `height: ${navOffsetHeight}px; margin-top: 0; transition: ${animationTransitionLength}s;`);
          nav.classList.remove("nav-hidden");
        } else {
          nav.setAttribute("style", `bottom: 0; margin-bottom: -${navOffsetHeight}px; overflow-y: hidden; transition: ${animationTransitionLength}s;`);
          placeholder.setAttribute("style", `height: ${navOffsetHeight}px; margin-top: -${navOffsetHeight}px; transition: ${animationTransitionLength}s;`);
          nav.classList.add("nav-hidden");
        }
        // if navigation icon has a class "open", the class will be removed on click
        // if navigation icon does not have the class "open", we will add the class on click
        navTrigger.classList.toggle("open");
      })
    } else if (animationEffect === "slide" && (animationEffectDirection === "left" || animationEffectDirection === "right")) {
      nav.setAttribute("style", `top: 0; ${animationEffectDirection}: 0; margin-${animationEffectDirection}: -${navOffsetWidth}px;`);
      // add event listener on the navigation icon, so it would trigger the event, once icon is clicked
      navTrigger.addEventListener('click', () => {
        // when icon is clicked,
        // if navigation element has a class"hidden", the class will be removed on click
        // if navigation element does not have the class "hidden", we will add the class on click
        if (nav.classList.contains("nav-hidden")) {
          nav.setAttribute("style", `top: 0; ${animationEffectDirection}: 0; margin-${animationEffectDirection}: 0; transition: ${animationTransitionLength}s;`);
          placeholder.setAttribute("style", `height: ${navOffsetHeight}px; margin-top: 0; transition: ${animationTransitionLength}s;`);
          nav.classList.remove("nav-hidden");
        } else {
          nav.setAttribute("style", `top: 0; ${animationEffectDirection}: 0; margin-${animationEffectDirection}: -${navOffsetWidth}px; transition: ${animationTransitionLength}s;`);
          placeholder.setAttribute("style", `height: ${navOffsetHeight}px; margin-top: -${navOffsetHeight}px; transition: ${animationTransitionLength}s;`);
          nav.classList.add("nav-hidden");
        }
        // nav.classList.toggle("hidden")
        // if navigation icon has a class "open", the class will be removed on click
        // if navigation icon does not have the class "open", we will add the class on click
        navTrigger.classList.toggle("open")
      })
    } else if (animationEffect === "fade") {
      // If animation direction is right or left, set the navigation positioning to absolute to prevent moving content instead of the navigation
      nav.setAttribute("style", `opacity: 0; top: 0; z-index: -200;`);
      // add event listener on the navigation icon, so it would trigger the event, once icon is clicked
      navTrigger.addEventListener('click', () => {
        // when icon is clicked,
        // if navigation element has a class"hidden", the class will be removed on click
        // if navigation element does not have the class "hidden", we will add the class on click
        if (nav.classList.contains("nav-hidden")) {
          nav.setAttribute("style", `opacity: 1; top: 0; z-index: 0; transition: ${animationTransitionLength}s;`);
          placeholder.setAttribute("style", `height: ${navOffsetHeight}px; margin-top: 0; transition: ${animationTransitionLength}s;`);
          nav.classList.remove("nav-hidden");
        } else {
          nav.setAttribute("style", `opacity: 0; top: 0; z-index: -200; transition: ${animationTransitionLength}s;`);
          placeholder.setAttribute("style", `height: ${navOffsetHeight}px; margin-top: -${navOffsetHeight}px; transition: ${animationTransitionLength}s;`);
          nav.classList.add("nav-hidden");
        }
        // nav.classList.toggle("hidden")
        // if navigation icon has a class "open", the class will be removed on click
        // if navigation icon does not have the class "open", we will add the class on click
        navTrigger.classList.toggle("open")
      })
    }
  }
}
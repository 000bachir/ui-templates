const blob = document.querySelector("#blob");
// tip : avoid using window when naming this variable beacase te error : Uncaught SyntaxError: redeclaration of non-configurable global property window
const htmlElement = document.documentElement;
// Get the width and height of the browser window.
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Variable to store the timeout ID for throttling.
let timeOutId = null;

// Throttle function to limit the rate at which a function is executed.
const Throttle = (callback, delay) => {
  // If a timeout is already scheduled, clear it.
  if (timeOutId) {
    clearTimeout(timeOutId);
  }
  // Set a new timeout.
  timeOutId = setTimeout(() => {
    // Execute the callback function.
    callback();
    // Reset the timeout ID.
    timeOutId = null;
  }, delay);
};

// Check if the 'blob' element exists in the DOM.
if (blob) {
  // Add a 'pointermove' event listener to the document.
  document.addEventListener("pointermove", (event) => {
    // Throttle the execution of the movement logic.
    Throttle(() => {
      // Get the mouse/pointer coordinates.
      const { clientX, clientY } = event;

      // Get the bounding rectangle of the blob element.
      const blobRect = blob.getBoundingClientRect();
      // Get the width and height of the blob.
      const blobWidth = blobRect.width;
      const blobHeight = blobRect.height;

      // Calculate the maximum allowed X and Y positions for the blob
      // to keep it within the window bounds.
      const maxPositionX = windowWidth - blobWidth;
      const maxPositionY = windowHeight - blobHeight;

      // Calculate the new left position for the blob, centering it under the mouse.
      let newLeft = clientX - blobWidth / 2;
      // Clamp the newLeft value to prevent the blob from going off-screen.
      newLeft = Math.max(0, Math.min(newLeft, maxPositionX));

      // Calculate the new top position for the blob, centering it under the mouse.
      let newTop = clientY - blobHeight / 2;
      // Clamp the newTop value to prevent the blob from going off-screen.
      newTop = Math.max(0, Math.min(newTop, maxPositionY));

      // Animate the blob's position using the Web Animations API.
      blob.animate(
        {
          left: `${newLeft}px`, // Set the left position.
          top: `${newTop}px`,   // Set the top position.
        },
        {
          duration: 2000,      // Animation duration in milliseconds.
          fill: "forwards",   // Keep the final position after the animation.
        }
      );
    }, 16); // Throttle delay of 16ms (approximately 60fps).
  });
}
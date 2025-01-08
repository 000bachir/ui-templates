
// Selects the element with class "text-effect" from the DOM, casting it to an HTMLSpanElement if found, or null if not found.
const wordEffect = document.querySelector(
    ".text",
);

// Defines a string containing all uppercase letters of the alphabet.
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Stores the ID of a scheduled animation frame, initially set to null.
let animationFrame = null;

// Checks if the "wordEffect" element was found.
if (wordEffect) {
    // Adds a "mouseover" event listener to the element.
    wordEffect.addEventListener("mouseover", (event) => {
        // Ensures the event target is an HTMLElement before proceeding.
        if (!(event.target instanceof HTMLElement)) return;

        // Stores a reference to the element that triggered the event.
        const target = event.target;

        // Retrieves the original text content from the element's "data-value" attribute or defaults to an empty string.
        let originalText = target.dataset.value || "";

        // Initializes a counter for the animation loop.
        let iteration = 0;

        // Cancels any previously running animation if present.
        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
        }

        // Defines the animation function that will be called recursively.
        const animate = () => {
            // Splits the original text into an array of individual characters.
            const textArray = originalText.split("");

            // Iterates through each character and replaces it with a random letter from "letters" if the index is less than the "iteration" counter.
            const updatedText = textArray
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index]; // Keep the original character for revealed parts
                    }
                    return letters[Math.floor(Math.random() * letters.length)]; // Replace with random letter
                })
                .join("");

            // Updates the element's inner text with the modified string.
            target.innerText = updatedText;

            // Increments the counter by a fraction (1/3) for a gradual reveal effect.
            iteration += 1 / 3;

            // Base case: stop the animation if all characters have been revealed.
            if (iteration >= originalText.length) {
                target.innerText = originalText; // Reset to original text
                animationFrame = null; // Clear animation frame ID
            } else {
                // Schedule the next animation frame using requestAnimationFrame.
                animationFrame = requestAnimationFrame(animate);
            }
        };

        // Starts the animation by scheduling the first animation frame.
        animationFrame = requestAnimationFrame(animate);
    });
}

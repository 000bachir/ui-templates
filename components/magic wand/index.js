const Wand = document.querySelector('#wand');
if (!Wand) {
    console.error("Element with ID 'wand' not found");
}

const Tiles = document.querySelectorAll('.tile');
if (Tiles.length === 0) {
    console.warn("No elements with the tag 'tile' found.");
}

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
const WandMultiplayerX = 1.3;
const WandMultiplayerY = 0.4;
let wandOffsetX = windowWidth * -0.15;
let wandOffsetY = windowHeight * 0.1;

function updateOffsets() {
    wandOffsetX = windowWidth * -0.15;
    wandOffsetY = windowHeight * 0.1;
}

window.addEventListener("resize", () => {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    updateOffsets();
});

function Throttle(callback, delay) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            callback(...args);
        }
    };
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updateMouse(mouseX, mouseY) {
    return {
        position: { x: mouseX, y: mouseY },
        decimal: { x: mouseX / windowWidth, y: mouseY / windowHeight },
        modifiedPosition: {
            x: mouseX * WandMultiplayerX + wandOffsetX,
            y: mouseY * WandMultiplayerY + wandOffsetY,
        },
    };
}

function GetWandStyle(mouse) {
    return {
        left: `${mouse.modifiedPosition.x}px`,
        top: `${mouse.modifiedPosition.y}px`,
        transform: `rotate(${mouse.decimal.x * 20 - 10}deg)`,
    };
}

let mouse = null;
window.addEventListener(
    "mousemove",
    Throttle((e) => {
        mouse = { x: e.clientX, y: e.clientY };
    }, 16)
);

function RevealImages(mouseX) {
    for (const tile of Tiles) {
        const dimension = tile.getBoundingClientRect();
        const relativeMouseX = mouseX - dimension.left;
        const mouseXasDecimal = clamp(relativeMouseX / dimension.width, 0, 1);

        const opacity = mouseXasDecimal;
        const blur = 1 - mouseXasDecimal;

        tile.style.setProperty("--opacity", opacity);
        tile.style.setProperty("--blur", blur);
    }
}

function animate() {
    if (mouse) {
        const UpdateMouse = updateMouse(mouse.x, mouse.y);
        const WandStyle = GetWandStyle(UpdateMouse);

        Object.assign(Wand.style, WandStyle);
        RevealImages(mouse.x);
    }

    requestAnimationFrame(animate);
}

animate();

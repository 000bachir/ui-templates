const Pre = document.querySelector("pre")

if(!Pre){
    console.error("error pre tag not fond!!!")
}

function Throttle(callback , delay){
    let lastTime = 0
    return function(...args){
        let now = performance.now()
        if(now - lastTime >= delay){
            lastTime = now
            callback(...args)
        }
    }
}

document.addEventListener("mousemove", Throttle((e) => {
    rotateElement(e, Pre)
},16))
function rotateElement(event, element) {
    /// get mouse position
    let x = event.clientX
    let y = event.clientY
    /// middle of the page
    let middleX = window.innerWidth / 2
    let middleY = window.innerHeight / 2
    /// offset of the middle <=how far is the mouse in comparaison with the mouse=>
    let offsetX = ((x - middleX) / middleX) * 45
    let offsetY = ((y - middleY) / middleY) * 45
    element.style.setProperty("--rotateX", -1 * offsetY + 'deg')
    element.style.setProperty("--rotateY", offsetX + 'deg')
}
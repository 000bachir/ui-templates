function enhance(id) {
    let element = document.getElementById(id)
    let text = element.textContent.split('')

    element.textContent = ""

    let fragement = document.createDocumentFragment();

    text.forEach((letter , index)=>{
        const span = document.createElement('span');
        span.classList.add('split');
        span.innerText = letter;

        setTimeout(()=>{
            span.classList.add('active')
        } , index * 100)
        fragement.appendChild(span)
    })
    element.appendChild(fragement)
};
enhance('number')
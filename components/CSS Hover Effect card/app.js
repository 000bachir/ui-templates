const subtitle = document.querySelector('.sub');

const createWord = (text, index) => {
    const word = document.createElement("span");

    word.textContent = `${text}`; //Use textContent for better performance

    word.classList.add("word");

    word.style.transitionDelay = `${index * 50}ms`;

    return word;
};

const addWord = (text, index) => subtitle.appendChild(createWord(text, index));

const createSub = text => {
    let words = text.split(' ')
    for (let i = 0; i < words.length; i++) {
        addWord(words[i], i)
    }
};

createSub('This effetc is from the twitch platform .');
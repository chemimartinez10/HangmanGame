const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')

const figureParts = document.querySelectorAll('.figure-part')

const words = ['application', 'programming', 'interface', 'wizard', 'pollo']

let selectedWord = words[Math.floor((Math.random() * words.length) == 5 ? 4 : (Math.random() * words.length))]

const correctLetters = []
const wrongLetters = []

function displayWord() {
    wordEl.innerHTML = ` ${
        selectedWord.split('').map(letter => ` <span class="letter"> ${ correctLetters.includes(letter) ? letter : ' ' }</span>`).join('')}`;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! you won! c:'
        popup.style.display = 'flex'
    }
    if (wrongLetters.length >= 1) {
        wrongLettersEl.innerHTML = `<p>Wrong letters</p><span>${wrongLetters.join(', ')} </span>`
    }
    if (wrongLetters.length >= 6) {
        finalMessage.innerText = 'Sorry! you lost! :c'
        popup.style.display = 'flex'
    }
}



window.addEventListener('keydown', e => {
    // compruebo que no sea una tecla especial
    if (e.key.length === 1) {
        //compruebo que es una letra, sea mayuscula o minuscula
        if (e.key.match(/^[a-zA-Z]+$/)) {
            //compruebo que la palabra no ha sido introducida
            if (correctLetters.includes(e.key.toLowerCase()) || wrongLetters.includes(e.key.toLowerCase())) {
                //en este caso saco la notificacion
                notification.classList.add('show')

            } else {
                notification.classList.remove('show')
                if (selectedWord.includes(e.key.toLowerCase())) {
                    //en este caso pongo la letra en correctas
                    correctLetters.push(e.key.toLowerCase())
                } else {
                    //de no ser parte de la palabra se cataloga como mala
                    wrongLetters.push(e.key.toLowerCase())
                    for (let i = 0; i < wrongLetters.length; i++) {
                        figureParts[i].classList.remove('figure-part')
                    }



                }
                displayWord()
            }
            //compruebo que la palabra contiene la letra introducida
        }
    }
})

playAgainBtn.addEventListener('click', () => {
    wrongLetters.splice(0)
    correctLetters.splice(0)
    wrongLettersEl.innerHTML = ''
    figureParts.forEach(a => {
        a.classList.add('figure-part')
    })

    selectedWord = words[Math.floor((Math.random() * words.length) == 5 ? 4 : (Math.random() * words.length))]

    displayWord()

    popup.style.display = 'none'

})

displayWord()
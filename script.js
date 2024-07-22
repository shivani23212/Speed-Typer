const textArea = document.getElementById('user_input');
// textArea.value = "";

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');

const mainContent = document.getElementById('page-content');

var timer = document.getElementById('timer');

var timerOn = true;
var timerValue = 0;


var purple_btn = document.getElementById("purple_btn");
var blue_btn = document.getElementById("blue_btn");
var orange_btn = document.getElementById("orange_btn");
var pink_btn = document.getElementById("pink_btn");

buttons = [purple_btn, blue_btn, orange_btn, pink_btn]

colours = ['purple', 'blue', 'orange', 'pink']

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(event) {
        changeColor(colours[i]);
    });
}

startBtn.addEventListener("click", () => {
    let startTime = Date.now()
    startBtn.style.display = 'none';
    textArea.disabled = false;
    // create new timer element
    // var timer = document.createElement("div");
    // timer.classList.add("timer");
    // add timer to page
    // mainContent.appendChild(timer);
    timer.innerText = timerValue;
    timer.style.display = 'block';
    setInterval(updateTimer, 1, startTime);

})

function updateTimer(startTime) {
    if (timerOn == true) {
        // timer = document.getElementsByClassName('timer')[0];
        var elapsedTime = Date.now() - startTime;
        timer.innerHTML = (elapsedTime / 1000).toFixed(3);
    }
}

textArea.addEventListener("input", () => {
    var quoteArray = document.querySelectorAll("span");
    quoteArray = Array.from(quoteArray);
    quoteArray.splice(-4);
    console.log(quoteArray);
    const valueArray = textArea.value.split("");
    let correct = true;
    quoteArray.forEach((span, index) => {
        if (valueArray[index] == null) {
            span.classList.remove("incorrect");
            span.classList.remove("correct");
            correct = false;
        }
        else if (span.innerText === valueArray[index]) {
            span.classList.remove("incorrect");
            span.classList.add("correct");
            correct = true;
        }
        else if (span.innerText !== valueArray[index]) {
            span.classList.add("incorrect");
            span.classList.remove("correct");
            correct = false;
        }
    })
    if (correct) {
        timerOn = false;
        nextBtn.style.display = 'block';
        nextBtn.addEventListener('click', insertQuote);
        mainContent.append(nextBtn);
        // timer.innerHTML = 0;
    }
}
)

async function generateQuote() {
    const response = await fetch("https://api.quotable.io/random?minLength=100&maxLength=200");

    if (response.ok) {
        const data = await response.json();
        return data.content;
    }
    else {
        return "error";
    }
}


async function insertQuote() {
    if (nextBtn) {
        nextBtn.remove();
    }
    timer.style.display = 'none';
    startBtn.style.display = 'block';
    timerOn = true;
    textArea.disabled = true;

    const quote = await generateQuote();
    const updateBox = document.getElementById('copy-text');
    updateBox.innerText = "";
    quote.split("").forEach(character => {
        var spanElement = document.createElement("span");
        spanElement.innerText = character;
        updateBox.appendChild(spanElement);
    });
    textArea.value = null

}

insertQuote();

function changeColor(colour) {
    document.body.classList.remove('purple', 'blue', 'orange', 'pink');
    document.body.classList.add(colour);
  }


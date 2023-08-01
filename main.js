const text = document.getElementById('text');
const sentence = document.getElementById('sentence');
const answer = document.getElementById('answer');
const scoreLabel = document.getElementById('score-label');
const score = document.getElementById('score');
const overlay = document.getElementById('overlay');
const startButton = document.getElementById('start-button');
const header = document.getElementById('header');
const timer = document.getElementById('timer');

scoreLabel.hidden = true;
answer.hidden = true;


function reload() {
    scoreLabel.hidden   = false;
answer.hidden = true;
text.innerText = `Remember This`
const firstNoun = ["book", "sun", "tree", "ocean", "mountain", "flower", "computer", "friend", "city", 'dog', 'cat', 'duck', 'goose', 'bear', 'bearcat', 'bobcat', 'wildcat', 'tiger', 'lion', 'fish', 'shark']
const firstVerb = ['ran', 'ate', 'tackled', 'overpowered', 'farted', 'darted', 'climbed', 'swam', 'trampled', "asked", "walked", "played", "talked", "called", "jumped", "passed", "looked", "closed", "climbed"]
const adjective = ['bloody', 'fast', 'slow', 'bright', 'smart', 'sly', 'clever', 'scared', 'rough', "beautiful", "energetic", "courageous", "serene", "enchanting", "mysterious", "playful", "delightful", "graceful", "vibrant"]


function newSentence(){
    let word1 = firstNoun[Math.floor(Math.random() * firstNoun.length)]
    let word2 = firstVerb[Math.floor(Math.random() * firstVerb.length)]
    let word3 = adjective[Math.floor(Math.random() * adjective.length)]
    let word4 = firstNoun[Math.floor(Math.random() * firstNoun.length)]
    let word5 = firstVerb[Math.floor(Math.random() * firstVerb.length)]
    if (Number(score.innerText) >= 20 && Number(score.innerText) < 80){
    sentence.innerText = `${word1} ${word2}`;
    localStorage.setItem('active-amount', 20)
    } else if (Number(score.innerText) >= 80 && Number(score.innerText) < 200){
        sentence.innerText = `${word1} ${word2} ${word3}`;
        localStorage.setItem('active-amount', 40)
    } else if (Number(score.innerText) >= 200 && Number(score.innerText) < 440){
        sentence.innerText = `${word1} ${word2} ${word3} ${word4}`;
        localStorage.setItem('active-amount', 80)
    } else if(Number(score.innerText) >= 440){
    sentence.innerText = `${word1} ${word2} ${word3} ${word4} ${word5}`;
    localStorage.setItem('active-amount', 160)
    } else { 
    sentence.innerText = `${word1}`;

    }
    localStorage.setItem('answer', sentence.innerText)
    setTimeout(clearSentence, 5000);
}
function clearSentence() {
    sentence.innerText = "";
    answer.hidden = false;
    answer.value = "";
    answer.focus();
    text.innerText = "Do You Remember?";
}
newSentence()
}


answer.addEventListener('keydown', function (event){
    if (event.key === 'Enter') {
        let input = answer.value.toLowerCase();
        if(input === localStorage.getItem('answer')){
            text.innerText = `You Member!!`
            answer.value = ''
            answer.hidden = true;
            score.innerText = Number(score.innerText) + JSON.parse(localStorage.getItem('active-amount'))
            setTimeout((()=> text.innerText = 'Get Ready'),5000);
        setTimeout(reload, 7000)
        } else {
            // Incorrect answer
            text.innerText = `You don't member...`;
            answer.value = '';
            setTimeout(() => {
              text.innerText = 'Get Ready';
              location.reload(); // Reload the page immediately after 3 seconds
            }, 5000);
        }
    }
})
console.log(localStorage.getItem('answer'))
//reload()
startButton.addEventListener('mouseenter', blurHeader)
startButton.addEventListener('mouseleave', unBlur)
startButton.addEventListener('click', startGame)

function blurHeader(){
    header.style.textShadow = `10px 12px 12px rgba(29, 29, 32, 0.9)`;
}
function unBlur (){
    header.style.textShadow = `10px 12px 2px rgba(29, 29, 32, 0.9)`;
}
function startGame(){
    getReady()
     overlay.style.animation = 'houdini 3s ease-out';
     setTimeout(()=> overlay.style.opacity = '0', 2000)
     setTimeout(()=> reload(), 8000)
    //reload();
    localStorage.setItem('active-amount', 10)

}


function getReady() {
    let a = 8;
    text.innerText = `Get Ready`; // Set initial value

    const timerInterval = setInterval(() => {
      a--;
      if (a < 6){
      text.innerText = a; // Update displayed timer value
      }
      if (a <= 0) {
        clearInterval(timerInterval); // Stop the interval when a reaches 0 or goes negative
        // Optional: Perform any actions when the timer reaches 0
      }
    }, 1000);
  }
  //localStorage.clear()
  // ... (Your existing code)

// Function to check if an element is a descendant of another element
function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node != null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

// Add a click event listener on the document
document.addEventListener('click', function(event) {
  // Check if the click target is not the "answer" input or its descendant
  if (!isDescendant(answer, event.target)) {
    // Remove focus from the "answer" input
    answer.focus();
  }
});

// ... (Your existing code)

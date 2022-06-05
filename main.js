

// get the HTML elements 
let start_btn = document.querySelector('.start-btn');
let innerStart_btn = document.getElementById('start-init-btn');
let quit_btn = document.getElementById('quit-btn');
let quiz_container = document.querySelector('.quiz-container');
let optionsQuizA = document.getElementById('option1');
let optionsQuizB = document.getElementById('option2');
let optionsQuizC = document.getElementById('option3');
let labelPara_one = document.querySelector('.txt_opt0');
let labelPara_two = document.querySelector('.txt_opt1');
let labelPara_three = document.querySelector('.txt_opt2');
let next_btn = document.getElementById('nxt-btn');
let main_start_btn = document.getElementById('btn_start');
let info_contain = document.querySelector('.info-container')
let change_Question = document.querySelector('.question-para');
let bold = document.querySelector('b');
let answer_opt = document.querySelector('.answerOpt')
let quiz_options = document.querySelector('.quiz-options');
let percentScore =  document.getElementById('percent_score');
let resultContainer = document.querySelector('.resultContainer');
let shuffle;
let indexQuestion = 0;
let count = 15;
let countDown; 
let timer;

let score = 0;
percentScore.innerHTML = score + '%'


////////////////////// SET THE QUESTIONS ///////////////////////////////////

let quizContainer = [
    {
        question: 'On average how far away is the moon from the earth in miles?',
        options: [
            {text: 'A. 200,000', isCorrect: false},
            {text: 'B. 258,000', isCorrect: false},
            {text: 'C. 238,000', isCorrect: true} 
        ],
    },
    {
        question: 'Which European city hosted the 1936 Summer Olympics?',
        options: [
            {text: 'A. Augsberg', isCorrect: false},
            {text: 'B. Munich', isCorrect: false},
            {text: 'C. Berlin', isCorrect: true}
        ],
    },
    {
        question: 'What are the five colours of the Olympic rings?',
        options: [
            {text: 'A. Blue, Yellow, Black, Purple and Red', isCorrect: false},
            {text: 'B. Red, Yellow, White, Green and Blue', isCorrect:false},
            {text: 'C. Blue, Yellow, Black, Green and Red', isCorrect:true}
        ],
    },
    {
        question: 'What number is a baker"s" dozen?',
        options:[
            {text: 'A. 12', isCorrect: false},
            {text: 'B. 13', isCorrect: true},
            {text: 'C. 15', isCorrect: false} 
 
        ]
    },
    {
        question: 'How many centimetres in a metre',
        options: [
            {text: 'A. 10', isCorrect: false},
            {text: 'B. 100', isCorrect: true},
            {text: 'C. 1000', isCorrect: false}
        ]
    },
    // {
    //     question: 'What is the full meaning of HTML',
    //     options: [
    //         {text: 'A. Hyper Text Markup Language', isCorrect: true},
    //         {text: 'B. Hyper The Man Language', isCorrect: false},
    //         {text: 'C. Hello Text Me Later', isCorrect: false},
    //     ]
    // }
];
let getQuiz_length = quizContainer.length -1;

//// END OF QUESTIONS SET




// Start Quiz
function startBtn(){
    info_contain.classList.add('show');
    main_start_btn.classList.add('closeStart');
}

main_start_btn.addEventListener('click', startBtn);


// end quit     
function closeInfo(){
  
        info_contain.classList.remove('show');
        main_start_btn.classList.remove('closeStart');
    
}

quit_btn.addEventListener('click', ()=>{
    console.log('true');
    closeInfo();
   
});


// Show Quiz

innerStart_btn.addEventListener('click', ()=>{
    info_contain.classList.remove('show');
    quiz_container.classList.add('showQuiz');
    buildQuestion();
    get_count_down();
    timer = setInterval(get_count_down, 1000);
    
});





const buildQuestion = () => {
    // indexQuestion = Math.floor(Math.random() * quizContainer.length);
     shuffle = quizContainer.sort();
     let firstQuestion = shuffle[indexQuestion];
     change_Question.innerHTML = firstQuestion.question;
     firstQuestion.options.forEach(option => {
         const button = document.createElement('button');
         button.innerHTML = option.text;
         button.classList.add('btn_btn')
         if(option.isCorrect){
             button.dataset.correct = option.isCorrect;
         }
         
         answer_opt.appendChild(button);
         button.addEventListener('click',(e)=>{
             let selectEvent_target = e.target;
             let correctElem = selectEvent_target.dataset.correct;
             console.log(correctElem);
           setStatus(button, button.dataset.correct)
         })
         while(answer_opt.firstChild){
             return answer_opt.removeChild(answer_opt.firstChild)
         }
     })
}



// setAnswer Status

const setStatus = (element, correct) => {
    // clearStatus(element)
    if(correct){
        element.className = 'correct'
        count = 0;
        score += 20;
        percentScore.textContent = score + '%';
        answer_opt.classList.add('unclick');
    } else{
       element.className = 'wrong';
       count = 0;
       
       answer_opt.classList.add('unclick');
    }
    
}


// GET THE TIME TO COUNT;

const get_count_down = () => {
    countDown = 0; 
    if(count >= countDown) {
        bold.innerHTML = count + 's';
        count--;
        
        console.log(count);
    } 
    if(count === countDown){
        answer_opt.classList.add('unclick');
       
    }

}




// SET NEXT QUESTION

const nextQuestion = () => {

   if(indexQuestion < getQuiz_length){
        count = 15;
        indexQuestion++;
        quiz_options.classList.remove('unclick');
        quiz_container.classList.remove('unclick')
        answer_opt.classList.remove('unclick')
        buildQuestion();
       
       
   } else {
       next_btn.innerHTML = 'View Result';
       quiz_container.classList.remove('showQuiz');
       resultContainer.classList.toggle('showResult');
   }
    if(indexQuestion === getQuiz_length){
        next_btn.innerHTML = 'Submit';
    }
}

next_btn.addEventListener('click', nextQuestion);

// Get Result





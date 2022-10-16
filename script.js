//getting all req elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const options_list = document.querySelector(".options_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeoff = quiz_box.querySelector("header .time_text");


//START BTN ACTION
start_btn.onclick = ()=>{
	info_box.classList.add("activeInfo");//disp info box
}

//EXIT BTN ACTION
exit_btn.onclick = ()=>{
	info_box.classList.remove("activeInfo");//remove info box
}

// CONTINUE BTN ACTION
continue_btn.onclick=()=>{
	info_box.classList.remove("activeInfo");//remove info box
	quiz_box.classList.add("activeQuiz");//disp quiz box
	showQuestions(0);
	qncounter(1);
	startTimer(15);
	startTimerLine(0);
}

// -------------------------------------------------------------
let qn_count = 0;
let qn_number = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick=()=>{
	quiz_box.classList.add("activeQuiz");
	result_box.classList.remove("activeResult");
	let qn_count = 0;
	let qn_number = 1;
	let timeValue = 15;
	let widthValue = 0;
	let userScore = 0;
	showQuestions(qn_count);
	qncounter(qn_number);
	clearInterval(counter);
	startTimer(timeValue);
	clearInterval(counterLine);
	startTimerLine(widthValue);
	next_btn.style.display="none";
}
quit_quiz.onclick=() =>{
	window.location.reload();
}


//NEXT BTN ACTION
next_btn.onclick=()=>{
	if(qn_count < questions.length - 1){
		qn_count++;
		qn_number++;
		showQuestions(qn_count);
		qncounter(qn_number);
		clearInterval(counter);
		startTimer(timeValue);
		clearInterval(counterLine);
		startTimerLine(widthValue);
		next_btn.style.display="none";
	}
	else{
		console.log("Questions completed!!");
		showResultBox();
	}
}



//GET QNS AND OPTINS FROM JS
function showQuestions(index){
	const qns_text = document.querySelector(".qns_text");
	// const options_list = document.querySelector(".options_list");
	let qns_tag = '<span>'+ questions[index].number+"."+questions[index].question +'</span>';
	let option_tag = '<div class="option">'+questions[index].options[0]+'<span></span></div>'
					+ '<div class="option">'+questions[index].options[1]+'<span></span></div>'
					+ '<div class="option">'+questions[index].options[2]+'<span></span></div>'
					+ '<div class="option">'+questions[index].options[3]+'<span></span></div>';
	
	
	qns_text.innerHTML = qns_tag;
	options_list.innerHTML = option_tag;
	const option = options_list.querySelectorAll(".option");
	
	for(let i = 0; i<option.length;i++){
		option[i].setAttribute("onclick","optionSelected(this)");
	}
}
// ---------------------------------------
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
// ---------------------------------------


function optionSelected(answer){
	clearInterval(counter);
	clearInterval(counterLine);
	let userAns = answer.textContent;
	let correctAns = questions[qn_count].answer;
	let allOptions = options_list.children.length;
	if (userAns == correctAns) {
		userScore+=1;
		console.log(userScore);
		answer.classList.add("correct");
		console.log("Correct Answer");
		answer.insertAdjacentHTML("beforeend",tickIcon);
	}
	else{
		answer.classList.add("incorrect");
		console.log("Wrong Answer");
		answer.insertAdjacentHTML("beforeend",crossIcon);

		// IF ANS IS INCRT, SHOW CRT ANS
		for(let i=0;i<allOptions;i++){
			if(options_list.children[i].textContent==correctAns){
				options_list.children[i].setAttribute("class","option correct");
				options_list.children[i].insertAdjacentHTML("beforeend",crossIcon);
			}
		}
	}

	//ONCE OPT WAS SELECTED, DISABLE ALL
	for(let i=0;i<allOptions;i++){
		options_list.children[i].classList.add("disabled");
	}
	next_btn.style.display = "block";
}
// ----------------------RESULTS-----------
function showResultBox(){
	info_box.classList.remove("activeInfo");
	quiz_box.classList.remove("activeQuiz");
	result_box.classList.add("activeResult");
	const scoreText = result_box.querySelector(".score_text");
	if(userScore >3){
		let scoreTag = '<span>and Congradulations!!, you got <p>'+ userScore+'</p> out of <p>'+questions.length+'</p></span>';
		scoreText.innerHTML=scoreTag;
	}
	else if(userScore >1){
		let scoreTag = '<span>and Good , you got <p>'+ userScore+'</p> out of <p>'+questions.length+'</p></span>';
		scoreText.innerHTML=scoreTag;
	}
	else{
		let scoreTag = '<span>and sorry, you got only <p>'+ userScore+'</p> out of <p>'+questions.length+'</p></span>';
		scoreText.innerHTML=scoreTag;
	}
}

// -----------------------------TIMER SECTION--------
function startTimer(time){
	counter = setInterval(timer, 1000);
	function timer(){
		timeCount.textContent=time;
		time--;

		if(time<9){
			let addZero=timeCount.textContent;
			timeCount.textContent="0"+addZero;
		}
		if(time<0){
			clearInterval(counter);
			timeCount.textContent="00";


			let correctAns = questions[qn_count].answer;
			let allOptions = options_list.children.length;
			for(let i=0;i<allOptions;i++){
				if(options_list.children[i].textContent==correctAns){
					options_list.children[i].setAttribute("class","option correct");
					options_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
				}	
			}
			for(let i=0;i<allOptions;i++){
				options_list.children[i].classList.add("disabled");
			}
			next_btn.style.display = "block";
		}
	}
}

// -------------------------------------------------
function startTimerLine(time){
	counterLine = setInterval(timer, 29);
	function timer(){
		time += 1;
		time_line.style.width = time+"px";
		if(time>549){
			clearInterval(counterLine);
		}
	}
}








// -----------------------------------------------------------------
function qncounter(index) {
	const bottom_qns_counter = quiz_box.querySelector(".total_qns");
	let totalQnsCountTag =  '<span><p>'+index+'</p>of<p>'+questions.length+'</p>Questions</span>';
	bottom_qns_counter.innerHTML=totalQnsCountTag;
}
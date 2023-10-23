let cardsExpert = ['images/waterMellon.jpg' , 'images/strawberry.jpg', 'images/apple.jpg', 'images/orange.jpg', 'images/apple.jpg', 'images/cherry.jpg','images/waterMellon.jpg' , 'images/orange.jpg', 'images/cherry.jpg', 'images/strawberry.jpg', 'images/grape.jpg', 'images/grape.jpg', 'images/lime.jpg', 'images/lime.jpg', 'images/banana.jpg', 'images/banana.jpg'];
let cardsMedium = ['images/waterMellon.jpg', 'images/apple.jpg', 'images/orange.jpg', 'images/apple.jpg', 'images/cherry.jpg','images/waterMellon.jpg' , 'images/orange.jpg', 'images/cherry.jpg'];
let cardsEasy = ['images/waterMellon.jpg' , 'images/strawberry.jpg','images/waterMellon.jpg' , 'images/strawberry.jpg' ];
let previousImage = '';
let previousId = '';
let progress = 0;
let rowCounter = 0;
let points = 0;
let rowDevider = 0;
let score;
let scoreRate;

function toggleFullScreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen(); 
		}
	}
}
function selctLevel(rt){
	if(rt.textContent == 'Лесно'){	
		cards = cardsEasy;
		rowDevider = 2;
		scoreRate = 'Лесно';
	}
	if(rt.textContent == 'Средно'){
		cards = cardsMedium;
		rowDevider = 4;
		scoreRate = 'Средно';
	}
	if(rt.textContent == 'Експерт'){
		cards = cardsExpert;
		rowDevider = 4;
		scoreRate = 'Експерт';
	}	
	scoreAdjust(rt.textContent)
	drawCards_firstRow();
}
function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
}
function drawCards_firstRow() {
	shuffle(cards);
	const firstRow = document.querySelector('.firstRow');
	firstRow.innerHTML = '';
	let boxCounterId = 1;
	cards.forEach(card => {					
		let a = `<div class="image">
					<div class="img_top" ></div>
					<img src="${card}" alt="" id="${boxCounterId}">
				</div> `;
		firstRow.innerHTML += a;
		rowCounter++;
		boxCounterId++;
		if(rowCounter == rowDevider){
			firstRow.innerHTML += '<br>';
			rowCounter = 0;
		}			
	})
	const ima = document.querySelectorAll('.image');
	ima.forEach(image => image.addEventListener('click', matchPrivious));
}
function matchPrivious(e) {
	let nextImage = e.target.parentNode.children[1].src;
	let nextId = e.target.parentNode.children[1].id;

	if(previousImage == nextImage && previousId != nextId){
		toggleCard(e);
		theyDontMatch(e);
		setTimeout(theyMatch, 400);
	}
	if(previousImage == '' && previousId == '' ){
		toggleCard(e);
		theyDontMatch(e);
	}
	if(previousImage != nextImage && previousId != nextId){
		toggleCard(e);
		resetCards();
		previousImage = '';		
		previousId = '';		
	}
}
function toggleCard(e) {
	e.target.parentNode.classList.toggle('active');
	e.target.parentNode.children[0].classList.toggle('img_top');
}
function theyMatch() {
	removeCard();
}
function theyDontMatch(e) {		
	previousImage = e.target.parentNode.children[1].src;
	previousId = e.target.parentNode.children[1].id;
}
function removeCard() {
	let activee = document.querySelectorAll('.active');
	activee.forEach(div =>{
		div.classList.toggle('active');
		div.removeEventListener('click', matchPrivious);
		div.children[0].remove();
		div.children[0].remove();
	})
	previousImage = '';
	previousId = '';
	progress++;
	contPoints('+');
	if(progress == cards.length/2){
		won(points);
	}	
}
function resetCards() {
	let activeeCards = document.querySelectorAll('.active');
	previousImage = '';
	previousId = '';
	contPoints('-');
	setTimeout(function(){
		activeeCards.forEach(card =>{
			card.children[0].classList.add('img_top');
			card.classList.toggle('active');
		})		
	}, 400);
}
function contPoints(plusMinus){
	if(plusMinus == '-'){points --}
	if(plusMinus == '+'){points += 5}
	document.getElementById('points').innerHTML = `Точки ${points}`;
}

function won(points){
	let won = `<div class="won">
					<p>Точки ${points}</p>
				</div>`;
	scoreAdjust(scoreRate);
	document.querySelector('.firstRow').innerHTML = won;
	document.querySelector('.firstRow').innerHTML += score;
	document.querySelector('#points').remove();
}

function scoreAdjust(scoreRate){
	let scoreText = []
	if(scoreRate == 'Лесно'){
		if(points == 10 ){scoreText = ['pointsMAX', 'Максимален резултат']}
		if(points >= 8 && points <= 9){scoreText = ['pointsVeryGood', 'Много добър резултат'];}
		if(points >= 6 && points <= 7 ){scoreText = ['pointsGood', 'Добър резултат'];}
		if(points <= 5 ){scoreText = ['pointsBad', 'Лош резултат'];} 
	}
	if(scoreRate == 'Средно'){
		if(points == 20 ){scoreText = ['pointsMAX', 'Максимален резултат'];}
		if(points >= 16 && points <= 19){scoreText = ['pointsVeryGood', 'Много добър резултат'];}
		if(points >= 13 && points <= 15 ){scoreText = ['pointsGood', 'Добър резултат'];}
		if(points <= 12 ){scoreText = ['pointsBad', 'Лош резултат'];} 
	}
	if(scoreRate == 'Експерт'){
		if(points == 40 ){scoreText = ['pointsMAX', 'Максимален резултат'];}
		if(points >= 36 && points <= 39){scoreText = ['pointsVeryGood', 'Много добър резултат'];}
		if(points >= 33 && points <= 37 ){scoreText = ['pointsGood', 'Добър резултат'];}
		if(points <= 32 ){scoreText = ['pointsBad', 'Лош резултат'];}		 
	}
	score = `<div class="${scoreText[0]}">
				<p className="max">${scoreText[1]}</p>
			</div>`;
}

function resetPage(){	
	document.location.reload(true);
}




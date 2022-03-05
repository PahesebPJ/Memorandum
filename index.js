let cont = -1; //cont variable saves numbers to control the number of cards are switched
let pair = Array(); //pair variable save the id of the pairs to controll it 
let val = Array(); //val variable save the element value to see if there are similars
let points = 0;

let images = ['img/Act 3.jpg','img/Golden experience.jpg','img/Hermit purple.jpg','img/Silver Chariot.jpg',
'img/Six pistols.jpg','img/killer-queen.png','img/Star Platinum.jpg','img/ZA WARDO.jpg','img/Stone free.jpg','img/Za hando.jpg']; 



let used = new Array();
let usedcard = new Array();

function getRandomNumber(max) {
    let num;
    num = Math.round(Math.random() * max);
    for(let i=0;i<used.length;i++) {
        if(num == used[i]) {
            num = Math.round(Math.random() * max);
            i = 0;
        }
    }
    used.push(num);
    return num;
}

function getRandomCard(min, max) {
    let num;
    num = Math.round(Math.random() * (max - min) + min);
    for(let i = 0;i<used.length;i++) {
        if(num == used[i]) {
            num = Math.round(Math.random() * (max - min) + min);
            i = 0;
        }
    }
    usedcard.push(num);
    return num;
}

function closeWinMessage() {
    document.getElementById('win').style.display = 'none';
    location.reload(); //reload page
}

function WinMessage() {
    document.getElementById('win').style.display = 'block';
}

function CardsSimilar() {
    for(let i=0;i<2;i++) {
        document.getElementById(pair[i]).style.pointerEvents = "none";
    }
}

function CardsDifferent() {
    for(let i=0;i<2;i++){
        document.getElementById(pair[i]).style.transform = "rotateY(360deg)";
    }
}

function rotateCard(element) {
    if(cont==1) //If there are two cards switched
        return;
    document.getElementById(element.id).style.transform = "rotateY(180deg)"; //rotate element
    cont++;
    pair[cont] = element.id;
    val[cont] = element.dataset.value;
    console.log(element.childNodes);
    setTimeout(() => {
        if(cont == 1) { //If two cards were switched
            if(val[0] == val[1] && pair[0] != pair[1]) {//If the cards are the same
                points++; //sum points
                if(points == 10)
                    WinMessage();  
                CardsSimilar();
            }else { //If the cards aren't the same
                CardsDifferent();
            }
            cont = -1;
        }
    },1500);
}

window.onload = () => {
    let thecard = 'card';
    let value=1;
    let runCards=0;
    var listImg = [0,1,2,3,4,5,6,7,8,9]; 
    var listCards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    listImg = listImg.sort(function() {return Math.random() - 0.5}); 
    listCards = listCards.sort(function() {return Math.random() - 0.5});

    for(let i=0;i<10;i++) {
        let number = listImg[i];
        for(j=0;j<2;j++) {
            let card = document.getElementById(listCards[runCards]);
            card.src = images[number];
            card.dataset.value = value;
            let idCard = document.getElementById(thecard.concat(listCards[runCards]));
            idCard.dataset.value = number;
            runCards++;
        }
        value++;
    }
}
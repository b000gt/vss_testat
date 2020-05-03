const clicksUrl = 'http://localhost:8080/clicks';
const facesUrl = 'http://localhost:8080/faces';
const imagesUrl = '/images/';
const costModifier = 9;
const rewardModifier = 7;

class clickBuffer{
    constructor() {
        this.clicks = 0;
    }
    addClick(amount){
        this.clicks += amount;
    }
    async sendClicks() {
        if(this.clicks > 0){
            pushClicks(this.clicks);
            this.clicks = 0;
        }
    }
}
const userClickBuffer = new clickBuffer();

async function pullClicks(){
    return await fetch(clicksUrl)
        .then(res => res.json())
}

async function pushClicks(amount){
    await fetch(clicksUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: parseInt(amount) })
    });
}

async function pullFaces(){
    return await fetch(facesUrl)
        .then(res => res.json())
}

async function calcNewFaceAvailable(faces){
    const points = parseInt(document.getElementById('points').innerText);
    const nextPrice = Math.pow(costModifier, faces.length);
    document.getElementById('next-unlock').innerText = nextPrice;
    if(nextPrice <= points){
        const nextAmount = Math.pow(rewardModifier, faces.length);
        return {isAvailable: true, price: nextPrice, amount: nextAmount};
    } else{
        return false;
    }
}

function updateClicks(clicks, hardUpdate = false){
    if(parseInt(document.getElementById('points').innerText) < parseInt(clicks.amount) ||hardUpdate) {
        document.getElementById('points').innerText = clicks.amount;
    }
}

function updateNewFaceAvailable(answer){
    if(answer.isAvailable){
        document.getElementById('add-face').classList.remove('hidden');
        document.getElementById('cost').innerText = answer.price;
        const inputs = document.getElementsByTagName('form')[0].getElementsByTagName('input');
        for(let inputIndex in inputs){
            if(answer[inputs[inputIndex]['name']] != undefined){
                inputs[inputIndex]['value'] = answer[inputs[inputIndex]['name']];
            }
        }
    } else{
        document.getElementById('add-face').classList.add('hidden');
    }
}

function updateFaces(faces){
    const template = document.getElementById('face-id--1');
    for(let faceIndex in faces){
        if(document.getElementById('face-id-' + faces[faceIndex].id) != null){
            document.getElementById('face-id-' + faces[faceIndex].id).remove();
        }
        let newFace = template.cloneNode(true);
        newFace.getElementsByTagName('img')[0].setAttribute('src', imagesUrl + faces[faceIndex].name);
        newFace.setAttribute('id', 'face-id-' + faces[faceIndex].id);
        newFace.getElementsByClassName('modifier')[0].textContent = faces[faceIndex].amount;
        document.getElementById('board').append(newFace);
        newFace.addEventListener("click", clickFaceListener);
    }
}

function clickFaceListener(){

    // animation
    this.classList.add('bouncy');
    let el = this;
    setTimeout(function(){
        el.classList.remove('bouncy');
        el.lastChild.remove();
    }, 200);
    let heart = document.createElement('I');
    heart.classList.add('fa', 'fa-heart', 'reaction');
    el.appendChild(heart);

    // logic
    userClickBuffer.addClick(
        parseInt(
            this.getElementsByClassName('modifier')[0].textContent
        )
    );
    document.getElementById('points').innerText =
        parseInt(document.getElementById('points').innerText) +
        parseInt(
            this.getElementsByClassName('modifier')[0].textContent
        )
}

function clickAddFaceListener(){
    document.getElementsByClassName('overlay')[0].classList.remove('hidden');
}

async function clickAddFaceSubmitButton(e){
    e.preventDefault();
    const file = document.querySelector('input[type="file"]');
    const amount = document.querySelector('input[name="amount"]').getAttribute('value');
    const price = document.querySelector('input[name="price"]').getAttribute('value');
    let data = new FormData();
    console.log(amount);
    data.append('file', file.files[0]);
    data.append('amount', amount);
    data.append('price', price);
    await fetch(facesUrl, {
        method: 'POST',
        body: data
    }).then(res => {
        document.getElementsByClassName('overlay')[0].classList.add('hidden');
        updateEverything(true);
    })
}

async function updateEverything(hardUpdate = false){
    await userClickBuffer.sendClicks();
    pullClicks()
        .then(clicks => updateClicks(clicks, hardUpdate));
    pullFaces()
        .then(faces => {
            updateFaces(faces);
            calcNewFaceAvailable(faces)
                .then(answer => updateNewFaceAvailable(answer));
        });
}

async function updateInInterval(){
    // setInterval
    // setTimeout
    setInterval(async function(){
        updateEverything();
    }, 2000);
}

function init(){
    updateEverything();
    updateInInterval();
    document.getElementById('add-face')
        .addEventListener('click', clickAddFaceListener);
    document.getElementsByTagName('form')[0]
        .getElementsByTagName('button')[0]
        .addEventListener('click', clickAddFaceSubmitButton);
}
init();
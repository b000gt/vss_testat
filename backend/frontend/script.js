const clicksUrl = 'http://localhost:8080/clicks';
const facesUrl = 'http://localhost:8080/faces';
const imagesUrl = 'images/';
const costModifier = 10;
const rewardModifier = 5;

class clickBuffer{
    constructor() {
        this.clicks = 0;
    }
    addClick(amount){
        this.clicks += amount;
    }
    async sendClicks() {
        pushClicks(this.clicks)
            .then(res => this.clicks = 0);
    }
}
const userClickBuffer = new clickBuffer();

async function pullClicks(){
    return await fetch(clicksUrl)
        .then(res => res.json());
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

async function pullNewFaceAvailable(){
    const faces = await pullFaces();
    const points = parseInt(document.getElementById('points').innerText);
    const nextPrice = Math.pow(costModifier, faces.length);
    if(nextPrice < points){
        const nextAmount = Math.pow(rewardModifier, faces.length);
        return {isAvailable: true, price: nextPrice, amount: nextAmount};
    } else{
        return false;
    }
}

function updateClicks(clicks){
    if(document.getElementById('points').innerText < clicks.amount) {
        document.getElementById('points').innerText = clicks.amount;
    }
}

function updateNewFaceAvailable(answer){
    console.log(answer);
    if(answer.isAvailable){
        document.getElementById('add-face').classList.remove('hidden');
        const inputs = document.getElementsByTagName('form')[0].getElementsByTagName('input');
        for(let inputIndex in inputs){
            if(answer[inputs[inputIndex]['name']] != null){
                inputs[inputIndex]['value'] = answer[inputs[inputIndex]];
            }
        }
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

async function addFace(formBody){
    await fetch(facesUrl, {
        method: 'POST',
        headers:{
            enctype: 'multiplart/form-data',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formBody)
    }).then(res => document.getElementsByClassName('overlay')[0].classList.add('hidden'))
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

function clickAddFaceSubmitButton(e){
    e.preventDefault();
    const formBody = {};
    const inputs = document.getElementsByTagName('form')[0].getElementsByTagName('input');
    for(let elementIndex in inputs){
        formBody[inputs[elementIndex]['name']] = inputs[elementIndex]['value'];
    }
    addFace(formBody);
}

async function updateEverything(){
    await userClickBuffer.sendClicks();
    pullClicks()
        .then(clicks => updateClicks(clicks));
    pullFaces()
        .then(faces => updateFaces(faces));
    pullNewFaceAvailable()
        .then(answer => updateNewFaceAvailable(answer));
}

async function updateInInterval(){
    // setInterval
    // setTimeout
    setTimeout(async function(){
        updateEverything();
    }, 1000);
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
const clicksUrl = 'http://localhost:8080/clicks';
const facesUrl = 'http://localhost:8080/faces';
const imagesUrl = 'images/';


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

function updateClicks(clicks){
    if(document.getElementById('points').innerText < clicks.amount) {
        document.getElementById('points').innerText = clicks.amount;
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

async function updateInInterval(){
    // setInterval
    // setTimeout
    setTimeout(async function(){
        await userClickBuffer.sendClicks();
        pullClicks()
            .then(clicks => updateClicks(clicks));
        pullFaces()
            .then(faces => updateFaces(faces));
    }, 1000);
}

function init(){
    updateInInterval();
}
init();
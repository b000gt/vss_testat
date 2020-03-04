async function fetchPoints(){
    let counterObj = await fetch('http://localhost:8080/counter')
        .then(res => { return res.json() });
    return parseInt(counterObj.points);
}
async function updatePoints(){
    document.getElementById("points").innerText = await fetchPoints();
}
async function updateClickables(){
    let clickables = await getClickables();
    document.getElementById("main").innerHTML = "";
    for(clickable of clickables){
        document.getElementById("main").innerHTML += clickable.getHtml();
        updateClickableEvent(document.getElementById(clickable.Modifier));
    }
}
async function getClickables(){
    let clickables = [];
    var clickablesObj = await fetch('http://localhost:8080/clickables')
        .then(res => { return res.json() });
    for ( clickable of clickablesObj.clickables){
        clickables.push(new Clickable(clickable.Modifier));
    }
    return clickables;
}
clickableOnClick = async function(){
    await fetch('http://localhost:8080/counter/increase/'+this.getAttribute("modifier"));
    updatePoints();
};
async function updateClickableEvent(clickable){
    clickable.removeEventListener("click", clickableOnClick);
    clickable.addEventListener("click", clickableOnClick);
}
async function updateAddClickable(){
    document.getElementById("addClicker").addEventListener("click", async function () {
        await fetch('http://localhost:8080/clickables/add/'+document.getElementById("points").innerText);
        updateClickables();
    });
}

async function backgroundClicker(){
    setTimeout(async function(){
        for(clickable of document.getElementsByClassName("clickable")){
            await fetch('http://localhost:8080/counter/increase/'+clickable.getAttribute("modifier"));
            updatePoints();
        }
        backgroundClicker();
    }, Math.floor((Math.random() * 1500) + 500));
}
class Clickable{
    constructor(modifier) {
        this.Modifier = parseInt(modifier);
    }
    getHtml(){
        return '<div class="clickable" modifier="'+this.getModifier()+'" id="'+this.getModifier()+'">+'+this.getModifier()+'</div>';
    }
    getModifier(){
        return this.Modifier;
    }
}

updatePoints();
updateClickables();
updateAddClickable();
backgroundClicker();
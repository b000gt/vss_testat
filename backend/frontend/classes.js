class Face{
    constructor(url, modifier) {
        this.url = url;
        this.modifier = parseInt(modifier);
    }
    getHtml(){
        let htmlString = '<div class="faces" modifier="'+this.modifier+'">';
        htmlString += '<img src="'+this.url+'">';
        htmlString += '</div>';
        return htmlString;
    }
}

class Points{
    constructor() {
        this.count = 0;
    }
    spendPoints(amount){
        if(tihs.count < amount){
            throw new Error("not enaugh points");
        } else{
            this.count -= parseInt(amount);
        }
    }
    increase(amount){
        this.count += parseInt(amount);
    }
    getPoints(){
        return this.count;
    }
}

class BuyNew{
    constructor(nextCost) {
        this.updateNExtCost(nextCost);
    }
    getNextCost(){
        return this.nextCost;
    }
    updateNExtCost(nextCost){
        this.nextCost = parseInt(nextCost);
    }
}
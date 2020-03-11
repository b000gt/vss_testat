var costStructure = {
    p1: {
        cost : 0,
        give: 1
    },
    p2 : {
        cost: 100,
        give: 3
    },
    p3: {
        cost: 500,
        give: 5
    },
    p4: {
        cost: 1000,
        give: 10
    },
    p5: {
        cost: 2000,
        give: 15
    }
}
var faces = [];
for(var index in costStructure){
    faces.push(new Face("./images/"+index+".jpg", costStructure[index].give));
}
var nextCost = new BuyNew(100);
var points = new Points(1);
let faces = document.getElementsByClassName("face");
for(let i = 0; i < faces.length ; i++){
    faces[i].addEventListener('click', function(){
        let el = this;
        el.classList.add('bouncy');
        setTimeout(function(){
            el.classList.remove('bouncy');
            console.log(el.lastChild.remove());
        }, 200);

        //TODO other function
        let heart = document.createElement('I');
        heart.classList.add('fa', 'fa-heart', 'reaction');
        el.appendChild(heart);
    });
}
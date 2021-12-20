const signin__btn = document.querySelector("#signin__btn");
const signup__btn = document.querySelector("#register__btn");
const container = document.querySelector(".container");

signup__btn.addEventListener('click', () => {
    container.classList.add("signup-mode");
});

signin__btn.addEventListener('click', () => {
    container.classList.remove("signup-mode");
});

const buttons = document.querySelector('#register__btn');

buttons.addEventListener('click', function(e) {

    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    let ripples = document.createElement('span');
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';

    this.appendChild(ripples);

    setTimeout(() => {
        ripples.remove()
    },750);
});


//email validation


// function emailValidation(){
    
//     var emailCheck = document.getElementById("checkEmail").value;
//     var pattern = / ^[A-Za-z]{2,}[1-9]{4,}@[a-z]{3,}[._][a-z]{4,}[._][a-z]{2,}[._][a-z]{2,}$ / ;


//     if(pattern.test(emailCheck)){
//         document.getElementById("alertMsg").innerHTML = "Correct email ";
//     }else{
//         document.getElementById("alertMsg").innerHTML = "Not a valid email ";
//     }
// }


// disable scroll

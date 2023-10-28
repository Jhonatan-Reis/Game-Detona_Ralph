const state={
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector("#live"),
    },
    values:{
        timerId:  setInterval(randomSquare, 850),
        hitposition: 0,
        countdown: setInterval(time, 1000),
        score: 0,
        live: 2,
        cont: 0,
        curretTime:80,
    },
}
function reset(){
    state.values.hitposition= 0
    state.values.score=0
    state.values.cont=0
    state.values.curretTime=80
    state.values.live = 2;
    state.view.live.textContent = `x${state.values.live}`;
    state.view.score.textContent= state.values.score;
    state.view.timeLeft.textContent= state.values.curretTime;

}
function PlaySound(audio_name){
    let audio = new Audio(`audios/${audio_name}`)
    audio.volume = 0.2;
    audio.play()
}
function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let random_number = Math.floor(Math.random()*9)
    let random_square = state.view.squares[random_number]
    random_square.classList.add("enemy")
    state.values.hitposition= random_square.id;
}
function addListenerHitbox(){
    state.view.squares.forEach((squares) =>{
        squares.addEventListener("mousedown", ()=>{
            if(squares.id == state.values.hitposition){
                PlaySound("hit.m4a");
                state.values.score++;
                state.view.score.textContent= state.values.score;
                state.values.cont++;
                if(state.values.cont == 10){
                    state.values.live++;
                    state.view.live.textContent = `x${state.values.live}`;
                    cont = 0;
                }
                state.values.hitposition = null;
            }
            else{
                console.log(state.values.live)
                state.values.live--;
                state.view.live.textContent = `x${state.values.live}`;
                if(state.values.live < 0){
                    alert("GameOver, pontuação final:"+ state.values.score)
                    reset();
                }
            }
        })
    });
}
function initialize(){
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.live.textContent = `x${state.values.live}`;
    state.values.countdown;
    state.values.timerId;
    addListenerHitbox();
}
initialize();
function time(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
    if(state.values.curretTime < 0){
        alert("GameOver, pontuação final:"+ state.values.score)
        reset();
    }

}


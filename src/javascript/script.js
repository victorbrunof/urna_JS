let yourVoteTo = document.querySelector('.d_1_1 span');
let office = document.querySelector('.d_1_2 span');
let description = document.querySelector('.d_1_4');
let warning = document.querySelector('.d_2');
let side = document.querySelector('.d_1_right');
let numbers = document.querySelector('.d_1_3');

let currentStage = 0;
let number = '';
let voteWhite = false;
let votes = [];

function begginerStage() {
    let phase = phases[currentStage];

    let numberHtml= '';
    number = '';
    voteWhite = false;

    for(let i = 0; i < phase.numbers - 1; i++){
        if (i === 0) {
            numberHtml += '<div class="number blink"></div>';
        }
        numberHtml += '<div class="number"></div>';
    }

    yourVoteTo.style.display = 'none';
    office.innerHTML = phase.title;
    description.innerHTML = '';
    warning.style.display = 'none';
    side.innerHTML = '';
    numbers.innerHTML = numberHtml;

}
function updateInterface() {
    let phase = phases[currentStage];
    let candidates = phase.candidates.filter((item)=>{
        if (item.number === number) {
            return true;
        } else {
            return false;
        }
    });
    if (candidates.length > 0) {
        candidates = candidates[0];
        yourVoteTo.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `Nome: ${candidates.name}<br/> Partido: ${candidates.party}`;

        let photosHtml = '';
        for (let i in candidates.photos){
            if (candidates.photos[i].small) {
                photosHtml += `<div class="d_1_image small"><img src="images/${candidates.photos[i].url}" alt="" />${candidates.photos[i].legenda}</div>`;
            } else {
                photosHtml += `<div class="d_1_image"><img src="images/${candidates.photos[i].url}" alt="" />${candidates.photos[i].legenda}</div>`;
            }
        }
        side.innerHTML = photosHtml;
    } else {
        yourVoteTo.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = '<div class="warning_big blink">VOTO NULO</div>'
    }

    console.log("candidato", candidates)
}

function clicked(n) {
    let elNumber = document.querySelector('.number.blink');
    if (elNumber !== null) {
        elNumber.innerHTML = n;
        number = `${number}${n}`;

        elNumber.classList.remove('blink');
        if (elNumber.nextElementSibling !== null) {
            elNumber.nextElementSibling.classList.add('blink');
        } else {
            updateInterface();
        }
    }
}
function white() {
    if (number == '') {
        voteWhite = true;
        yourVoteTo.style.display = 'block';
        warning.style.display = 'block';
        numbers.innerHTML = '';
        description.innerHTML = '<div class="warning_big blink">VOTO EM BRANCO</div>'
    } else {
        alert("Para votar em BRANCO, não pode ter digitado nenhum número!")
    }
}
function correct() {
    begginerStage();
}
function confirm(){
    let phase = phases[currentStage];

    let voteConfirm = false;

    if (voteWhite === true) {
        voteConfirm = true;
        votes.push({
            phase: phases[currentStage].title,
            vote: 'branco'
        });
    } else if (number.length === phase.numbers) {
        voteConfirm = true;        
        votes.push({
            phase: phases[currentStage].title,
            vote: number
        });
    }

    if (voteConfirm) {
        currentStage++;
        if (phases[currentStage] !== undefined) {
            begginerStage();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="warning_giant blink">FIM</div>';
            console.log(votes);
        }
    }
}

begginerStage();
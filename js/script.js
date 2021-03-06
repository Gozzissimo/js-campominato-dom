// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco(attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js / css / con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git). L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
//     con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. : bomba:
//     I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
//     BONUS:
//     1 - quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2 - quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
// Consigli del giorno: : party_wizard:
//     Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
//     Di cosa ho bisogno per generare i numeri ? Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.Le validazioni e i controlli possiamo farli anche in un secondo momento.

const play = document.querySelector('.play');
const grid = document.querySelector('.grid');
const select = document.getElementById('difficulty');
let numMin = 1;
let numMax = 100;



// click sul pulsante play
play.addEventListener('click', function(){

    // condizione di partenza
    grid.innerHTML = '';

    let level = select.value;
    // console.log(level);
    
    //in base al livello sceglgo il numero di celle
    if (level == 'easy') {
        // grid grande
        numMax = 100;
        
    } else if (level == 'medium') {
        // grid media
        numMax = 81;
        
    } else if (level == 'crazy') {
        // grid piccola
        numMax = 49;
    }


    // generazione bombe sulla grid
    let bombe = generateBombs(1, numMax);
    console.log(bombe);



    // creazione div square
    for (let i = numMin; i <= numMax; i++) {
        
        // creare un div
        let squareBox = document.createElement('div');
        
        // dargli la classe square
        squareBox.classList.add('square');

        // larghezza lato in base a grandezza grid
        if (level == 'easy') {
            // grid grande
            squareBox.classList.add('large');

        } else if (level == 'medium') {
            // grid media
            squareBox.classList.add('medium');

        } else if (level == 'crazy') {
            // grid piccola
            squareBox.classList.add('small');
        }

        // inserire il numero all'interno
        squareBox.innerHTML = i;
        
        // click sulle celle
        // colorare di azzurro la cella o rosso se è una bomba
        squareBox.addEventListener('click', function () {
            if (!bombe.includes(i)) {
                this.style.backgroundColor = 'cornflowerblue';
                this.classList.remove

            } else {
                this.style.backgroundColor = 'tomato';
                
                // se viene cliccata una bomba non è più possibile cliccare altro (BONUS)
                let allBoxes = document.querySelectorAll('.square');
                for (let i = 0; i < allBoxes.length; i++) {
                    allBoxes[i].style.pointerEvents = "none";
                }
                
                // se viene cliccata una bomba rivelo tutte le bombe (BONUS ma non funziona)
                bombe.style.backgroundColor = 'tomato';

            }
            
        });
        
        // appendiamo in grid e rendiamola visibile
        grid.classList.add('active');
        grid.appendChild(squareBox);
        
    }
    
});




// FUNZIONI
// generatore di bombe in base a grid
function generateBombs(min, max) {
    const bombs = []

    while (bombs.length < 16) {

        let bomb = Math.floor(Math.random() * (max - min + 1)) + min;

        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    return bombs;
}

// contatore di click
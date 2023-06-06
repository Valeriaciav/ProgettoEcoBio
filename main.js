// console.log('viva la vida');

// EVENTO navIcon

// cattura navIcon
let navIcon = document.querySelector('#navIcon');

// variabile d'appoggio per checkare la condizione
let confirm = false;

// evento 
navIcon.addEventListener('click',()=>{
     
    if(confirm == false){

        navIcon.classList.remove('fa-rotate-180');
        confirm = true;

    }else{

        navIcon.classList.add('fa-rotate-180');
        confirm = false;
    }

})

// evento nBar(scroll =navbar si colora e cambia d'altezza e cambia il logo)

// cattura nBar
let nBar = document.querySelector('#nBar');
// cattura loghi
let logo1 = document.querySelector('.logo1');
let logo2 = document.querySelector('.logo2');

// evento 
window.addEventListener('scroll', ()=>{
     
    if(window.scrollY > 0){

        nBar.classList.remove('bg-transparent');
        nBar.classList.add('background-accent');

        nBar.style.height = '120px';

        logo2.classList.remove('d-none');
        logo1.classList.add('d-none');

    } else {

        nBar.classList.remove('background-accent');
        nBar.classList.add('bg-transparent');

        nBar.style.height = '95px';
        
        logo1.classList.remove('d-none');
        logo2.classList.add('d-none');
    }
})

// chiamata asincrona SET INTERVAL

function createInterval(finalNumber, element){

    let counter = 0;

    let interval = setInterval( ()=>{

        if(counter < finalNumber){

            counter++
            element.innerHTML = counter

        }else{

            clearInterval(interval);
        }
        


    }, 1)
}

createInterval();

// cattura span con numero 0
let firstSpan = document.querySelector('#first-span');
let secondSpan = document.querySelector('#second-span');
let thirdSpan = document.querySelector('#third-span');

// fase invocazione

// createInterval(1000, firstSpan);
// createInterval(1500, secondSpan);
// createInterval(500, thirdSpan);

// INTERACTION OBSERVER()

// catturo
let h2C = document.querySelector('#h2C');

// variabile d'appoggio che fa cessare l'incremento dei numeri
let intersectionCheck = true;

let observed = new IntersectionObserver(
    
    (entries)=>{

        entries.forEach( (entry)=>{

            if(entry.isIntersecting && intersectionCheck == true){
                
                createInterval(1000, firstSpan);
                createInterval(1500, secondSpan);
                createInterval(500, thirdSpan);

                intersectionCheck = false;

            }


        })


    }
)

observed.observe(h2C);

// evento mouse enter
// cattura del camioncino
let camioncini = document.querySelectorAll('.fa-truck-fast');

// cattura delle card
let columns = document.querySelectorAll('.col-custom');

columns.forEach( (colonna, i)=>{
    // alla singola colonna attacco l'evento mouseenter
    colonna.addEventListener('mouseenter', ()=>{

       
        camioncini[i].classList.remove('text-secondaryC');
        camioncini[i].classList.add('text-primaryC');

    })
    colonna.addEventListener('mouseleave', ()=>{

        camioncini[i].classList.remove('text-primaryC');
       camioncini[i].classList.add('text-secondaryC');

 
    })
})



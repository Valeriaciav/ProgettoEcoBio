// console.log('ciaone')

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



// FETCH trasforma .json in un oggetto attraverso il metodo .then()

fetch('./annunciii.json').then( (response)=>response.json() ).then((data)=> {
    // console.log(data);
    // cattura wrapper radio buttons
    let categoryWrapper = document.querySelector('#categoryWrapper');
    // cattura padre delle card annunci
    let cardsWrapper = document.querySelector('#cardsWrapper');


    function setCategoryFilters(){

        let categories = data.map((annuncio)=> annuncio.category);

        let uniqueCategories = [];
    
        categories.forEach( (category)=>{
            if(!uniqueCategories.includes(category)){
                uniqueCategories.push(category);
            }
        })
        // console.log(categories);
        // console.log(uniqueCategories);
        uniqueCategories.forEach((category)=>{

            let div = document.createElement('div');
            div.classList.add('form-check');

            div.innerHTML = `
                     
                         <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}"checked>
                        <label class="form-check-label" for="${category}">
                        ${category}
                        </label>
            
            `;

            categoryWrapper.appendChild(div);
        })
    }

    setCategoryFilters();
    
    // funzione mostra carda
    function showCards(array){

        // svuotamento wrapper
        cardsWrapper.innerHTML = '';

        // ordine crescente delle cards
        array.sort((a, b)=> Number (b.price - a.price));

        array.forEach((element, i)=>{
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-3', 'my-5');
            div.innerHTML = `
                     <div class="announcement-card text-center p-3">

                     <img class="img-card-custom" src="https://picsum.photos/${200 +i}"

                         <h2>${element.name}</h2>
                         <h5 class="colourM">${element.category}</h5>
                         <h4>${element.price} €</h4>
                     </div>
            
            
            
            
            `;

            cardsWrapper.appendChild(div);
            
        })

    }
    showCards(data);

    // funzione filtra per categoria mostra cards al click sul radio button

    function filteredbyCategory(array){

        let categoria = Array.from(checkInputs).find((button)=> button.checked).id;

        console.log(categoria);
        
        if(categoria != 'All'){

            let filtered = data.filter((annuncio)=> annuncio.category == categoria);
            // console.log(filtered);
            return filtered;

        }else{
            // console.log(data);
            return data;
        }
        

    }

    // cattura radio buttons
    let checkInputs = document.querySelectorAll('.form-check-input')

    checkInputs.forEach((checkInput)=>{
         
        checkInput.addEventListener('click', ()=>{
            globalFilter();
        })

    })

    // cattura range input and number;

    let inputPrice = document.querySelector('#inputPrice');

    let incrementNumber = document.querySelector('#incrementNumber');

    // funzione settaggio valore input price massimo

    function setIpuntPrice(){

        let prices = data.map((annuncio)=> Number (annuncio.price));
        console.log(prices);

        let maxPrice = Math.max(...prices);

        inputPrice.max= Math.ceil(maxPrice);

        inputPrice.value = Math.ceil(maxPrice);

        incrementNumber.innerHTML = Math.ceil(maxPrice);


       

    }
    setIpuntPrice();

    // funzione che filtra per prezzo

    function filteredbyPrice(array){
        let filtered = array.filter((annuncio)=> annuncio.price <= +(inputPrice.value) );
              
        return filtered;

    }

    inputPrice.addEventListener('input', ()=>{
        
        incrementNumber.innerHTML = inputPrice.value;
        // console.log(inputPrice.value);
        globalFilter();
        
    })
    // cattura word input per filtro parola
    let wordInput = document.querySelector('#wordInput');
    // funzione filtra parola
    function filteredbyWord(array){

        let nome = wordInput.value;

        let filtered = array.filter ((annuncio)=>annuncio.name.toLowerCase().includes(nome.toLowerCase()));
        
        // console.log(filtered);
        return filtered;

    }

    // filteredbyWord('biotina');

    //   evento digitazione parole
    wordInput.addEventListener('input', ()=>{

        globalFilter();
    })

    // filtro dei filtri, filtro globale
    function globalFilter(){
        let filteredByCategory = filteredbyCategory(data);
        let filterByPrice = filteredbyPrice(filteredByCategory);
        let filteredByWord = filteredbyWord(filterByPrice);
        showCards(filteredByWord);
    
    }

})
 
// fetch annunci con json creato con mockaroo.com

// fetch('./annunci.falsi.json').then(response=>response.json()).then(data=>{
       
//     console.log(data);
// })






    

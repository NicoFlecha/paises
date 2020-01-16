"use strict"

window.onload = () => {
    const body = document.querySelector('body');
    const app = document.getElementById('app');
    const showButton = document.getElementById('show');
    const resetButton = document.getElementById('reset');
    const searchButton = document.getElementById('search');
    const searchBar = document.getElementById('searchBar');
    const container = document.getElementById('container');
    const textContainer = document.createElement('div');

    body.style.height = "100vh";
    
    resetButton.classList.toggle('hide');
    searchBar.classList.toggle('hide');
    
    textContainer.classList.add('textContainer');

    showButton.addEventListener('click', () => {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(countries => renderCountries(countries));
        showButton.classList.toggle('hide');
        resetButton.classList.toggle('hide');
    })

    const renderCountries = countries => {
        container.innerHTML = "";
        if (countries.status == 404) {
            container.innerHTML = "";
            container.appendChild(textContainer);
            textContainer.innerText = "Ningún país coincide con la búsqueda."
        } else {
            countries.map(countrie => {
                let countrieContainer = document.createElement('div');
                let flag = document.createElement('img');
                let countrieText = document.createElement('div');
                let title = document.createElement('h2');
                let city = document.createElement('p');
                let population = document.createElement("p");
    
                countrieContainer.classList.add('countrie');
                countrieText.classList.add('countrieText');
    
                title.classList.add('title');
                title.innerHTML = countrie.name;
                
    
                flag.classList.add('flag');
                flag.src = countrie.flag;
    
                city.classList.add('city');
                city.classList.toggle('hide');
                city.innerText = `Capital: ${countrie.capital}`;
                if (!countrie.capital) {
                    city.innerText = "Sin Capital";
                }

                population.classList.add('population');
                population.classList.toggle('hide');
                population.innerText = `Población: ${countrie.population}`;

                container.appendChild(countrieContainer);
                countrieContainer.appendChild(flag);
                countrieContainer.appendChild(countrieText);
                countrieText.appendChild(title);
                countrieText.appendChild(city);
                countrieText.appendChild(population);
    
                countrieContainer.addEventListener('click', () => {
                    city.classList.toggle('hide');
                    population.classList.toggle('hide');
                })
            })
            if (body.offsetHeight < window.innerHeight) {
                body.style.height = "100vh";
            } else {
                body.style.height = "100%";
            }
        }
    }

    searchButton.addEventListener('click', () => {
        if (searchButton.innerText == "Cancelar") {
            container.innerHTML = "";
            showButton.classList.remove('hide');
            searchButton.innerText = "Hacé clic para buscar algún país";
            searchBar.value = "";
        } else {
            searchButton.innerText = "Cancelar";
            showButton.classList.add('hide');
            resetButton.classList.add('hide');
        }
        searchBar.classList.toggle('hide');
        searchBar.addEventListener('keyup', () => {
            let busqueda = searchBar.value;
            busqueda = busqueda.trim();
            if (busqueda.length > 1) {
                fetch(`https://restcountries.eu/rest/v2/name/${busqueda}`)
                    .then(response => response.json())
                    .then(results => renderCountries(results))
            } else if (busqueda.length == 0) {
                container.innerHTML = "";
                container.appendChild(textContainer);
                textContainer.innerText = "Escriba algo para empezar a Buscar."
            }
        })
    })


    resetButton.addEventListener('click', () => {
        if (!searchBar.classList.contains('hide')) {
            searchBar.classList.add('hide');
        }
        container.innerHTML = "";
        showButton.classList.toggle('hide');
        resetButton.classList.toggle('hide');
    })
}

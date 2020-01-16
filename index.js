"use strict"

window.onload = () => {
    const app = document.getElementById('app');
    const showButton = document.getElementById('show');
    const resetButton = document.getElementById('reset');
    const searchButton = document.getElementById('search');
    const searchBar = document.getElementById('searchBar');
    const container = document.getElementById('container');

    resetButton.classList.toggle('hide');
    searchBar.classList.toggle('hide');

    showButton.addEventListener('click', () => {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(countries => renderCountries(countries));
    })

    const renderCountries = countries => {
        container.innerHTML = "";
        countries.map(countrie => {
            let countrieContainer = document.createElement('div');
            let title = document.createElement('h2');
            let flag = document.createElement('img');
            let city = document.createElement('p');

            countrieContainer.classList.add('countrie');

            title.classList.add('title');
            title.innerHTML = countrie.name;
            

            flag.classList.add('flag');
            flag.src = countrie.flag;

            city.classList.add('city');
            city.classList.toggle('hide');
            city.innerText = countrie.capital;
            if (city.innerText == "") {
                city.innerText = "Sin Capital";
            }
            
            container.appendChild(countrieContainer);
            countrieContainer.appendChild(flag);
            countrieContainer.appendChild(title);
            countrieContainer.appendChild(city);

            countrieContainer.addEventListener('click', () => {
                city.classList.toggle('hide');
            })
        })
        showButton.classList.toggle('hide');
        resetButton.classList.toggle('hide');
    }

    searchButton.addEventListener('click', () => {
        searchButton.innerText = "Cancelar"
        searchBar.classList.toggle('hide');
        searchBar.addEventListener('keyup', () => {
            let busqueda = searchBar.value;
            busqueda = busqueda.trim();
            if (busqueda.length > 1) {
                fetch(`https://restcountries.eu/rest/v2/name/${busqueda}`)
                    .then(response => response.json())
                    .then(results => {
                            renderCountries(results);
                    })
            } else if (busqueda.length == 0) {
                fetch(`https://restcountries.eu/rest/v2/all`)
                    .then(response => response.json())
                    .then(results => {
                            renderCountries(results);
                    })
            }
        })
    })


    resetButton.addEventListener('click', () => {
        let container = document.querySelector('#container');
        app.removeChild(container);
        showButton.classList.toggle('hide');
        resetButton.classList.toggle('hide');
    })
}
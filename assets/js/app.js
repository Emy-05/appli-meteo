// température par défaut de Paris en appelant la fonction appelApi (pour éviter qu'il n'y ait aucune information au lancement)
appelApi("Paris");



function appelApi(ville) {
    const apikey = "7b45a165f1700d414f848511c4e1afab";
    const url = "https://api.openweathermap.org/data/2.5/weather?&q=" + ville + "&appid=" + apikey + "&units=metric&lang=fr";
    //console.log (url) pour vérifier que l'url fonctionne avec la concaténation

    // création de la requête
    let requete = new XMLHttpRequest();
    requete.open("GET", url);
    requete.responseType = "json";
    requete.send();

    //vérification réponse reçue & que tout s'est bien passé
    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = requete.response;
                // console.log(reponse); vérification réponse json reçue 
                let temperature = reponse.main.temp;
                let ville = reponse.name;
                let pays_ville = reponse.sys.country;
                let description_du_temps = reponse.weather[0].description;
                let temp_min = reponse.main.temp_min;
                let temp_max = reponse.main.temp_max;
                /*console.log(ville);
                console.log(description_du_temps);
                console.log(icon);
                console.log(pays_ville);*/
                document.querySelector("#nom_ville").textContent = ville;
                document.querySelector("#pays").textContent = pays_ville;
                document.querySelector('#icone').src = "http://openweathermap.org/img/w/" + reponse.weather[0].icon + ".png";
                document.querySelector("#temperature_ville").textContent = temperature;
                document.querySelector("#description_temp").textContent = description_du_temps;
                document.querySelector("#temp_min").textContent = temp_min;
                document.querySelector("#temp_max").textContent = temp_max;
            }
            else {
                alert("Une erreur est survenue, veuillez vérifier et réessayer. Sinon merci de retester plus tard.");
            };
            // on écoute le bouton submit en cas de changement de ville
            document.querySelector("form").addEventListener("submit", function (e) {
                e.preventDefault();
                let ville = document.querySelector("#recherche_ville").value;

                appelApi(ville);
            });
        }
    }
};

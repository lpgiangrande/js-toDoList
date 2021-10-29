// TO DO LIST en JS
// 1 event au clic submit
// 1 fonction rajouterUneTache(text) qui prend en param text lui-même définit par la valeur entrée dans l'input
// cette fonction contient l'objet "todo" qui contient le txt + l'id
// 1 fonction afficherListe(todo) prend en param l'objet todo
// Cette fonction créer un "li" (item) dans le dom, lié à l'id correspondant de todo, avec 1 input checkbox,
// un span avec le txt, un bouton avec icone pour supprimer
// On ajoute la tâche au [] "toutesLesTaches"
// 1 fonction tacheFaite(e) au clic sur le checkbox ajoute la classe qui raye la tâche

// Récupérer les données

// On sélectionne
const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
let toutesLesTaches = [];

form.addEventListener('submit', event => {
    event.preventDefault();    // Pour ne pas rafraîchir la page et pouvoir utiliser nos données en local(pas d'envoi)

    const text = input.value.trim(); // trim = enlève les espaces avant et après le texte
    if(text !== ''){ // Si l'utilisateur a renseigné une tâche
        rajouterUneTache(text); //Appel de méthode pour ajout tâche avec le texte 
        input.value = ''; // cleaner l'input
    }
})

function rajouterUneTache(text){

    //objet représentatif d'une tâche. Contient texte + date pour l'id
    const todo = {
        text,
        // La méthode Date.now() renvoie le nb de millisecondes écoulées depuis le 1er janvier 1970
        id: Date.now() 
    }
    afficherListe(todo); // permet de rajouter la tâche à la liste, définit ci après :
}

function afficherListe(todo){ // on lui passe l'objet "todo"
    
    // item avec input checkbox et bouton avec texte

    const item = document.createElement('li');
    item.setAttribute('data-key', todo.id); //data-key = clé , représente todo.id

    //Animation du check,  création d'éléments dans le DOM :  

    const input = document.createElement('input'); // on créer l'input
    input.setAttribute('type', 'checkbox'); // On lui met un attribut de type checkbox
    //Ajout d'évenement au clic sur checkbox pour déclencher la fonction qu'on appellera tacheFaite
    input.addEventListener('click', tacheFaite);
    item.appendChild(input); // On lui rajoute cet input qu'on vient de créer

    // il faut du txt dans cette tâche
    const txt = document.createElement('span');
    txt.innerText = todo.text;
    item.appendChild(txt);

    const btn = document.createElement('button');
    btn.addEventListener('click', supprimerTache);
    const img = document.createElement('img');
    img.setAttribute('src', 'ressources/fermer.svg');
    btn.appendChild(img);
    item.appendChild(btn);

    liste.appendChild(item);
    toutesLesTaches.push(item);
}

function tacheFaite(e){
    e.target.parentNode.classList.toggle('finDeTache');
    //Si on clic sur l'input checkbox, cela toggle une classe 'finDeTache' 
    //(qui correspond à une animation line through) sur le parent (li)
}

// Fonction pour supprimer une tâche au clic du bouton supp

// si les id sont similaires, j'enlève l'élément du DOM
function supprimerTache(e){

    toutesLesTaches.forEach(el => {
        
        //e.target = parent
        
        if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
            el.remove(); // enlevé du DOM
            toutesLesTaches = toutesLesTaches.filter(li => li.dataset.key !== el.dataset.key); 


            //enlevé du tableau de tâches :
            // garde tous les id strictement différents de celui qu'on vient de retirer
            // Retourne un tab de tous les li conservés
        }
    })
}
//récupèration du contenu du paramètre pour confirmer que nous avons une orderId
const orderId = new URL(window.location.href).searchParams.get("id");
console.log(orderId);

let confirmationId = document.getElementById('orderId')

confirmationId.innerText = orderId
//nous nettoyons le localStorage pour que l'orderId ne se garde pas
localStorage.clear();


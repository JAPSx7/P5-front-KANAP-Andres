
var xmlhttp = new XMLHttpRequest();
// récupérer les produits par son id et le stocker dans product
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
            let productImg = "";
            let product = JSON.parse(xmlhttp.responseText);
            console.log(product);
            // affiche dans le page HTML le produit de maniere dynamique
            productImg =
                '<img src="' +
                product.imageUrl +
                '" alt="' +
                product.altTxt +
                '"></img>';
            document.getElementById("itemimg").innerHTML = productImg;
            document.getElementById("description").innerHTML = product.description;
            document.getElementById("price").innerHTML = product.price;
            document.getElementById("title").innerHTML = product.name;

            CommandButton(product);
            itemColor =
                '<option value="" selected>--SVP, choisissez une couleur --</option>';
            product.colors.forEach(function (color) {
                itemColor += '<option value="' + color + '">' + color + "</option>";
            });
            document.getElementById("colors").innerHTML = itemColor;
        } else if (xmlhttp.status == 400) {
            alert("There was an error 400");
        } else {
            alert("something else other than 200 was returned");
        }

        // appeler la fonction qui va récupérer les données, et l'eventListener(click)
        function CommandButton(product) {
            const button = document.getElementById("addToCart");
            button.addEventListener("click", function () {
                let cartContent = JSON.parse(localStorage.getItem("cartContent"));
                let quantity = parseInt(document.getElementById("quantity").value);
                product.color = document.getElementById("colors").value;
                if (cartContent === null) {
                    cartContent = [];
                    let produit = saveProducForStorage(product, quantity);
                    console.log(produit);

                    //ajouter au tableau cartContent le nouveau produit
                    if (product.color != "") {

                        cartContent.push(produit);
                        saveCart(cartContent);
                    }
                    else { alert("choisissez une couleur") }

                } else {
                    let p = cartContent.find((c) => c.id === product._id && c.color === product.color);
                    if (p != undefined) {
                        if (product.color != "") {
                            p.nombre += parseInt(quantity);
                            saveCart(cartContent);
                        }
                        else { alert("choisissez une couleur") }
                    } else {
                        if (quantity > 0) {
                            let produit = saveProducForStorage(product, quantity);
                            console.log(produit);
                            if (product.color != "") {
                                cartContent.push(produit);
                                saveCart(cartContent);
                            }
                            else { alert("choisissez une couleur") }
                        }
                    }
                }
            });
        }
        //sauvegarder le tableau des produits dans le localstorage
        function saveProducForStorage(product, quantity) {
            return {
                name: product.name,
                price: product.price,
                id: product._id,
                color: product.color,
                nombre: quantity,
            };
        }

        function saveCart(cartContent) {
            localStorage.setItem("cartContent", JSON.stringify(cartContent));
        }
    }
};

xmlhttp.open(
    "GET",
    "http://localhost:3000/api/products/" + window.location.href.split("=")[1]
);
xmlhttp.send();
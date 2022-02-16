var xmlhttp = new XMLHttpRequest();

// Récupération des articles de l'API
xmlhttp.open("GET", "http://localhost:3000/api/products");
xmlhttp.send();

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);

            // Insertion de l'élément, article, image, h3, p 
            let result = "";
            let products = JSON.parse(xmlhttp.responseText);
            products.forEach(
                function (product, index) {
                    result += '<a href="./product.html?id=' + product._id + '">' +
                        '<article>' +
                        '<img src="' + product.imageUrl + '" alt="' + product.altTxt + '">' +
                        '<h3 class="productName">' + product.name + '</h3>' +
                        '<p class="productDescription">' + product.description + '</p> </article></a>';
                }
            );

            document.getElementById("items").innerHTML = result;
        }
        //errors alert
        else if (xmlhttp.status == 400) {
            alert('There was an error 400');
        }
        else {
            alert('something else other than 200 was returned');
        }
    }
}





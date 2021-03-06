function getResults2(request, response) {
    var source =  $("#price").val();
    var skin_id = $("#skin").val();
    
    console.log("Searching for data..");    

    $.get("/getResults?price=" + source + "&skin=" + skin_id, function(data, status) {

        console.log("Back from server with the following results:")
        console.log(status);
        console.log(data);

        var resultsD = $("#results");

        for (let row of data)
            {
                resultsD.append(
                '<div class="w3-col l3 s6">' +
                '<div class="w3-container">' +
                '<img src="' + row['image'] + '" alt="alt text"  width="100%" />' +
                ' ' + row['brand'] +
                ' ' + row['product_name'] +
                ' $' + row['price'] +
                "<br/>" +
                "</div>" +
                "</div>"
                );
            }
    
    });

}


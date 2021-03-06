var animals = ["Cat","Dog","Elephant","Snakes","Horse","Bear","Whale","Panda","Dolphin"];


$(document).on("click", ".gif", function () {
    console.log("im clicked");
    var state = $(this).attr("data-state");
    var stillurl=$(this).attr("data-still");
    var animateurl=$(this).attr("data-animate");     
    if (state === "animate") {
        $(this).attr("src", stillurl);
        $(this).attr("data-state", "still");

    }
    else{
        $(this).attr("src", animateurl);
        $(this).attr("data-state", "animate");
    }


});
$(".btn-submit").on("click", function (event) {
    event.preventDefault();
    var animal = $("#Animal-input").val().trim();
    animals.push(animal);
    renderbuttons();
});

function renderbuttons() {
    $("#buttons-view").empty();
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("btn-animal btn-primary");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}

renderbuttons();
function displaygiphy() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&offset=0&rating=G&lang=en&api_key=k8LPY8A1uvrb8nSlB7CrB5Al9j03OOvI";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        var resultlist = response.data;
        console.log(resultlist);
        for (var i = 0; i < resultlist.length; i++) {
            var gifdiv = $("<div>");
            gifdiv.addClass("col-sm-3");
            var p = $("<p>");
            var rating = p.text("Rating :" + resultlist[i].rating);
            console.log(resultlist[i].rating);
            var imgurl = resultlist[i].images.original.url;
            var stillurl = resultlist[i].images.original_still.url;
            var gif = $("<img>");
            gif.addClass("gif");            
            gif.attr("data-state", "still");
            gif.attr("src", stillurl);
            gif.attr("data-still", stillurl);
            gif.attr("data-animate",imgurl);
            gifdiv.append(rating);
            gifdiv.append(gif);
            $("#giphy-list").prepend(gifdiv);
        }

      

    });
}



$(document).on("click", ".btn-animal", displaygiphy);
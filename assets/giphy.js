var topics = [];

$(".btn-submit").on("click", function (event) {
    event.preventDefault();
    var animal = $("#Animal-input").val().trim();
    topics.push(animal);
    renderbuttons();
});

function renderbuttons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

function displaygiphy() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=25&offset=0&rating=G&lang=en&api_key=k8LPY8A1uvrb8nSlB7CrB5Al9j03OOvI";
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
            var gif = $("<img>");
            gif.addClass("gif");
            gif.attr("data-state", "animate");
            gif.attr("src", imgurl);
            gifdiv.append(rating);
            gifdiv.append(gif);
            $("#giphy-list").prepend(gifdiv);


            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "animate") {
                    var stillurl =resultlist[i].images.original_still.url;
                    $(this).attr("src",stillurl);
                    $(this).attr("data-state","still");

              }



            });
        }

    });
}



$(document).on("click", ".animal", displaygiphy);
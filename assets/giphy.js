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

        var div=$("<div>");
        div.addClass("giphy-list");
        console.log(response);
        var rating=$("<p>").text("Rating"+response.data[0].rating);
        console.log(response.data[0].rating);
        div.append(rating);
        $(".giphylist").prepend(div);
    });
}

$(document).on("click",".animal",displaygiphy);
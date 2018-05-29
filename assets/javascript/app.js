$(document).ready(function() {
    var baseURL = "http://api.giphy.com/v1/gifs/search?api_key=hGFuesSai3UP90QLzwIsd6liTapHXtQy&limit=10&q=";
    
    //Buttons to make
    var categories = ["dog", "cat", "horse", "parrot", "hamster", "pig", 
    "goat", "cow", "bunny", "lizard", "fish", "chicken"];

    categories.forEach( function (category){
        var button = $("<button>").text(category);
        button.addClass("animal-button");
        $("#buttons").append(button);
    });

    $("#buttons").on("click", ".animal-button", function(){
        $("#gifs").empty();
        var animal = $(this).text();
        $.ajax({
            url: baseURL + animal,
            method: "GET"
        }).then(function (response){

            response.data.forEach( function (result){

                var gif = $("<img src="+result.images.fixed_height.url+">");
                gif.addClass("gif");
                gif.attr("state", "animate");
                gif.attr("still", result.images.fixed_height_still.url);
                gif.attr("animate", result.images.fixed_height.url);

                $("#gifs").append(gif);
            });
            
        });
    });

    function changeState(obj){
        if (obj.attr("state") === "still"){
            console.log("Was still");
            obj.attr("src", obj.attr("animate") );
            obj.attr("state", "animate");
        }
        else{
            console.log("Was animated");
            obj.attr("src", obj.attr("still") );
            obj.attr("state", "still");
        }
    }


    $("#gifs").on( "click", ".gif", function(){
        changeState( $(this) );
    });

    $("#submit").on("click", function(){
        $("#buttons").append( $("<button>").text( $("#animal-to-add").val() ) )
    });

});

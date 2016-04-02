/**
 * Created by Andrew on 4/2/2016.
 */
var ShowMenu = false;

function clickedMenu(){
    if(!ShowMenu){
        $(".menu").load("menu.html");
        ShowMenu = !ShowMenu;
    }
    else{
        $(".menu").html("");
        ShowMenu = !ShowMenu;
    }
}

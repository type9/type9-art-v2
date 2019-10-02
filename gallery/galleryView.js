//GLOBALS
var DEBUG = true;

var imgNameVar = "imgName";
var INFODIR = "info/";
var INFOFILEEXT = ".json";
var TARGETCONTAINER = "gallery";
var galleryDIR = "/art/gallery/";

//MAIN - ON LOAD
$(document).ready(function(){

	var imgFileName = getQueryVariable(imgNameVar);
	//takes out extension
	var imgName = imgFileName.replace(/\.[^/.]+$/, "");
	if(DEBUG){
		console.log("Obtained imgName: " + imgName);
	}
	//Retrieves .json object data from imgName
	$.get(INFODIR + imgName + INFOFILEEXT,function(data, status){
			var imgObject = data;
			if(DEBUG){
				console.log("Image Data Retrieved: " + imgObject);
			}
			buildGalleryView(imgObject);
	});
});
//FUNCTIONS

//Credits to https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
	   }
	   return(false);
}

function buildGalleryView(imgObject){
	$("#media_image").attr("src", galleryDIR + imgObject.fileName);
	$("#title").prepend(imgObject.title);
	$("#caption").append(imgObject.caption);
	$("#description").append(imgObject.description);
	$("#date").append(imgObject.date);
}
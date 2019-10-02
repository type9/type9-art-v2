//GLOBALS
var DEBUG = true;

var IMAGEDIR = "gallery/thumb/";
var INFODIR = "gallery/info/";
var INFOFILEEXT = ".json";
var TARGETCONTAINER = "gallery";
var TARGETPHPSCRIPT = "getGalleryImages.php";
var galleryCard_IDTemplate_Indicator = "_";
var galleryCard_IDTemplate = "gallerycard" + galleryCard_IDTemplate_Indicator; 
var galleryDIR = "/art/gallery/";

//MAIN - ON LOAD
$(document).ready(function(){
	//Finds the list of info files for images currently present
	$.get(TARGETPHPSCRIPT,function(data, status){
			var galleryImages = JSON.parse(data);
			if(DEBUG){
				console.log("Gallery Data Retrieved: " + galleryImages);
			}

			buildGallery(createImageGalleryArray(galleryImages));
			
	});
});
//GALLERYCARD - ON CLICK
// $("#gallery").on("click", "div.gallerycard", function(){
// 	//Obtains image name from divID
// 	var cardID = $(this).attr("id");
// 	var imgName = cardID.replace(galleryCard_IDTemplate, "");
// 	if(DEBUG){
// 		console.log("Obtained cardID by click: " + cardID);
// 		console.log("Extracted image name through ID: " + imgName);
// 	}
// 	//Links to gallery index with img name as query variable
// 	window.location = galleryDIR + "?imgName=" + imgName;
// });

//FUNCTIONS
//builds 2D array of image file names and their respective titles
function createImageGalleryArray(galleryImages){
	var galleryLength = galleryImages.length;
	var imageGalleryArray = new Array(galleryLength);

	for(var x = 0; x < galleryLength; x++){
		var temp = new Array(2);
		temp[0] = galleryImages[x].fileName;
		temp[1] = galleryImages[x].title;

		imageGalleryArray[x] = temp;
	}

	if(DEBUG){
		console.log("createImageGalleryArray:\n" + imageGalleryArray);
	}	
	return imageGalleryArray;
}

function buildGallery(imageGalleryArray) {
	console.log("Starting gallery build with length " + imageGalleryArray.length);
	//iterate for each image listed in the array
	for(var x = 0; x < imageGalleryArray.length; x++){
		var imageName = imageGalleryArray[x][0];
		var imageCaption = imageGalleryArray[x][1];
		buildGallerycard(imageName,imageCaption);
	}
}

//Card Builder
function buildGallerycard(imageName,imageCaption){
	var imagePath = IMAGEDIR + imageName;
	var divID = galleryCard_IDTemplate + imageName;
	//Arbitrary format of each galleryCard is dictated here
	$('#gallery').prepend("<a href='" + galleryDIR + "?imgName=" + imageName + "'><div class='gallerycard' id='" + divID + "' style='background-image:url(" + imagePath + ");'><div class='gallerycard_overlay'><div class='container-fluid gallerycard_caption'>" + imageCaption + "</div></div></div></a>");
	if(DEBUG){
		console.log("Built galleryCard(" + imageName + ", " + imageCaption + ")");
	}
}
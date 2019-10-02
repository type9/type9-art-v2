<?php

$TARGETDIR = 'gallery/info/';

foreach(glob($TARGETDIR.'*.{json}',GLOB_BRACE) as $filename){
	$targetFile = $TARGETDIR.basename($filename);

	$imgData = fopen($targetFile,"r") or die("Unable to open ".$targetFile);
	$galleryImages[] = json_decode(fread($imgData,filesize($targetFile)));
	fclose($imgData);
}

$galleryImages_js = json_encode($galleryImages);
echo $galleryImages_js;

?>
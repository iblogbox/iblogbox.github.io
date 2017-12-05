<?
/*
if (window['google'] != undefined && window['google']['loader'] != undefined) {
if (!window['google']['search']) {
window['google']['search'] = {};
google.search.Version = '1.0';
google.search.NoOldNames = false;
google.search.JSHash = '01d3e4019d02927b30f1da06094837dc';
google.search.LoadArgs = 'file\x3dsearch\x26v\x3d1\x26hl\x3den\x26style\x3d%2F%2Fwww.google.com%2Fcse%2Fstatic%2Fstyle%2Flook%2Fgreensky.css';
}
google.loader.writeLoadTag("css", google.loader.ServiceBase + "/api/search/1.0/01d3e4019d02927b30f1da06094837dc/default+en.css", false);
google.loader.writeLoadTag("css", "//www.google.com/cse/static/style/look/greensky.css", false);
google.loader.writeLoadTag("script", google.loader.ServiceBase + "/api/search/1.0/01d3e4019d02927b30f1da06094837dc/default+en.I.js", false);
}

https://www.google.com/uds/?file=search&v=1&hl=en&style=%2F%2Fwww.google.com%2Fcse%2Fstatic%2Fstyle%2Flook%2Fgreensky.css
*/

$style=$_GET["style"];
//echo $_SERVER['QUERY_STRING'];
$LoadArgs=$_SERVER['QUERY_STRING'];
$LoadArgs=str_replace("=","\\x3d",$LoadArgs);
$LoadArgs=str_replace("&","\\x26",$LoadArgs);

?>
if (window['google'] != undefined && window['google']['loader'] != undefined) {
if (!window['google']['search']) {
window['google']['search'] = {};
google.search.Version = '1.0';
google.search.NoOldNames = false;
google.search.JSHash = '01d3e4019d02927b30f1da06094837dc';
google.search.LoadArgs = '<?=$LoadArgs?>';
}
google.loader.writeLoadTag("css", google.loader.ServiceBase + "/api/search/1.0/01d3e4019d02927b30f1da06094837dc/default+en.css", false);
<?if(strpos($style, "greensky.css")!==false){?>
google.loader.writeLoadTag("css", google.loader.ServiceBase + "/greensky.css", false);
<?}?>
google.loader.writeLoadTag("script", google.loader.ServiceBase + "/api/search/1.0/01d3e4019d02927b30f1da06094837dc/default+en.I.js", false);
}

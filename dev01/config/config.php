<?php

// エラーチェック *公開時はコメントアウト
// ini_set('display_errors', 1);
// ini_set('error_reporting', E_ALL);


// URL
$url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER["REQUEST_URI"];


// Directory settings
$search = (strpos($url, '/search/') !== false);
$pickup = (strpos($url, '/pickup/') !== false);


if ($pickup) {
  $index = false;
  $path = '../..';
  $path2 = '../../';
} else if ($search) {
  $index = false;
  $path = '..';
  $path2 = '../';
} else {
  $index = true;
  $path = '.';
  $path2 = '';
}




// create_path
$path_css = $path . '/assets/build/css';
$path_js = $path . '/assets/build/js';
$path_img = $path . '/assets/build/img';
$path_video = $path . '/assets/video';
$path_lib = $path . '/assets/lib';

// Site information
$title = "";

$description = "";
$keywords = "";


// user_agent
$user_agent = $_SERVER['HTTP_USER_AGENT'];
if (preg_match('/iphone|ipod|ipad|android/ui', $user_agent) != 0) {
  $user_agent = "sp";
} else {
  $user_agent = "pc";
}

$browser = strtolower($_SERVER['HTTP_USER_AGENT']);
if (strstr($browser, 'edge')) {
  $browser = "edge";
} elseif (strstr($browser, 'trident') || strstr($browser, 'msie')) {
  $browser = "ie";
} elseif (strstr($browser, 'chrome')) {
  $browser = "chrome";
} elseif (strstr($browser, 'firefox')) {
  $browser = "firefox";
} elseif (strstr($browser, 'safari')) {
  $browser = "safari";
} elseif (strstr($browser, 'opera')) {
  $browser = "opera";
} else {
  $browser = "none";
}


// echo_function
function h($s)
{
  return htmlspecialchars($s, ENT_QUOTES, "UTF-8");
}



function getBaseUrl()
{
  $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
  $host = $_SERVER['HTTP_HOST'];

  $scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');

  return $protocol . $host . $scriptDir . '/';
}



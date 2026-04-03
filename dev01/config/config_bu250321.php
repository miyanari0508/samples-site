<?php

// エラーチェック *公開時はコメントアウト
// ini_set('display_errors', 1);
// ini_set('error_reporting', E_ALL);


// URL
$url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER["REQUEST_URI"];

//ぱすわーど
$pw_honatsugi = "09AD526EBBF6ECBF6AEDEAC8E67FB0ED"; // hon112
$pw_honatsugi2 = "D0D00CA108CA0566E0BB3BF8D584B8A6"; // rhon112

// Directory settings

$limited = (strpos($url, '/limited/') !== false);
$limited_gallery = (strpos($url, '/limited/gallery.php') !== false);

$search = (strpos($url, '/search/index.php') !== false) || (strpos($url, '/search/') !== false);
$design = (strpos($url, '/design.php') !== false);
$urbanstyle = (strpos($url, '/urban-style.php') !== false);
$outline = (strpos($url, '/outline.php') !== false);
$accessmap = (strpos($url, '/accessmap.php') !== false);
$position = (strpos($url, '/position.php') !== false);
$location = (strpos($url, '/location.php') !== false);
$residence = (strpos($url, '/residence.php') !== false);
$plan = (strpos($url, '/plan.php') !== false);
$type = (strpos($url, '/type/') !== false);
$type_a = (strpos($url, '/type/type-a.php') !== false);
$type_b = (strpos($url, '/type/type-b.php') !== false);
$type_c = (strpos($url, '/type/type-c.php') !== false);
$type_d = (strpos($url, '/type/type-d.php') !== false);
$type_e = (strpos($url, '/type/type-e.php') !== false);
$type_f = (strpos($url, '/type/type-f.php') !== false);
$type_g = (strpos($url, '/type/type-g.php') !== false);
$type_h = (strpos($url, '/type/type-h.php') !== false);
$brand = (strpos($url, '/brand.php') !== false);
$quality = (strpos($url, '/quality.php') !== false);
$access = (strpos($url, '/access.php') !== false);
$modelroom = (strpos($url, '/modelroom.php') !== false);


if (
  ($limited || $type || $limited_gallery || $search)
) {
  $index = false;
  $path = '..';
  $path2 = '../';
} else if (
  ($design || $urbanstyle || $outline || $accessmap || $position || $location || $residence || $plan || $brand || $access || $modelroom || $quality)
) {
  $index = false;
  $path = '.';
  $path2 = './';
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


// external_url
const PUBLIC_PATH = "https://www.m-cd.co.jp/sumai/mansion/syuto/sinki/meitsu-h112/"; //公開パス
const LINK_REQUEST = "https://www.m-cd.co.jp/sumai/mansion/syuto/sinki/form/meitsu-h112/request/"; //資料請求
const LINK_RESERVE = "https://www.m-cd.co.jp/sumai/mansion/syuto/sinki/form/meitsu-h112/reserve/"; //来場予約
const LINK_TEL = "tel:0120-112-194"; //電話番号

// Site information
$title = "";
if ($accessmap) {
  $title = "" . $title;
}
$description = "「本厚木」駅徒歩5分に誕生する名鉄都市開発の新築分譲マンションメイツ本厚木の公式ホームページ。全邸南東向きの心地よい陽光の解放感。本厚木駅前エリアに、利便と快適を追求した都市型レジデンス、誕生。";
$keywords = "メイツ,MEITSU,本厚木,名鉄都市開発,長谷工アーベスト,新築,分譲,マンション";
$og_site_name = "";
$og_title = $title;
$og_description = $description;
if ($index) {
  $og_type = "website";
} else {
  $og_type = "article";
}
$og_locale = "ja_JP";
$og_url = $url;
$og_img = PUBLIC_PATH . "assets/build/img/common/og_image.png"; /* 1200*630 */
$favicon = PUBLIC_PATH . "assets/favicons/favicon.ico";
$apple_icon = PUBLIC_PATH . "assets/favicons/apple-touch-icon-180x180.png";
$android_icon = PUBLIC_PATH . "assets/favicons/icon-192x192.png";


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



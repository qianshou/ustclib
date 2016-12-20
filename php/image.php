<?php
/**
 * Created by PhpStorm.
 * User: zhezhao
 * Date: 2016/12/15
 * Time: 22:42
 */
header('Content-type: image/jpg');
$cookie_file = "tmp.cookie";
$login_url = "http://opac.lib.ustc.edu.cn/reader/redr_verify.php";
$verify_code_url = "http://opac.lib.ustc.edu.cn/reader/captcha.php";

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $verify_code_url);
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl,CURLOPT_COOKIEJAR,$cookie_file);  //获取COOKIE并存储
$img = curl_exec($curl);
curl_close($curl);
echo $img;
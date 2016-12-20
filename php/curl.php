<?php
/**
 * Created by PhpStorm.
 * User: zhezhao
 * Date: 2016/12/15
 * Time: 22:51
 */

$number = $_POST['number'];
$passwd = $_POST['passwd'];
$captcha = $_POST['captcha'];

$cookie_file = "tmp.cookie";
$login_url = "http://opac.lib.ustc.edu.cn/reader/redr_verify.php";
$post_file = "number=$number&passwd=$passwd&captcha=$captcha&select=bar_no";

//登陆判断
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $login_url);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_file);
curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie_file);
$result=curl_exec($curl);
curl_close($curl);

//查看个人信息
$url = "http://opac.lib.ustc.edu.cn/reader/book_lst.php";
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie_file);
$result=curl_exec($curl);
curl_close($curl);
echo $result;
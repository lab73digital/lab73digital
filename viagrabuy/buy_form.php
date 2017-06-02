<?php
$dosage = $_POST["dosage"];
$packing = $_POST["packing"];
$delivery = $_POST["delivery"];
$pay = $_POST["pay"];
$tel = $_POST["tel"];
$price = $_POST["price"];

$myemail = "potencia.shop@ukr.net";

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$message_to_myemail = "<b>Дозировка:</b> $dosage мг<br>
<b>Фасовка:</b> $packing табл.<br>
<b>Способ доставки:</b> $delivery<br>
<b>Оплата:</b> $pay<br>
<b>Номер телефона:</b> +380 $tel<br>
<b>Сумма заказа:</b> $price грн.";
mail($myemail, "Регистрация на http://potencia.shop/", $message_to_myemail, $headers);
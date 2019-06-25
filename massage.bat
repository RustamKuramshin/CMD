@ECHO OFF

TITLE РАССЫЛКА ОПОВЕЩЕНИЙ ДЛЯ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ОФИСА

cls
 
set /p var="Отправить сообщение: "
net send /DOMAIN:ROSTOVFARM %var%



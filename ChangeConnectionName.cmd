@echo off
chcp 1251 > nul
netsh interface set interface name = "Подключение по локальной сети" newname = "LAN" > nul

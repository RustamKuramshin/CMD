@echo off

net stop "Zabbix Agent"

sc delete "Zabbix Agent"

pause

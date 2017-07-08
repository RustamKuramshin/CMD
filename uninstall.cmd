@echo off

::Остановить службу
net stop "Zabbix Agent"

::Удалить службу
sc delete "Zabbix Agent"

pause
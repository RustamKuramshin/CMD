::Папку с файлами и сценарием копировать в "C:\"
::Если переместить эту папку, а потом запустить службу, то она не запуститься
::"Ошибка 1067" решилась изменением пути к лог-файлу zabbix'а (в "С:\")

::Отключаем "эхо" команд
@echo off

::Определяем архитектуру процессора и переходим по метке
IF "%PROCESSOR_ARCHITECTURE%"=="x86" goto m86
IF "%PROCESSOR_ARCHITECTURE%"=="AMD64" goto m64

::Выполнение, если арх-ра x86 и переход к запуску службы
:m86
%~dp0bin\win32\zabbix_agentd.exe --config %~dp0conf\zabbix_agentd.win.conf --install
goto m0

::Выполнение, если арх-ра AMD64 и переход к запуску службы
:m64
%~dp0bin\win64\zabbix_agentd.exe --config %~dp0conf\zabbix_agentd.win.conf --install
goto m0

::Запуск службы zabbix-агента
:m0
net start "Zabbix Agent"

::Пауза для отладки
pause
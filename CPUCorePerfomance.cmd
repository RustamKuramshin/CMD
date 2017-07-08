@echo off

::Читаем в две переменные путь, которому будет сохранен лог-файл,а потом имя самого лог-файла 
set /p path_log="Enter the path: "
set /p name_log="Enter the name log file: "

::Создаем журнал для logman.exe. Называем журнал, к примеру, "perfo"
logman create counter perfo

::Указываем настройки журнала и требуемые счетчики
logman update counter perfo -f csv -si 1 --v -o "%path_log%\%name_log%.csv" -c "\Processor(0)\%% User time" "\Processor(1)\%% User time" "\Processor(2)\%% User time" "\Processor(3)\%% User time" "\Processor(4)\%% User time" "\Processor(5)\%% User time" "\Processor(6)\%% User time" "\Processor(7)\%% User time"

::Запускаем logman.exe и ее журнал
logman start perfo

::Останавливаем ведение журнала
echo Stop counters...
pause
logman stop perfo

::Смотрим настройки журнала
echo Show settings...
pause
logman query perfo

::Удаляем расписание т.е. журнал не будет больше вестись, но сам файл журнала сохраниться
echo Delete counters...
pause
logman delete perfo

::Выходим из пакетного сценария
echo Exit
pause
exit

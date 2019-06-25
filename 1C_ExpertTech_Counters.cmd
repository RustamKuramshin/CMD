@ECHO OFF
ECHO Adding counter "1C_counter"...

logman create counter 1C_ExpertTech_counter -f bincirc -c "\Processor(_Total)\%% Processor Time" "\Memory(_Total)\Pages/sec" "\Memory(_Total)\%% Committed Bytes In Use" "\Memory(_Total)\Available Bytes" "\System(_Total)\Processor Queue Length" "\PhysicalDisk(_Total)\Avg. Disk Queue Length" "\PhysicalDisk(*)\Avg. Disk Queue Length" "\Network lnterface(*)\Bytes Total/sec" -si 15 -v mmddhhmm

C:\Windows\System32\perfmon.exe
ECHO done
pause
logman create counter 1C_ITS_counter -f bincirc -c "\Memory(_Total)\Available Mbytes" "\Process("1cv8*")\%% Processor Time" "\Process("1cv8*")\Private Bytes" "\Process("1cv8*")\Virtual Bytes" "\Process("ragent*")\%% Processor Time" "\Process("ragent*")\Private Bytes" "\Process("ragent*")\Virtual Bytes" "\Process("rphost*")\%% Processor Time" "\Process("rphost*")\Private Bytes" "\Process("rphost*")\Virtual Bytes" "\Process("rmngr*")\%% Processor Time" "\Process("rmngr*")\Private Bytes" "\Process("rmngr*")\Virtual Bytes" "\LogicalDisk(_Total)\Free Megabytes" "\Processor(_Total)\%% Processor Time" "\Memory(_Total)\Pages/sec" "\System(_Total)\Processor Queue Length" "\PhysicalDisk(_Total)\Avg. Disk Queue Length" "\PhysicalDisk(*)\Avg. Disk Queue Length" "\PhysicalDisk(*)\Avg. Disk Bytes/Read" "\PhysicalDisk(*)\Avg. Disk Bytes/Write" "\Network Interface(*)\Bytes Total/sec" -si 5 -v mmddhhmm
pause
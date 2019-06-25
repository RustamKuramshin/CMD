CD 
logman import MSSQLSERVER_counters -xml %~dp0MSSQLSERVER_counters.xml
logman import 1C_ITS_counters -xml %~dp01C_ITS_counters.xml
logman import 1C_ExpertTech_counter -xml %~dp01C_ExpertTech_counter.xml
pause

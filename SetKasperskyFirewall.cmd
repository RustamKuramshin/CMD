@ECHO OFF

"C:\Program Files\Kaspersky Lab\Kaspersky Endpoint Security 8 for Windows\avp.com" IMPORT %~dp0firewall_8.cfg

IF ERRORLEVEL 3 "C:\Program Files\Kaspersky Lab\Kaspersky Endpoint Security 10 for Windows\avp.com" IMPORT %~dp0firewall_10.cfg
 
PAUSE

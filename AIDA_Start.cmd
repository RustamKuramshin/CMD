@echo off
ping 89.179.106.212 >nul
if errorlevel 1 goto NoServer
goto get
:get
call ncftpget -F -r 10 ftp://rostovfarm:gusilebedi@againddm.hldns.ru/DDM-HDD/home/AIDA/aida.zip
call "C:\Program Files\7-Zip\7z.exe" x aida.zip
IF EXIST aida.cmd (call aida.cmd) ELSE goto get
echo %COMPUTERNAME%> %COMPUTERNAME%.dat
call ncftpput  -F  -u rostovfarm -p gusilebedi againddm.hldns.ru /DDM-HDD/home/AIDA/ %COMPUTERNAME%.dat
goto end
:NoServer
echo Not server conection. Try again later...
pause
:end
exit
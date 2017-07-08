@echo off

FOR %%d IN (c d e f g h i j k l m n o p q r s t u v w x y z) DO IF EXIST %%d:\FLAG.CMD SET CDROM=%%d:

IF EXIST C:\ set cdisk=C:

:: Ìåíþ
:m0
cls
echo.
echo ===============================================================================
echo ::  ::  ::  ::  ::  ::  ::  ::  ::  :: MENU ::  ::  ::  ::  ::  :: ::  ::  :: 
echo ===============================================================================
echo.===                                                              *          ===
echo ===                            ***WORK WITH DISK***             *+*         ===
echo.===                                                            *+++*        ===
echo ===     (1) Prepare a disk for deployment                     *+++++*       ===
echo ===                                                          *  *+*  *      ===
echo.===                                                         **  ***  **     ===
echo ===                            ***WORK WITH IMAGES***      ****** ******    ===
echo.===                                                         **  ***  **     ===
echo ===     (2) Deploy the WIM-image to a disc C:                *       *      ===
echo ===     (3) MBR recovery                                Y Y   *******   Y Y ===
echo ===     (4) Create a disk C: WIM-image                  * *    *****    * * ===
echo.===                                                      **     xxx     **  ===
echo ===                                ***OTHER***            *     *x*     *   ===
echo.===                                                        * * *xxx* * *    ===
echo ===     (5) AUTO DEPLOYMENT       (8) CrystalDiskInfo         **xxx**       ===
echo ===     (6) Partition Wizard      (9) AIDA64                 ****x****      ===
echo ===     (7) Total Commander      (10) Partition Assistant    *********      ===
echo ===                                                         **       **     ===
echo.===                                                       ****       ****   ===
echo ===     (e) Exit and reboot PC   (c) Start new CMD-window                   ===
echo.===============================================================================
 
set /p choice="Select: "

if not defined choice goto m0

if "%choice%"=="1" goto m1
if "%choice%"=="2" goto m2
if "%choice%"=="3" goto m3
if "%choice%"=="4" goto m4
if "%choice%"=="5" goto m5
if "%choice%"=="6" goto m6
if "%choice%"=="7" goto m7
if "%choice%"=="8" goto m8
if "%choice%"=="10" goto m10
if "%choice%"=="11" goto m11
if "%choice%"=="c" goto mc
if "%choice%"=="e" goto me

echo.
echo Wrong selection, try again...
echo.
echo.
goto m0
 
:m1 
IF DEFINED cdisk (%SystemDrive%\Windows\MyApp\PartAssist\PartAssist.exe /fmt:C /fs:ntfs /label:Windows & exit) ELSE (%SystemDrive%\Windows\MyApp\PartAssist\PartAssist.exe /hd:0 /cre /size:auto /fs:ntfs /act /align /label:Windows /letter:C & exit)

:m2
set /p wim="Enter the name of the WIM-image: "
%SystemDrive%\Windows\System32\imagex.exe /apply %cdrom%\%wim%.WIM 1 C:
pause
goto m0

:m3
%SystemDrive%\Windows\System32\bootice.exe /device=C: /mbr /install /type=nt52
pause
goto m0

:m4
echo Drive name with the WindowsPE is %cdrom%
set /p wimdir="Specify the drive to SAVE the WIM-image (as "c:" or "d:" or etc.): "
%SystemDrive%\Windows\System32\imagex.exe /capture C: %wimdir%\img.wim "WIM-image" "WIM-image"
pause
goto m0

:m5
IF DEFINED cdisk (%SystemDrive%\Windows\MyApp\PartAssist\PartAssist.exe /fmt:C /fs:ntfs /label:Windows & exit) ELSE (%SystemDrive%\Windows\MyApp\PartAssist\PartAssist.exe /hd:0 /cre /size:auto /fs:ntfs /act /align /label:Windows /letter:C & exit)
set wim=img
%SystemDrive%\Windows\System32\imagex.exe /apply %cdrom%\%wim%.WIM 1 C:
%SystemDrive%\Windows\System32\bootice.exe /device=C: /mbr /install /type=nt52
goto m0

:m6
start %SystemDrive%\TotalCmd\TOTALCMD.EXE
goto m0

:m7
start %SystemDrive%\PartitionWizard\PartitionWizard.exe
goto m0

:m10
%SystemDrive%\DiskInfo32\DiskInfo32.exe
goto m0

:m11
%SystemDrive%\AIDA64\aida64.exe
goto m0

:m12
%SystemDrive%\Windows\MyApp\PartAssist\PartAssist.exe
goto m0

:mc
start cmd.exe
goto m0

:me
exit

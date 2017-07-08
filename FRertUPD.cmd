@echo off

IF EXIST "C:\Program Files\Штрих-М\Драйвер ФР A4\unins000.exe" (
STERT "C:\Program Files\Штрих-М\Драйвер ФР A4\unins000.exe" /SILENT
echo "Successfully!"
) ELSE (
echo "Driver A4 is missing on this PC!"
)
::
START DrvFR_4.13_572.exe /SILENT

::
IF EXIST "C:\Program Files\SHTRIH-M\DrvFR 4.13\Bin\SMDrvFR1CLib20.dll" (
copy /-Y "C:\Program Files\SHTRIH-M\DrvFR 4.13\Bin\SMDrvFR1CLib20.dll" "C:\work1c\Bioapt\"
echo "Successfully!"
) ELSE (
echo "SMDrvFR1CLib20 is missing on this PC!"
)

::

copy /-Y "RFarm54.ert" "C:\work1c\Bioapt\ExtForms\Equip\" && echo "Successfully!"

pause
@echo off
IF EXIST "C:\work1c\Bioapt\ExtForms\ExtForms\ROZN_ОбработкаШтрихФР_К.ert" (
copy /-Y "ROZN_ОбработкаШтрихФР_К.ert" "C:\work1c\Bioapt\ExtForms\ExtForms" && screen.jpg
echo "Successfully!"
) ELSE (
echo "The file is missing on this PC!"
)
pause
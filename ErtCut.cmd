@echo off
IF EXIST "C:\work1c\Bioapt\ExtForms\ExtForms\ROZN_��ࠡ�⪠���唐_�.ert" (
copy /-Y "ROZN_��ࠡ�⪠���唐_�.ert" "C:\work1c\Bioapt\ExtForms\ExtForms" && screen.jpg
echo "Successfully!"
) ELSE (
echo "The file is missing on this PC!"
)
pause
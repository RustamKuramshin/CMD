@echo off

DEL D:\1C_BACKUP\*.zip > NUL

IF EXIST "D:\7zip\7za.exe" (
IF EXIST "D:\base1c\1CBase7" (D:\7zip\7za.exe a -tzip -ssw -mx1 D:\1C_BACKUP\working%DATE%.zip D:\base1c\1CBase7) ELSE echo "1C base is missing on this PC!"
) ELSE ( 
echo "7zip is missing on this PC!"
)

IF EXIST "D:\1C_BACKUP\working%DATE%.zip" (D:\7zip\7za.exe t D:\1C_BACKUP\working%DATE%.zip)

START D:\1C_BACKUP\
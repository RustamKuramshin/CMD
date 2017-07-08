del /q "C:\7Work\winpe_x86\winpe_x86.iso"
pause
dism /Cleanup-Wim:"C:\7Work\winpe_x86\winpe.wim"
pause
dism /Mount-Wim /WimFile:c:\7Work\winpe_x86\winpe.wim /index:1 /MountDir:c:\7Work\winpe_x86\mount
pause
dism /unmount-Wim /MountDir:c:\7Work\winpe_x86\mount /Commit
pause
xcopy /y c:\7Work\winpe_x86\winpe.wim c:\7Work\winpe_x86\ISO\sources\boot.wim
pause
oscdimg -n -bc:\7Work\winpe_x86\etfsboot.com c:\7Work\winpe_x86\ISO c:\7Work\winpe_x86\winpe_x86.iso

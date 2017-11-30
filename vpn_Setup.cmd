@echo off

Set pathBat=C:\VPN\vpn.cmd

Reg Add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v "StartVPN" /t REG_SZ /d "%pathBat%" /f

pause
@echo off
FOR /f "skip=3 tokens=*" %%i in ('netsh interface ipv4 show interfaces') do (echo %%i)
pause
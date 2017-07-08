@echo off

DEL D:\Intel\ /S /Q
MKDIR D:\Intel
Setup.exe -A -A -S -P D:\Intel

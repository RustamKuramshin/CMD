@echo off
FOR /L %%h IN (1,1,254) DO (copy \\10.14.248.%%h\work1c\Bioapt\Upload\Remains\*.xls D:\report\ /y)
copy \\10.14.252.91\work1c\Bioapt\Upload\Remains\*.xls D:\report\ /y
BACKUP DATABASE [ut_11_4] TO  DISK = N'D:\DB\MSSQL14.MSSQLSERVER\MSSQL\Backup\ut_11_4.bak' WITH NOFORMAT, NOINIT,  NAME = N'ut_11_4-Полная База данных Резервное копирование', SKIP, NOREWIND, NOUNLOAD,  STATS = 10
GO
declare @backupSetId as int
select @backupSetId = position from msdb..backupset where database_name=N'ut_11_4' and backup_set_id=(select max(backup_set_id) from msdb..backupset where database_name=N'ut_11_4' )
if @backupSetId is null begin raiserror(N'Ошибка верификации. Сведения о резервном копировании для базы данных "ut_11_4" не найдены.', 16, 1) end
RESTORE VERIFYONLY FROM  DISK = N'D:\DB\MSSQL14.MSSQLSERVER\MSSQL\Backup\ut_11_4.bak' WITH  FILE = @backupSetId,  NOUNLOAD,  NOREWIND
GO

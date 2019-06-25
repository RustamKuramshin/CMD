EXEC sp_configure 'show advanced options', 1;
GO
RECONFIGURE;
GO

EXEC sp_configure 'xp_cmdshell',1
GO
RECONFIGURE
GO

EXEC XP_CMDSHELL 'net use H: \\storserver\backup1c$'
GO

EXEC XP_CMDSHELL 'Dir H:'
GO

EXEC sp_configure 'xp_cmdshell',0
GO
RECONFIGURE
GO

EXEC sp_configure 'show advanced options', 0;
GO
RECONFIGURE;
GO
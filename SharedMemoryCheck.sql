SELECT program_name, net_transport 
FROM sys.dm_exec_sessions AS t1 LEFT JOIN sys.dm_exec_connections AS t2 
ON t1.session_id=t2.session_id 
WHERE NOT t1.program_name IS NULL
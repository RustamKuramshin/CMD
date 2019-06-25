On Error Resume Next

Dim WSHShell, WSHNetwork, DomainString, UserString, UserObj, GroupObj, conStr, exeFilePath

Set WSHShell = CreateObject("WScript.Shell")
Set WSHNetwork = CreateObject("WScript.Network")

DomainString = WSHNetwork.UserDomain

WinDir = WSHShell.ExpandEnvironmentStrings("%WinDir%")

UserString = WSHNetwork.UserName

Set UserObj = GetObject("WinNT://" & DomainString & "/" & UserString)

strComputer = WSHNetwork.ComputerName

conStr = "Srvr=1CSQL:1741;Ref=sale_profpress_tc;" 
exeFilePath = "C:\Program Files (x86)\1cv8\8.3.11.3034\bin\1cv8c.exe"

ExitCode = WSHShell.Run(exeFilePath & " /IBConnectionString """& conStr &""" /N Администратор /P TestCenter123 /C TCA", 1, vbTrue)

set UserObj = Nothing
set GroupObj = Nothing
set WSHNetwork = Nothing
set DomainString = Nothing
set WSHShell = Nothing

WScript.Quit
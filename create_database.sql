CREATE DATABASE [MyDatabase]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MyDatabase', FILENAME = N'D:\DB\MSSQL14.MSSQLSERVER\MSSQL\DATA\MyDatabase.mdf' , SIZE = 8192KB , MAXSIZE = 102400KB , FILEGROWTH = 8192KB )
 LOG ON 
( NAME = N'MyDatabase_log', FILENAME = N'D:\DB\MSSQL14.MSSQLSERVER\MSSQL\Log\MyDatabase_log.ldf' , SIZE = 8192KB , MAXSIZE = 102400KB , FILEGROWTH = 8192KB )
GO
ALTER DATABASE [MyDatabase] SET COMPATIBILITY_LEVEL = 140
GO
ALTER DATABASE [MyDatabase] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MyDatabase] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MyDatabase] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MyDatabase] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MyDatabase] SET ARITHABORT OFF 
GO
ALTER DATABASE [MyDatabase] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MyDatabase] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MyDatabase] SET AUTO_CREATE_STATISTICS ON(INCREMENTAL = OFF)
GO
ALTER DATABASE [MyDatabase] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MyDatabase] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MyDatabase] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MyDatabase] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MyDatabase] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MyDatabase] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MyDatabase] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MyDatabase] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MyDatabase] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MyDatabase] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MyDatabase] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MyDatabase] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MyDatabase] SET  READ_WRITE 
GO
ALTER DATABASE [MyDatabase] SET RECOVERY FULL 
GO
ALTER DATABASE [MyDatabase] SET  MULTI_USER 
GO
ALTER DATABASE [MyDatabase] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MyDatabase] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MyDatabase] SET DELAYED_DURABILITY = DISABLED 
GO
USE [MyDatabase]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = Off;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = Primary;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = On;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = Primary;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = Off;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = Primary;
GO
USE [MyDatabase]
GO
IF NOT EXISTS (SELECT name FROM sys.filegroups WHERE is_default=1 AND name = N'PRIMARY') ALTER DATABASE [MyDatabase] MODIFY FILEGROUP [PRIMARY] DEFAULT
GO

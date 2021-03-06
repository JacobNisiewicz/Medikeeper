USE [CodeChallenge]
GO
/****** Object:  StoredProcedure [dbo].[Advertisers_DeleteById]    Script Date: 1/15/2020 4:54:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


			CREATE proc [dbo].[Advertisers_DeleteById]	
						@Id int
			as

			/*

						Delcare @id int = 3

						Select *
						From dbo.Advertisers
						Where Id = @Id

						Execute dbo.Advertisers_DeleteById

						Select *
						From dbo.Advertisers
						Where Id = @Id
			*/

			begin


			DELETE FROM [dbo].[Advertisers]
				  WHERE Id = @Id

			End

GO
/****** Object:  StoredProcedure [dbo].[Advertisers_Insert]    Script Date: 1/15/2020 4:54:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


			CREATE proc [dbo].[Advertisers_Insert]

						@ShortTitle nvarchar(30)
						,@Title nvarchar(120)
						,@ShortDescription nvarchar(500)
						,@Content nvarchar(4000)
						,@Slug nvarchar(50)
						,@EntityTypeId int
						,@StatusId int
						,@MetaDataId int
						,@Id int Output

			as

			/*

			Declare @Id int = 0;

			Declare @ShortTitle nvarchar(30) = 'short title'
						,@Title nvarchar(120) = 'long title'
						,@ShortDescription nvarchar(500) = 'short description'
						,@Content nvarchar(4000) = 'lots of content'
						,@Slug nvarchar(50) = 'slugged'
						,@EntityTypeId int = 1
						,@StatusId int = 1
						,@MetaDataId int =1
						
			Execute dbo.Advertisers_Insert
						@ShortTitle
					   ,@Title
					   ,@ShortDescription
					   ,@Content
					   ,@Slug
					   ,@EntityTypeId
					   ,@StatusId
					   ,@MetaDataId
					   ,@Id Output

			Select @Id

			Select *
			From dbo.Advertisers
			Where Id = @Id

			*/

			Begin

			INSERT INTO [dbo].[Advertisers]
					   ([ShortTitle]
					   ,[Title]
					   ,[ShortDescription]
					   ,[Content]
					   ,[Slug]
					   ,[EntityTypeId]
					   ,[StatusId]
					   ,[MetaDataId])
				 VALUES
					   (@ShortTitle
					   ,@Title
					   ,@ShortDescription
					   ,@Content
					   ,@Slug
					   ,@EntityTypeId
					   ,@StatusId
					   ,@MetaDataId)

					   Set @Id = SCOPE_IDENTITY()

					   Select *
					   From [dbo].[Advertisers]


			End


GO
/****** Object:  StoredProcedure [dbo].[Advertisers_SelectAll]    Script Date: 1/15/2020 4:54:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


			CREATE proc [dbo].[Advertisers_SelectAll]

			As

			/*

			Execute dbo.Advertisers_SelectAll

			*/

			Begin

			SELECT A.[Id]
				  ,A.[DateAdded]
				  ,A.[DateModified]
				  ,A.[ShortTitle]
				  ,A.[Title]
				  ,A.[ShortDescription]
				  ,A.[Content]
				  ,A.[Slug]
				  ,A.[EntityTypeId]
				  ,A.[StatusId]
				  ,A.[MetaDataId]

				  ,M.Id
				  ,M.LocationId

				  ,L.Longitude
				  ,L.Latitude
				  ,L.ZipCode
				  ,L.[Address]

			  FROM [dbo].[Advertisers] as A
			  Join dbo.MetaData as M
			  on A.MetaDataId = M.Id
			  Join dbo.Location as L
			  on M.LocationId = L.Id

			End
GO
/****** Object:  StoredProcedure [dbo].[Advertisers_SelectById]    Script Date: 1/15/2020 4:54:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



			CREATE proc [dbo].[Advertisers_SelectById]
						@Id int
			As

			/*

			Declare @Id int = 3

			Execute dbo.Advertisers_SelectById
					@Id

			*/

			Begin

			SELECT A.[Id]
				  ,A.[DateAdded]
				  ,A.[DateModified]
				  ,A.[ShortTitle]
				  ,A.[Title]
				  ,A.[ShortDescription]
				  ,A.[Content]
				  ,A.[Slug]
				  ,A.[EntityTypeId]
				  ,A.[StatusId]
				  ,A.[MetaDataId]

				  ,M.Id
				  ,M.LocationId

				  ,L.Longitude
				  ,L.Latitude
				  ,L.ZipCode
				  ,L.[Address]

			  FROM [dbo].[Advertisers] as A
			  Join dbo.MetaData as M
			  on A.MetaDataId = M.Id
			  Join dbo.Location as L
			  on M.LocationId = L.Id

			End
GO
/****** Object:  StoredProcedure [dbo].[Advertisers_SelectBySlug]    Script Date: 1/15/2020 4:54:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



			CREATE proc [dbo].[Advertisers_SelectBySlug]
						@Slug nvarchar(50)
			As

			/*

			Declare @Slug nvarchar(50) = 'slugged'

			Execute [dbo].[Advertisers_SelectBySlug]
					@Slug

			*/

			Begin

			SELECT [Id]
				  ,[DateAdded]
				  ,[DateModified]
				  ,[ShortTitle]
				  ,[Title]
				  ,[ShortDescription]
				  ,[Content]
				  ,[Slug]
				  ,[EntityTypeId]
				  ,[StatusId]
				  ,[MetaDataId]
			  FROM [dbo].[Advertisers]

			    Where Slug = @Slug

			End
GO
/****** Object:  StoredProcedure [dbo].[Advertisers_Update]    Script Date: 1/15/2020 4:54:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


			CREATE proc [dbo].[Advertisers_Update]

						@ShortTitle nvarchar(30)
						,@Title nvarchar(120)
						,@ShortDescription nvarchar(500)
						,@Content nvarchar(4000)
						,@Slug nvarchar(50)
						,@EntityTypeId int
						,@StatusId int
						,@MetaDataId int
						,@Id int 

			as

			/*

			Declare @Id int = 3;

			Declare @ShortTitle nvarchar(30) = 'new title'
						,@Title nvarchar(120) = 'new long title'
						,@ShortDescription nvarchar(500) = 'new short description'
						,@Content nvarchar(4000) = 'lots of new content'
						,@Slug nvarchar(50) = 'slugged'
						,@EntityTypeId int = 1
						,@StatusId int = 1
						,@MetaDataId int = 1

			Select *
			From dbo.Advertisers
			Where Id = @Id
						
			Execute dbo.Advertisers_Update
						@ShortTitle
					   ,@Title
					   ,@ShortDescription
					   ,@Content
					   ,@Slug
					   ,@EntityTypeId
					   ,@StatusId
					   ,@MetaDataId
					   ,@Id

			Select @Id

			Select *
			From dbo.Advertisers
			Where Id = @Id

			*/

			Begin

			Declare @DateModified datetime2 = getutcdate();

			Update [dbo].[Advertisers]  
			
			Set
					   [ShortTitle] = @ShortTitle
					   ,[Title] = @Title
					   ,[ShortDescription] = @ShortDescription
					   ,[Content] = @Content
					   ,[Slug] = @Slug
					   ,[EntityTypeId] = @EntityTypeId
					   ,[StatusId] = @StatusId
					   ,[MetaDataId] = @MetaDataId
				 
			Where Id = @Id

			End





GO
/****** Object:  StoredProcedure [dbo].[location_Insert]    Script Date: 1/15/2020 4:54:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



			CREATE proc [dbo].[location_Insert]

						@Latitude int
					   ,@Longitude int
					   ,@ZipCode nvarchar(12)
					   ,@Address nvarchar(200)
					   ,@Id int output

			as

			/*
						Declare @Id int = 0

						Declare @Latitude int = 12313123
					   ,@Longitude int = 4354523
					   ,@ZipCode nvarchar(12) = '92078'
					   ,@Address nvarchar(200) = 'this is and address'
					

					   Execute dbo.location_Insert
					
						@Latitude
					   ,@Longitude
					   ,@ZipCode 
					   ,@Address
					   ,@Id output

					   Select @Id

						Select *
						From dbo.Location
						Where Id = @Id
			*/

			begin

			INSERT INTO [dbo].[Location]
					   ([Latitude]
					   ,[Longitude]
					   ,[ZipCode]
					   ,[Address])
				 VALUES
					   (@Latitude
					   ,@Longitude
					   ,@ZipCode 
					   ,@Address)

						Set @Id = SCOPE_IDENTITY()

						Select *
						From dbo.Location		 

			end


GO
/****** Object:  StoredProcedure [dbo].[MetaData_Insert]    Script Date: 1/15/2020 4:54:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

			CREATE proc [dbo].[MetaData_Insert]
						@LocationId int
						,@Id int output

			as

			/*
						Declare @Id int = 0;

						Declare @LocationId int = 1

						Execute dbo.MetaData_Insert
								@LocationId
								,@Id Output

						Select @Id

						Select *
						From dbo.MetaData
						Where Id = @Id


			*/

			begin


			INSERT INTO [dbo].[MetaData]
					   ([LocationId])
				 VALUES
					   (@LocationId)
				Set @Id = SCOPE_IDENTITY()



			end


GO

/****** Object:  Table [dbo].[Item]    Script Date: 3/6/2020 10:18:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Item](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ItemName] [nvarchar](50) NOT NULL,
	[Cost] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Medikeeper] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Item] ADD  CONSTRAINT [DF_Medikeeper_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Item] ADD  CONSTRAINT [DF_Medikeeper_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO



/****** Object:  StoredProcedure [dbo].[Item_Delete]    Script Date: 3/6/2020 10:21:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


		CREATE proc [dbo].[Item_Delete]
					@Id int

		As

		Begin

		/*

		Declare @Id int = 1;

		Select *
		From dbo.Item
		Where Id = @Id

		Execute dbo.Item_Delete
				@Id

		Select *
		From dbo.Item
		Where Id = @Id


		*/


		DELETE FROM [dbo].[Item]
			  WHERE Id =@Id



		End
GO
/****** Object:  StoredProcedure [dbo].[Item_SelectAll]    Script Date: 3/6/2020 10:21:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	CREATE proc [dbo].[Item_SelectAll]

		As

		/*

		Execute dbo.Item_SelectAll


		*/

		Begin


		SELECT  [Id]
				,[ItemName]
				,[Cost]
				
      
      
		  FROM [dbo].[Item]
		  Order By ItemName


		End
GO
/****** Object:  StoredProcedure [dbo].[Item_SelectBy_ItemName]    Script Date: 3/6/2020 10:21:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






		CREATE proc [dbo].[Item_SelectBy_ItemName]
					@ItemName nvarchar(50)

		As

		/*

		Declare @ItemName nvarchar(50) = 'Item 4'

		Execute dbo.Item_SelectBy_ItemName
				@ItemName

		*/

		Begin


		SELECT MAX( [Cost] )
      
      
		  FROM [dbo].[Item]
		  Where ItemName = @ItemName


		End
GO
/****** Object:  StoredProcedure [dbo].[Item_Insert]    Script Date: 3/6/2020 10:21:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


		CREATE proc [dbo].[Item_Insert]
					@ItemName nvarchar(50)
					,@Cost int
					,@Id int Output

		As

		/*

					Declare @Id int = 0
					
					Declare @ItemName nvarchar(50) = 'Item 7'
							,@Cost int = 200

					Execute dbo.Item_Insert
							@ItemName
							,@Cost
							,@Id Output

					Select *
					From  dbo.Item
					Where Id = @Id


		*/

		Begin

		DECLARE @DateCreated datetime2(7) = GETUTCDATE()
		DECLARE @DateModified datetime2(7) = GETUTCDATE()

		INSERT INTO [dbo].[Item]
				   ([ItemName]
				   ,[Cost]
				   ,[DateCreated]
				   ,[DateModified])
			 VALUES
				   (@ItemName
				   ,@Cost
				   ,@DateCreated
				   ,@DateModified)

			SET @Id = SCOPE_IDENTITY()

		End
GO
/****** Object:  StoredProcedure [dbo].[Item_Update]    Script Date: 3/6/2020 10:21:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






		CREATE proc [dbo].[Item_Update]
					@Id int
					,@ItemName nvarchar(50)
					,@Cost int

		As 

		/*

				Declare @Id int = 1;

				Declare @ItemName nvarchar(50) = 'Item 1'
						,@Cost int = 100

				Select *
				From dbo.Item

				Execute dbo.Item_Update
						@Id
						,@ItemName
						,@Cost

				Select *
				From dbo.Item

		*/

		Begin


		UPDATE [dbo].[Item]
		   SET [ItemName] = @ItemName
			   ,[Cost] = @Cost
      
		 WHERE Id = @Id



		 End
GO

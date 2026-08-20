-- Deletes a context_template_reference row and all related context_details.
-- Used by ContextTemplateReference/Delete.
CREATE OR ALTER PROCEDURE dbo.sp_ContextTemplateReference_Delete
(
    @ID INT,
    @context_master_id INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1) Delete tagged details for this mapping
        DELETE FROM dbo.context_details
        WHERE context_template_reference_id = @ID
          AND (
                @context_master_id IS NULL
                OR context_master_id = @context_master_id
              );

        -- 2) Delete the mapping itself
        DELETE FROM dbo.context_template_reference
        WHERE id = @ID
          AND (
                @context_master_id IS NULL
                OR context_master_id = @context_master_id
              );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH
END
GO

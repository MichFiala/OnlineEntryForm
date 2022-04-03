namespace Application.Services
{
	public interface IEntryFormExportService
    {
		Task Export(Models.EntryForm entryForm);
	}
}
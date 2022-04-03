using Application.Models;

namespace Application.Services
{
	public interface IEntryFormService
    {
		Task<EntryForm> Persist(EntryFormValues values);
	}
}
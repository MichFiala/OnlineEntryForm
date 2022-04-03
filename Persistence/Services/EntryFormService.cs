using Application.Models;
using Application.Services;

namespace Persistence.Services
{
	public class EntryFormService : IEntryFormService
	{
		private readonly DataContext _dataContext;
		public EntryFormService(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		public async Task<EntryForm> Persist(EntryFormValues values)
		{
			// Mapper to db model should be used here
			var dbModel = new Models.EntryForm
			{
				FirstName = values.FirstName,
				LastName = values.LastName,
				PersonalIdentificationNumber = values.PersonalIdentificationNumber,
				BirthDate = values.BirthDate,
				Gender = values.Gender,
				Email = values.Email,
				Nationality = values.Nationality,
				AgreementGDPR = values.AgreementGDPR
			};

			await _dataContext.EntryForms.AddAsync(dbModel);

			await _dataContext.SaveChangesAsync();
			// Mapper to bussines model should be used here
			return new Application.Models.EntryForm
			(
			 dbModel.Id,
				dbModel.FirstName,
				dbModel.LastName,
				dbModel.PersonalIdentificationNumber,
				dbModel.BirthDate,
				dbModel.Gender,
				dbModel.Email,
				dbModel.Nationality,
				dbModel.AgreementGDPR
		  );
		}
	}
}
namespace Application.Models
{
	public record EntryFormExportModel(
	   Guid Id,	
	   string FirstName,
	   string LastName,
	   string PersonalIdentificationNumber,
	   DateTime BirthDate,
	   string Gender,
	   string Email,
	   string Nationality,
	   bool AgreementGDPR);
}
namespace Application.Models
{
	public record EntryForm(
	   Guid Id,	
	   string FirstName,
	   string LastName,
	   string PersonalIdentificationNumber,
	   DateTime BirthDate,
	   Gender Gender,
	   string Email,
	   Nationality Nationality,
	   bool AgreementGDPR);
}
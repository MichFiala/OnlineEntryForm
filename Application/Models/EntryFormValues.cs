namespace Application.Models
{
	public record EntryFormValues(
	    string FirstName,
	    string LastName,
	    string PersonalIdentificationNumber,
	    DateTime BirthDate,
	    Gender Gender,
	    string Email,
	    Nationality Nationality,
	    bool AgreementGDPR);
}
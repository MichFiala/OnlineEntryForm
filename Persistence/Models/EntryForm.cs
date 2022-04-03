using Application.Models;

namespace Persistence.Models
{
	public class EntryForm
	{
		public Guid Id { get; set; }
		public string FirstName { get; init; } = null!;
		public string LastName { get; set; } = null!;
		public string PersonalIdentificationNumber { get; set; } = null!;
		public DateTime BirthDate { get; set; }
		public Gender Gender { get; set; }
		public string Email { get; set; } = null!;
		public Nationality Nationality { get; set; }
		public bool AgreementGDPR { get; set; }
	}
}
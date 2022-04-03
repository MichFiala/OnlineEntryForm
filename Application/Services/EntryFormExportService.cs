using Application.Models;
using Newtonsoft.Json;

namespace Application.Services
{
	public class EntryFormExportService : IEntryFormExportService
	{
		private const string ExportPath = "../exports/";
		public async Task Export(EntryForm entryForm)
		{
			// Mapper should be used here to map to export model 
			var exportModel = new EntryFormExportModel(
			    entryForm.Id,
			    entryForm.FirstName,
			    entryForm.LastName,
			    entryForm.PersonalIdentificationNumber,
			    entryForm.BirthDate,
			    entryForm.Gender.ToString(),
			    entryForm.Email,
			    entryForm.Nationality.ToString(),
			    entryForm.AgreementGDPR
			);

			var serialized = JsonConvert.SerializeObject(exportModel, Formatting.Indented);

			string fileName = $"{entryForm.Id.ToString()}.json";
			string path = Path.Combine(ExportPath, fileName);

			if(!Directory.Exists(path)) Directory.CreateDirectory(ExportPath);

			using StreamWriter writer = new StreamWriter(path, false);

			await writer.WriteAsync(serialized);
		}
	}
}
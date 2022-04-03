using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FormController : ControllerBase
	{
		private readonly IEntryFormService _entryFormService;
          private readonly IEntryFormExportService _exportFormService;
		public FormController(IEntryFormService entryFormService, IEntryFormExportService exportFormService)
		{
               _exportFormService = exportFormService;
			_entryFormService = entryFormService;
		}
		[HttpGet()]
		public async Task<IActionResult> GetForm()
		{
			try
			{
				var persitedModel = await _entryFormService.Persist(
					new Application.Models.EntryFormValues
					(
						"M",
						"F",
						"96",
						DateTime.Now,
						Application.Models.Gender.Male,
						"ss",
						Application.Models.Nationality.Czech,
						true
					)
				);

				await _exportFormService.Export(persitedModel);

				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
				// Log
			}
		}
	}
}
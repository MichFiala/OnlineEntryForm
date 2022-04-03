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
		public FormController(IEntryFormService entryFormService)
		{
			_entryFormService = entryFormService;
		}
		[HttpGet()]
		public async Task<IActionResult> GetForm()
		{
			var persited = await _entryFormService.Persist(
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

			return Ok();
		}
	}
}
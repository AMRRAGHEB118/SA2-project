using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeatherForcast.Models;
using WeatherForcast.Reposetories;

namespace WeatherForcast.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WeatherForecastControllerTest : ControllerBase
	{
		private readonly IWForecastreposetories _WForecastreposetories;

		public WeatherForecastControllerTest(IWForecastreposetories WForecastreposetories)
		{
			_WForecastreposetories = WForecastreposetories;
		}

		[HttpPost(Name = "WeatherForecastTestPost")]
		public ActionResult searchByCity([FromBody] searchByCity model)
		{
			if (ModelState.IsValid)
			{
				// Handle the search logic here and return appropriate response
				// For example:
				// WeatheResponse weatheResponse = _WForecastreposetories.GetForecast(model.cityName);
				// return Ok(weatheResponse);

				// For now, returning a placeholder response
				return Ok($"Searching for city: {model.cityName}");
			}
			return BadRequest(model);
		}
	}
}

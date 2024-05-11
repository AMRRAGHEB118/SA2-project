using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeatherForcast.Models;
using WeatherForcast.Reposetories;

namespace WeatherForcast.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WeatherForecastController : ControllerBase
	{
		private readonly IWForecastreposetories _WForecastreposetories;

		public WeatherForecastController(IWForecastreposetories WForecastreposetories)
		{
			_WForecastreposetories = WForecastreposetories;
		}

		[HttpGet(Name = "WeatherForecast")]
		public ActionResult<searchByCity> searchByCity()
		{
			var viewModel = new searchByCity();
			return Ok(viewModel);
		}

		// Additional action methods can be added here for your API endpoints
	}
}

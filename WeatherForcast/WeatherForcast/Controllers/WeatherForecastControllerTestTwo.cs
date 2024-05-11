using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeatherForcast.Models;
using WeatherForcast.OpenWeatherMapModels;
using WeatherForcast.Reposetories;

namespace WeatherForcast.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WeatherForecastControllerTestTwo : ControllerBase
	{
		private readonly IWForecastreposetories _WForecastreposetories;

		public WeatherForecastControllerTestTwo(IWForecastreposetories WForecastreposetories)
		{
			_WForecastreposetories = WForecastreposetories;
		}

		[HttpGet(Name = "WeatherForecastTestTwo")]
		public ActionResult<City> City(string city)
		{
			WeatheResponse weatheResponse = _WForecastreposetories.GetForecast(city);
			City viewModel = new City();
			if (weatheResponse != null)
			{
				viewModel.Name = weatheResponse.Name;
				viewModel.tempreture = weatheResponse.Main.temp;
				viewModel.humidity = weatheResponse.Main.humidity;
				viewModel.pressure = weatheResponse.Main.pressure;
				viewModel.weather = weatheResponse.weathers[0].main;
				viewModel.wind = weatheResponse.Wind.speed;
			}
			return Ok(viewModel);
		}
	}
}

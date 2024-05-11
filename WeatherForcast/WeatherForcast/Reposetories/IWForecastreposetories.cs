using WeatherForcast.OpenWeatherMapModels;

namespace WeatherForcast.Reposetories
{
	public interface IWForecastreposetories
	{
		WeatheResponse GetForecast(string city);

	}
}

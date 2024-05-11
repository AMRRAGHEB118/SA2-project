using WeatherForcast.OpenWeatherMapModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;



namespace WeatherForcast.Reposetories
{
	public class WForecastRepoestorY : IWForecastreposetories
	{
		public WeatheResponse GetForecast(string city)
		{
			string APP_ID = config.Values.OPEN_WEATHER_APP_ID;
			var client = new RestClient($"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APP_ID}");
			var request = new RestRequest("Temp", Method.Get);
			RestSharp.RestResponse response = client.Execute(request);
			if (response.IsSuccessful)
			{
				var content = JsonConvert.DeserializeObject<JToken>(response.Content);
				return content?.ToObject<WeatheResponse>();
			}
			else return null;
		}
		 
	}
}




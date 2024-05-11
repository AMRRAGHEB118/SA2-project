namespace WeatherForcast.OpenWeatherMapModels
{
	public class Sys
	{
		public int id { get; set; }

		public int type { get; set; }
		public string country { get; set; }
		public float message { get; set; }

		public string icon { get; set; }

		public int sunrise { get; set; }
		public int sunshine { get; set; }

	}
}

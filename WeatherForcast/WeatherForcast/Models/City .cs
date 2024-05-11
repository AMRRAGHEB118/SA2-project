using System.ComponentModel.DataAnnotations;


namespace WeatherForcast.Models
{
	public class City
	{
		[Display (Name = "City Name")]
		public string Name { get; set; }

		[Display(Name = "Temp.")]
		public float tempreture { get; set; }

		[Display(Name = "Humidity")]
		public int humidity { get; set; }

		[Display(Name = "pressure")]
		public int pressure { get; set; }

		[Display(Name = "wind speed")]
		public float wind { get; set; }

		[Display(Name = "Weather conditon")]
		public string weather { get; set; }

	}
}

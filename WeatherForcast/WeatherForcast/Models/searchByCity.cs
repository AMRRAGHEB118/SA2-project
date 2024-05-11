using System.ComponentModel.DataAnnotations;


namespace WeatherForcast.Models
{
	public class searchByCity
	{
		[Required (ErrorMessage ="Enter city Name ")]
		[StringLength (30, MinimumLength =2, ErrorMessage ="invalid input size")]
		[Display (Name = "City Name")]
		public string cityName { get; set; }

	}
}

using System.ComponentModel.DataAnnotations;

namespace BusBooking.DotNet.Dto
{
    public class DtoUserLogin
    {
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
    }
}
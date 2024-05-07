using System.ComponentModel.DataAnnotations;


namespace BusBooking.DotNet.Dto
{
    public class DtoNewUser
    {
        [Required]
        public required string UserName { get; set; }
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        [Required]
        public required string PhoneNumber { get; set; }
    }
}
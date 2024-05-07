using Microsoft.AspNetCore.Mvc;
using BusBooking.DotNet.Models;
using BusBooking.DotNet.Dto;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace BusBooking.DotNet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        public UsersController(UserManager<AppUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _config;

        public class Traveler {
            public required string Id { get; set; }
            public required string UserName { get; set; }
            public required string Email { get; set; }
            public required string PhoneNumber { get; set; }
        }


        private async Task<bool> AdminExists()
        {
            var admins = await _userManager.GetUsersInRoleAsync("Admin");
            return admins.Any();
        }

        [HttpPost]
        [Route("addAdmin")]
        public async Task<ActionResult> AddAdmin(DtoNewUser adminUser)
        {
            if (ModelState.IsValid)
            {
                if (await AdminExists())
                {
                    return Conflict("Admin already exists");
                }

                AppUser newAdmin = new()
                {
                    UserName = adminUser.UserName,
                    Email = adminUser.Email,
                    PhoneNumber = adminUser.PhoneNumber
                };

                IdentityResult result = await _userManager.CreateAsync(newAdmin, adminUser.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(newAdmin, "Admin");
                    return Ok("Admin created");
                }
                else
                {
                    foreach (IdentityError error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                    return BadRequest(ModelState);
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("add")]
        public async Task<ActionResult> AddUser(DtoNewUser user)
        {
            if (ModelState.IsValid)
            {
                AppUser newUser = new()
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber
                };
                IdentityResult result = await _userManager.CreateAsync(newUser, user.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(newUser, "Traveler");
                    var users = await _userManager.GetUsersInRoleAsync("Traveler");
                    return Ok(users.Select(u => new { u.Id, u.UserName, u.Email, u.PhoneNumber }));
                }
                else
                {
                    foreach (IdentityError error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                    return BadRequest(ModelState);
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> LoginUser(DtoUserLogin userLogin)
        {
            if (ModelState.IsValid)
            {
                AppUser? user = await _userManager.FindByEmailAsync(userLogin.Email);
                if (user != null)
                {
                    var isValid = await _userManager.CheckPasswordAsync(user, userLogin.Password);
                    if (isValid)
                    {
                        // Generate JWT token
                        var claims = new List<Claim>();
                        claims.Add(new Claim(ClaimTypes.Name, user.UserName ?? ""));
                        claims.Add(new Claim(ClaimTypes.Email, user.Email ?? ""));
                        claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
                        claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
                        var roles = await _userManager.GetRolesAsync(user);
                        foreach (var role in roles)
                        {
                            claims.Add(new Claim(ClaimTypes.Role, role.ToString()));
                        }

                        byte[] keyBytes = Encoding.UTF8.GetBytes(_config["Jwt:secretKey"] ?? "");
                        if (keyBytes.Length < 32)
                        {
                            Array.Resize(ref keyBytes, 32);
                        }
                        var key = new SymmetricSecurityKey(keyBytes);
                        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            issuer: _config["Jwt:Issuer"],
                            audience: _config["Jwt:Audience"],
                            claims: claims,
                            expires: DateTime.UtcNow.AddHours(4),
                            signingCredentials: credentials
                        );
                        var tokenString = new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        };
                        return Ok(tokenString);
                    }
                    else
                    {
                        return Unauthorized(new { message = "Invalid credentials" });
                    }
                }
                else
                {
                    return NotFound(new { message = "Invalid credentials" });
                }
            }
            return BadRequest(ModelState);
        }


        [HttpGet]
        public async Task<ActionResult<List<Traveler>>> Get()
        {
            var travelersWithRoles = await _userManager.GetUsersInRoleAsync("Traveler");
            if (travelersWithRoles == null)
                return NotFound("No travelers found");

            
            var travelers = new List<Traveler>();
            foreach (var traveler in travelersWithRoles)
            {
                travelers.Add(new Traveler
                {
                    Id = traveler.Id,
                    UserName = traveler.UserName ?? "",
                    Email = traveler.Email ?? "",
                    PhoneNumber = traveler.PhoneNumber ?? ""
                });
            }

            return Ok(travelers);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Traveler>>> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound($"User with Id = {id} not found");

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest("Failed to delete user");

            var users = await _userManager.GetUsersInRoleAsync("Traveler");
            return Ok(users.Select(u => new { u.Id, u.UserName, u.Email, u.PhoneNumber }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Traveler>>> Update(string id, DtoUser user)
        {
            var dbUser = await _userManager.FindByIdAsync(id);
            if (dbUser == null)
                return NotFound($"User with Id = {id} not found");

            dbUser.UserName = user.UserName;
            dbUser.Email = user.Email;
            dbUser.PhoneNumber = user.PhoneNumber;
            var result = await _userManager.UpdateAsync(dbUser);
            if (!result.Succeeded)
                return BadRequest("Failed to update user");

            var users = await _userManager.GetUsersInRoleAsync("Traveler");
            return Ok(users.Select(u => new { u.Id, u.UserName, u.Email, u.PhoneNumber }));
        }
    }
}
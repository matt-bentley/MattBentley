using MattBentley.Server.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Authorize]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        public AdminController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration;

        [HttpGet("doadminoperation")]
        public IActionResult DoAdminOperation()
        {
            return Ok(new { message = "Some secure data only accessible by admin" });
        }

        [HttpGet("GetAdminRoom")]
        public IActionResult GetAdminRoom()
        {
            string adminKey = Configuration.GetValue<string>("AdminKey");
            ChatRoom adminRoom = new ChatRoom(adminKey)
            {
                Name = "Admin Room",
                CreatedBy = "Chat Server"
            };
            return Ok(adminRoom);
        }
    }
}

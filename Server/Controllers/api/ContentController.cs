using System.Linq;
using AspNetCoreSpa.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace AspNetCoreSpa.Server.Controllers.api
{
   [Route("api/[controller]")]
   [AllowAnonymous]
   public class ContentController : BaseController
   {
      public ContentController()
      {

      }

      [HttpGet("languages")]
      public IActionResult Languages()
      {
         throw new NotImplementedException();
      }

      [HttpGet]
      public IActionResult Get(string lang)
      {
         return Ok("English");
      }

      [HttpPost]
      [Route("update")]
      public IActionResult Post(ContentVm model)
      {
         throw new NotImplementedException();
      }



   }
}

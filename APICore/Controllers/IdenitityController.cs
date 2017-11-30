using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("identity")]
    [Authorize]
    public class IdentityController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var claims = User.Claims.Select(
                c => new {c.Type, c.Value}).ToList();

            claims.Insert(0, new { Type = "Timestamp", Value = DateTime.Now.ToString()});

            var fromIdsrvSamples = 
                new JsonResult(claims);
            return fromIdsrvSamples;
        }
    }
}
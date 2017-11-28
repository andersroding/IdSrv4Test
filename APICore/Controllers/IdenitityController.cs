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
            var mikaels = new JsonResult(from c in User.Claims select new { c.Type, c.Value });

            var fromIdsrvSamples = 
                new JsonResult(User.Claims.Select(
                    c => new {c.Type, c.Value}));
            return fromIdsrvSamples;
        }
    }
}
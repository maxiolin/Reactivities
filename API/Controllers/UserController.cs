using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class UserController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> LogIn(LogIn.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> LogIn(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }

        [AllowAnonymous]
        [HttpOptions("login")]
        public ActionResult<User> CORSLogin()
        {
            return Ok();
        }

        [AllowAnonymous]
        [HttpOptions()]
        public ActionResult<User> CORSUser()
        {
            return Ok();
        }

        [AllowAnonymous]
        [HttpOptions("register")]
        public ActionResult<User> CORSRegister()
        {
            return Ok();
        }
    }
}
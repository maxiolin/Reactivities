using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Error;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistance;

namespace Application.User
{
    public class LogIn
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJWTGenerator _jWTGenerator;
            public Handler(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, IJWTGenerator jWTGenerator)
            {
                _jWTGenerator = jWTGenerator;
                _signInManager = signInManager;
                _userManager = userManager;
            }

        public async Task<User> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
                throw new RestException(HttpStatusCode.Unauthorized);

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (result.Succeeded)
            {
                return new User
                {
                    DisplayName = user.DisplayName,
                    Token = _jWTGenerator.CreateToken(user),
                    UserName = user.UserName,
                    Image = null
                };
            }

            throw new RestException(HttpStatusCode.Unauthorized);
        }
    }
}
}
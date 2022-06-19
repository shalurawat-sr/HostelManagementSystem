using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Web;
using HostelManagment.Models;
using HostelManagment.Data.Repository;
using HostelManagment.Models.DBModels;
using HostelManagment.Models.ViewModels;

namespace HostelManagement.API.Controllers
{
    public class LoginController : ApiController
    {
        LoginRepository loginRepository = new LoginRepository();
        [HttpPost]
        public IHttpActionResult Authenticate([FromBody] LoginRequest login)
        {
            //var loginResponse = new LoginResponse { };
            LoginResponse userResponse = loginRepository.UserLoginCheck(login); 
            IHttpActionResult response;
            bool isUsernamePasswordValid = false; 
            if (userResponse != null)
                isUsernamePasswordValid = true; 
            if (isUsernamePasswordValid && userResponse.Username != null)
            {
                string token = createToken(userResponse.Username);
                //return the token
                userResponse.Token = token;
                userResponse.responseMsg.StatusCode = HttpStatusCode.OK;
                return Ok<LoginResponse>(userResponse);
            }
            else
            {
                // if credentials are not valid send unauthorized status code in response
                userResponse.responseMsg.StatusCode = HttpStatusCode.Unauthorized;
                response = ResponseMessage(userResponse.responseMsg);
                return response;
            }
        }
        private string createToken(string username)
        {
            //Set issued at date
            DateTime issuedAt = DateTime.UtcNow;
            //set the time when it expires
            DateTime expires = DateTime.UtcNow.AddDays(7); var tokenHandler = new JwtSecurityTokenHandler(); //create a identity and add claims to the user which we want to log in
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, username)
            }); 
            const string sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
            //var now = DateTime.UtcNow;
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);
            //create the jwt
            var token =
            (JwtSecurityToken)
            tokenHandler.CreateJwtSecurityToken(issuer: "http://localhost:50191", audience: "http://localhost:50191",
            subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token); return tokenString;
        }
    }
}


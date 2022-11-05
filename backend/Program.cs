using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PostDb>(o => o.UseInMemoryDatabase("PostList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(o =>
{
    o.SwaggerDoc("v1", new() { Title = "TodoApi", Version = "v1" });
    o.SupportNonNullableReferenceTypes();
    o.UseInlineDefinitionsForEnums();
    o.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JSON Web Token based security"
    });
    o.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
   });
});

builder.Services.AddAuthentication(o =>
{
    o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
});
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapPost("/login", [AllowAnonymous] (UserDto user) =>
{
    // Not a real authentication method. Simply give a token to anyone who asks.
    if (user.username != user.password)
    {
        return Results.Unauthorized();
    }

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, user.username),
            new Claim(JwtRegisteredClaimNames.Sub, user.username),
        }),
        Audience = builder.Configuration["Jwt:Audience"],
        Issuer = builder.Configuration["Jwt:Issuer"],
        SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"])),
            SecurityAlgorithms.HmacSha512Signature)
    };

    var jwtTokenHandler = new JwtSecurityTokenHandler();
    var token = jwtTokenHandler.CreateToken(tokenDescriptor);
    var jwtToken = jwtTokenHandler.WriteToken(token);

    return Results.Ok(jwtToken);
});

app.MapGet("/posts", [Authorize] async (PostDb db) =>
    await db.Posts.OrderByDescending(p => p.Id).ToListAsync());

app.MapPost("/posts", [Authorize] (ClaimsPrincipal user, PostDb db, [FromBody] PostRequest post) =>
{
    var name = user?.Identity?.Name?.ToLowerInvariant();
    if (string.IsNullOrEmpty(name))
    {
        return Results.Unauthorized();
    }

    var newPost = new Post
    {
        Username = name,
        Description = post.Description,
        Language = post.Language,
        Code = post.Code
    };

    db.Posts.Add(newPost);
    db.SaveChanges();
    return Results.Created($"/posts/{newPost.Id}", post);
});

app.Run();


using Microsoft.Extensions.DependencyInjection;
using RankedChoiceVotingApp.Classes;
using RankedChoiceVotingApp.Components;
using RankedChoiceVotingApp.Services;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddHttpClient()
    .AddRazorComponents()
    .AddInteractiveServerComponents();


builder.Services.AddScoped<IApiService, ApiService>();

builder.Services.Configure<ApiServiceSettings>(builder.Configuration.GetSection("ApiServiceSettings"));

builder.Configuration.AddIniFile("kafkaClient.properties");

builder.Configuration.AddEnvironmentVariables();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
  app.UseExceptionHandler("/Error", createScopeForErrors: true);
  app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();

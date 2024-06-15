
using Microsoft.Extensions.DependencyInjection;
using RankedChoiceVotingApp.Classes;
using RankedChoiceVotingApp.Components;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddHttpClient()
    .AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Configuration.AddIniFile("kafkaClient.properties");

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

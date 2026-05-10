using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using RankedChoiceVotingApp.Classes;
using RankedChoiceVotingApp.Components;
using RankedChoiceVotingApp.Services;
using RestSharp;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddHttpClient()
    .AddRazorComponents()
    .AddInteractiveServerComponents();


builder.Services.Configure<ApiServiceSettings>(builder.Configuration.GetSection("ApiServiceSettings"));

builder.Services.AddSingleton(sp =>
{
    var settings = sp.GetRequiredService<IOptions<ApiServiceSettings>>().Value;
    return new RestClient(settings.EndpointUrl);
});

builder.Services.AddScoped<IApiService, ApiService>();

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

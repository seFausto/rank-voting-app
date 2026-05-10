using Microsoft.Extensions.Options;
using RankedChoiceVotingApp.Classes;
using RestSharp;
using System.Text.Json;

namespace RankedChoiceVotingApp.Services
{
    public interface IApiService
    {
        Task<IEnumerable<string>> GetListOfCandidatesAsync(string rankingId);
        Task SubmitRankingAsync(string name);
    }

    public class ApiService : IApiService
    {
        private readonly ApiServiceSettings _apiServiceSettings;

        public ApiService(IOptions<ApiServiceSettings> apiServiceSettings)
        {
            _apiServiceSettings = apiServiceSettings.Value;
        }

        public async Task<IEnumerable<string>> GetListOfCandidatesAsync(string rankingId)
        {
            var client = new RestClient(_apiServiceSettings.EndpointUrl);
            var request = new RestRequest($"rankings/{rankingId}/candidates", Method.Get);
            var response = await client.ExecuteAsync<CandidateListDto>(request);

            if (response.IsSuccessStatusCode)
            {
                return response.Data?.Candidates.Select(x => x.Name) ?? [];
            }
            else
            {
                return [];
            }
        }

        public async Task SubmitRankingAsync(string name)
        {
            var client = new RestClient(_apiServiceSettings.EndpointUrl);
            var request = new RestRequest($"rankings/{name}", Method.Post);
            await client.ExecuteAsync(request);
        }

        public class CandidateListDto
        {
            public List<CandidateDto> Candidates { get; set; } = [];
        }

        public class CandidateDto
        {
            public string Name { get; set; } = string.Empty;
        }
    }
}

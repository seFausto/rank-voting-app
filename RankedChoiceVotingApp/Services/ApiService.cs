using Microsoft.Extensions.Options;
using RankedChoiceVotingApp.Classes;
using RestSharp;
using System.Text.Json;

namespace RankedChoiceVotingApp.Services
{
    public interface IApiService
    {
        Task<IEnumerable<string>> GetListOfCandidatesAsync(string rankingId);
        Task SubmitRankingAsync(Ranking ranking);
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

            var didVote = false;
            var userId = "test";

            var request = new RestRequest($"{rankingId}/candidates/{didVote}", Method.Post);
            request.AddBody(JsonSerializer.Serialize(userId));

            var response = await client.ExecuteAsync<CandidateListDto>(request);

            if (response.IsSuccessStatusCode)
            {
                return response.Data?.Candidates.Select(x => x.Name) ?? [];
            }
            else
            {
                return new List<string>();
            }
        }

        public async Task SubmitRankingAsync(Ranking ranking)
        {
            var client = new RestClient(_apiServiceSettings.EndpointUrl);
            var request = new RestRequest("", Method.Post);
            request.AddJsonBody(JsonSerializer.Serialize(ranking));
            await client.ExecuteAsync(request);
        }

        public class CandidateListDto
        {
            public List<CandidateDto> Candidates { get; set; }
        }

        public class CandidateDto
        {
            public string Name { get; set; }
        }

    }


}

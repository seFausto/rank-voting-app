using RankedChoiceVotingApp.Classes;
using RestSharp;

namespace RankedChoiceVotingApp.Services
{
    public interface IApiService
    {
        Task<IEnumerable<string>> GetListOfCandidatesAsync(string rankingId);
        Task SubmitRankingAsync(string name);
    }

    public class ApiService : IApiService
    {
        private const string GetCandidatesRoute = "rankings/{id}/candidates";
        private const string SubmitRankingRoute = "rankings/{name}";

        private readonly RestClient _client;

        public ApiService(RestClient client)
        {
            _client = client;
        }

        public async Task<IEnumerable<string>> GetListOfCandidatesAsync(string rankingId)
        {
            var request = new RestRequest(GetCandidatesRoute, Method.Get)
                .AddUrlSegment("id", rankingId);
            var response = await _client.ExecuteAsync<CandidateListDto>(request);

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
            var request = new RestRequest(SubmitRankingRoute, Method.Post)
                .AddUrlSegment("name", name);
            await _client.ExecuteAsync(request);
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

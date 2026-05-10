using RankedChoiceVotingApp.Classes;
using RestSharp;

namespace RankedChoiceVotingApp.Services
{
	public interface IApiService
	{
		Task<IEnumerable<string>> GetListOfCandidatesAsync(string rankingId);
		Task<string> SubmitRankingAsync(string name, IEnumerable<string> candidates);
	}

	public class ApiService : IApiService
	{
		private const string GetCandidatesRoute = "rankings/{id}/candidates";
		private const string SubmitRankingRoute = "rankings/{name}";

		private readonly RestClient _client;
		private readonly ILogger<ApiService> _logger;

		public ApiService(RestClient client, ILogger<ApiService> logger)
		{
			_client = client;
			_logger = logger;
		}

		public async Task<IEnumerable<string>> GetListOfCandidatesAsync(string rankingId)
		{
			var request = new RestRequest(GetCandidatesRoute, Method.Get)
				.AddUrlSegment("id", rankingId);

			var response = await _client.ExecuteAsync<CandidateListDto>(request);

			_logger.LogInformation("GET {Url} -> {Status}", response.ResponseUri, response.StatusCode);

			if (response.IsSuccessStatusCode)
			{
				return response.Data?.Candidates.Select(x => x.Name) ?? [];
			}
			else
			{
				_logger.LogWarning("GetListOfCandidates failed: {Error}", response.ErrorMessage);
				return [];
			}
		}

		public async Task<string> SubmitRankingAsync(string name, IEnumerable<string> candidates)
		{
			var request = new RestRequest(SubmitRankingRoute, Method.Post)
				.AddUrlSegment("name", name)
				.AddJsonBody(candidates);

			var response = await _client.ExecuteAsync(request);

			_logger.LogInformation("POST {Url} -> {Status}", response.ResponseUri, response.StatusCode);

			if (!response.IsSuccessStatusCode)
				_logger.LogWarning("SubmitRanking failed: {Error}", response.ErrorMessage);

			return response.Content?.Trim('"') ?? string.Empty;
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

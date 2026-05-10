using System.Text.Json;
using RankedChoiceVotingApp.Classes;
using RestSharp;

namespace RankedChoiceVotingApp.Services
{
	public interface IApiService
	{
		Task<IEnumerable<string>> GetListOfCandidatesAsync(string rankingId);
		Task<string> SubmitRankingAsync(string name, IEnumerable<string> candidates);
		Task<bool> SubmitBallotAsync(string rankingId, string userId, IEnumerable<string> rankedCandidates);
		Task<IEnumerable<string>> GetResultsAsync(string rankingId);
		Task<int> GetBallotCountAsync(string rankingId);
	}

	public class ApiService : IApiService
	{
		private const string GetCandidatesRoute = "rankings/{id}/candidates";
		private const string SubmitRankingRoute = "rankings/{name}";
		private const string SubmitBallotRoute = "rankings/{id}/ballots/{userId}";
		private const string GetResultsRoute = "rankings/{id}/results";
		private const string GetBallotCountRoute = "rankings/{id}/ballots/count";

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

			var response = await _client.ExecuteAsync(request);

			_logger.LogInformation("GET {Url} -> {Status}", response.ResponseUri, response.StatusCode);

			if (response.IsSuccessStatusCode && response.Content != null)
			{
				_logger.LogInformation("GetListOfCandidates response body: {Body}", response.Content);
				try
				{
					var dto = JsonSerializer.Deserialize<CandidateListDto>(response.Content,
						new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
					return dto?.Candidates ?? [];
				}
				catch (JsonException ex)
				{
					_logger.LogError(ex, "Failed to deserialize candidates response");
					return [];
				}
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

		public async Task<bool> SubmitBallotAsync(string rankingId, string userId, IEnumerable<string> rankedCandidates)
		{
			var request = new RestRequest(SubmitBallotRoute, Method.Post)
				.AddUrlSegment("id", rankingId)
				.AddUrlSegment("userId", userId)
				.AddJsonBody(rankedCandidates);

			var response = await _client.ExecuteAsync(request);

			_logger.LogInformation("POST {Url} -> {Status}", response.ResponseUri, response.StatusCode);

			if (!response.IsSuccessStatusCode)
				_logger.LogWarning("SubmitBallot failed: {Error}", response.ErrorMessage);

			return response.IsSuccessStatusCode;
		}

		public async Task<IEnumerable<string>> GetResultsAsync(string rankingId)
		{
			var request = new RestRequest(GetResultsRoute, Method.Get)
				.AddUrlSegment("id", rankingId);

			var response = await _client.ExecuteAsync(request);

			_logger.LogInformation("GET {Url} -> {Status}", response.ResponseUri, response.StatusCode);

			if (response.IsSuccessStatusCode && response.Content != null)
			{
				return JsonSerializer.Deserialize<List<string>>(response.Content,
					new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? [];
			}
			else
			{
				_logger.LogWarning("GetResults failed: {Error}", response.ErrorMessage);
				return [];
			}
		}

		public async Task<int> GetBallotCountAsync(string rankingId)
		{
			var request = new RestRequest(GetBallotCountRoute, Method.Get)
				.AddUrlSegment("id", rankingId);

			var response = await _client.ExecuteAsync(request);

			_logger.LogInformation("GET {Url} -> {Status}", response.ResponseUri, response.StatusCode);

			if (response.IsSuccessStatusCode && response.Content != null)
				return int.TryParse(response.Content.Trim('"'), out var count) ? count : 0;

			_logger.LogWarning("GetBallotCount failed: {Error}", response.ErrorMessage);
			return 0;
		}

		public class CandidateListDto
		{
			public List<string> Candidates { get; set; } = [];
		}
	}
}

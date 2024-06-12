namespace RankedChoiceVotingApp.Classes
{
    public class Candidate
    {
        public string RankingId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
    }

    public class Ranking
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public IEnumerable<Candidate> Candidates { get; set; } = [];
    }
}

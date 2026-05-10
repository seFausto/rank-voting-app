using NanoidDotNet;

namespace RankedChoiceVotingApp.Classes
{
    public static class Common
    {
        private const int _idSize = 8;

        public static string GenerateId()
        {
            return Nanoid.Generate(size: _idSize);
        }
    }
}

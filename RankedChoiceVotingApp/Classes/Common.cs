using NanoidDotNet;
using System.Configuration;

namespace RankedChoiceVotingApp.Classes
{
    public static class Common
    {
        private const int _idSize = 5;
        
        public static IEnumerable<KeyValuePair<string, string>> GetKafkaConfiguration(IConfigurationRoot configuration)
        {
            var configurationRoot = configuration;
            var iniProvider = configurationRoot.Providers
                        .FirstOrDefault(p => p is Microsoft.Extensions.Configuration.Ini.IniConfigurationProvider);
            var iniSettings = new List<KeyValuePair<string, string>>();

            if (iniProvider == null)
            {
                return iniSettings;
            }

            // Iterate through all the settings and add them to the list
            foreach (var setting in configuration.AsEnumerable())
            {
                if (iniProvider.TryGet(setting.Key, out var value))
                {
                    iniSettings.Add(new KeyValuePair<string, string>(setting.Key, value));
                }
            }
            return iniSettings;
        }

        public static string GenerateId() 
        {
            return Nanoid.Generate(size: _idSize);
        }
    }
}

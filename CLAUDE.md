# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ASP.NET Core 8 Blazor Server application for ranked-choice voting. Users create rankings (with candidates), which are published to a Confluent Cloud Kafka topic. Voters load an existing ranking by ID and see the candidate list fetched from a separate backend REST API.

## Commands

All commands run from `RankedChoiceVotingApp/`:

```powershell
dotnet build                   # build
dotnet run                     # run (http://localhost:5003)
dotnet watch                   # run with hot reload
dotnet run --launch-profile https  # run with HTTPS (https://localhost:7005)
```

Docker:
```powershell
docker build -f Dockerfile -t rank-voting-app .   # run from RankedChoiceVotingApp/
```

There are no test projects in this repo.

## Architecture

```
NewRanking page  →  Confluent.Kafka producer  →  Kafka topic: "new-ranking"
ExistingRanking page  →  IApiService (RestSharp)  →  backend REST API
```

**Key files:**
- `Program.cs` — service registration; reads Kafka config from `kafkaClient.properties` (INI) and backend URL from `appsettings.json`
- `Services/ApiService.cs` — `IApiService` implementation; calls `POST {EndpointUrl}/{rankingId}/candidates/{didVote}` with a userId body
- `Classes/Candidate.cs` — `Candidate` and `Ranking` domain models
- `Classes/Common.cs` — `GetKafkaConfiguration()` extracts INI settings for the Kafka `ProducerBuilder`; `GenerateId()` produces 5-char Nanoid strings used as ranking IDs
- `Components/Pages/NewRanking.razor` — creates a ranking, publishes it to Kafka on submit, displays the generated ID/URL
- `Components/Pages/ExistingRanking.razor` — route `/existing-ranking/{existingRankingId}`; calls `IApiService` on init to populate candidate list

## Configuration

- `appsettings.json` → `ApiServiceSettings:EndpointUrl` — base URL for the backend vote API (default: `https://localhost:44371/vote`)
- `kafkaClient.properties` — Confluent Cloud SASL credentials loaded as an INI configuration provider; **this file contains real credentials and should not be committed**

## Known Issues

- `Program.cs` line 1 contains the stray text `asdfasdf` which will cause a build error — remove it.
- `kafkaClient.properties` contains plaintext Confluent Cloud credentials. Rotate and move to user secrets or environment variables.

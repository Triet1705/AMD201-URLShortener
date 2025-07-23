FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY UrlShortener.sln .
COPY UrlShortener.Api/UrlShortener.Api.csproj UrlShortener.Api/
COPY UrlShortener.Application/UrlShortener.Application.csproj UrlShortener.Application/
COPY UrlShortener.Domain/UrlShortener.Domain.csproj UrlShortener.Domain/
COPY UrlShortener.Infrastructure/UrlShortener.Infrastructure.csproj UrlShortener.Infrastructure/

RUN dotnet restore UrlShortener.sln

COPY . .

WORKDIR /src/UrlShortener.Api
RUN dotnet publish -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
EXPOSE 8081
ENTRYPOINT ["dotnet", "UrlShortener.Api.dll"]

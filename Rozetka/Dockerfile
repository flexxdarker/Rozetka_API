# Learn about building .NET container images:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY ["Rozetka_Api/Rozetka_Api.csproj", "Rozetka_Api/"]
RUN dotnet restore "Rozetka_Api/Rozetka_Api.csproj"

# copy everything else and build app
COPY . .
WORKDIR /source/Rozetka_Api
RUN dotnet publish -o /app


# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Rozetka_Api.dll"]
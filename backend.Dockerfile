# https://docs.docker.com/samples/dotnetcore/

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

COPY backend/backend.csproj ./
COPY backend/.config ./.config
RUN dotnet tool restore
RUN dotnet restore
RUN dotnet ef database update

COPY backend ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "backend.dll"]

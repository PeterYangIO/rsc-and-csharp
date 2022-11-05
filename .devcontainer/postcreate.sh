# Pull docker images that are used in <CodeExecution />
docker image pull node:18-alpine
docker image pull python:3.9-alpine

# Install backend packages and run database migrations
cd backend
dotnet restore
dotnet tool restore
dotnet ef database update

# Install frontend packages
cd ../frontend
npm install

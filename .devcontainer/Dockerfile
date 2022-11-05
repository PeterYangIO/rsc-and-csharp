FROM mcr.microsoft.com/devcontainers/dotnet:0-6.0

ARG NODE_VERSION="lts/*"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

RUN dotnet tool install -g dotnet-ef
RUN export PATH="$PATH:/home/vscode/.dotnet/tools"
RUN cd backend
RUN dotnet ef database update

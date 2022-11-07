FROM node:18-alpine

COPY ./frontend .
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

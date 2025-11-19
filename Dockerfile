FROM node:22-alpine

WORKDIR /app

COPY package*.json . 
RUN npm install

COPY . .

# ✅ Fix Prisma engine compatibility
RUN apk add --no-cache openssl

# ✅ Generate Prisma client
RUN npx prisma generate

EXPOSE 5003

CMD ["sh", "-c", "npx prisma generate && node ./src/server.js"]
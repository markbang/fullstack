FROM oven/bun:1.4.0

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

EXPOSE 3000 3001 3002

CMD ["bun", "run", "dev"]

FROM node:20-alpine AS base

# 安装依赖阶段
FROM base AS deps

# 工作目录
WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./
# 安装依赖
RUN set -eux; \
    corepack enable; \
    pnpm install;

# 编译阶段
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN set -eux; \
    corepack enable; \
    pnpm run build-canary;

# 运行阶段
FROM base AS runner
WORKDIR /app

COPY --from=builder /app/.output .
COPY --from=builder /app/deploy/canary/entrypoint.sh ./entrypoint.sh
COPY --from=builder /app/deploy/canary/ecosystem.config.cjs ./ecosystem.config.cjs
COPY --from=builder /app/.env ./.env

RUN set -eux; \
    npm install -g pm2; \
    npm install dotenv; \
    chmod +x ./entrypoint.sh;

EXPOSE 80

ENTRYPOINT ["/app/entrypoint.sh"]
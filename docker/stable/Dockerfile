FROM node:lts AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

# 编译阶段
FROM base AS build
RUN set -eux; \
    pnpm i -f --frozen-lockfile; \
    pnpm run build-stable;

FROM base
COPY --from=build /app/.output /app/
COPY --from=build /app/docker/stable/entrypoint.sh /app/entrypoint.sh
COPY --from=build /app/docker/stable/ecosystem.config.cjs /app/ecosystem.config.cjs
# 后续通过自动化脚本生成
# COPY --from=build /app/.env /app/.env

RUN set -eux; \
    npm install -g pm2 dotenv --registry=https://registry.npmmirror.com; \
    chmod +x ./entrypoint.sh;

EXPOSE 80

ENTRYPOINT ["/app/entrypoint.sh"]
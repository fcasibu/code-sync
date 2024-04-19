FROM node:18-alpine AS alpine

FROM alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install -g turbo

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY . .
RUN turbo prune @code-sync/visualisation --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# First install dependencies (as they change less often)
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
COPY ./apps/web/.env.sample ./apps/web/.env.local

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN turbo build --filter=@code-sync/visualisation...
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 storybook
RUN adduser --system --uid 1001 storybook
USER storybook

# TODO: how can i decrease iamge size?
COPY --from=installer /app .

CMD npx live-server apps/visualisation/storybook-static

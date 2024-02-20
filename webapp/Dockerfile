ARG NODE_VERSION=lts-alpine3.18@sha256:6a5e5331ad99c311f0fa58bf838e9d5bb1c9fc940977149759f48d8e92029d07

FROM node:$NODE_VERSION as base
WORKDIR /app

FROM base as builder
COPY yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn fetch

COPY . .
RUN --mount=type=secret,id=sentry_auth_token export SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry_auth_token)"; \
  yarn build


# prepare runtime dependencies
RUN yarn workspaces focus --production

FROM base as runner
ARG PRODUCTION
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package.json .
COPY --from=builder /app/next.config.js .

# Block crawlers for staging deployments
RUN if [ -z "$PRODUCTION" ]; then mv -f public/robots.staging.txt public/robots.txt; \
  else rm -f public/robots.staging.txt; fi

# may not be necessary
# RUN chmod 1777 /tmp
# RUN chmod 1777 /app

USER 1000

EXPOSE 3000
ENV PORT 3000
CMD ["yarn", "start"]

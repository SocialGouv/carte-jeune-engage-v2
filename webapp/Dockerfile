ARG NODE_VERSION=lts-alpine3.18@sha256:ef5e088232f803cadb83326edb4731015f42961d23a11510b109c2c98cfbb945

FROM node:NODE_VERSION as base
WORKDIR /app

FROM base as dependencies
COPY yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn fetch

FROM base as builder

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

# prepare runtime dependencies
RUN yarn workspaces focus --production && yarn cache clean

FROM base as runner
ARG PRODUCTION
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

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

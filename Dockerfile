FROM node:18-bullseye-slim AS base

# Install required dependecies
FROM base as dependencies

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

# Build Application
FROM base AS builder

ENV PORT=3000 

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Application runner
FROM base AS runner

ENV NODE_ENV production

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
RUN mkdir build && \
    chown nextjs:nodejs build
    
COPY --from=builder --chown=nextjs:nodejs /app/build/standalone ./
COPY --from=builder --chown=nexjs:nodejs  /app/build ./build
COPY --from=builder --chown=nextjs:nodejs /app/build/static ./build/standalone/static

USER nextjs

EXPOSE $PORT

CMD ["node", "server.js"]

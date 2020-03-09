'use strict';
require('dotenv').config();
const fs = require('fs');

const Koa = require('koa');
const json = require('koa-json');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();
const publicRouter = new Router({ prefix: '/api' });

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  logger.error(err);
});
publicRouter.get('/maintenance-history/:vin', async (ctx, next) => {
  console.log(ctx.request.params);
  ctx.status = 200;
});

publicRouter.post('/maintenance-history', async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.status = 200;
  // ctx.body = 'done';
});

app.use(json());
app.use(bodyParser());
app.use(cors());

app.use(publicRouter.routes()).use(publicRouter.allowedMethods());

app.listen(process.env.PORT || 4000);

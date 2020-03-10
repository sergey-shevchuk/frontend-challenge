require('dotenv').config();

const Koa = require('koa');
const json = require('koa-json');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const ServiceHistory = require('./services/ServiceHistory');
const { vinToDetails, maintenanceDetails } = require('./data');

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
  console.error(err);
});

publicRouter.get('/maintenance-history/:vin', async (ctx, next) => {
  const { vin } = ctx.params;
  let serviceHistory = await ServiceHistory.getByVin(vin);
  if (!serviceHistory) {
    serviceHistory = {
      lastServiceMilage: 0,
      maintenancePerformed: []
    };
  }
  const { lastServiceMilage, maintenancePerformed } = serviceHistory;
  const vehicleInfo = vinToDetails[vin];
  const { requiredMaintenance } = vehicleInfo;
  const uiMaintenanceData = [];
  for (
    let i = 0, isPreviousCompleted = false;
    i < requiredMaintenance.length;
    i++
  ) {
    const maintenance = requiredMaintenance[i];
    const isCompleted = maintenancePerformed.includes(maintenance);
    let status;
    if (isCompleted) {
      status = 'completed';
    } else if (isPreviousCompleted || i === 0) {
      status = 'scheduled';
    } else {
      status = 'future';
    }
    uiMaintenanceData.push({
      id: maintenance,
      status
    });
    isPreviousCompleted = isCompleted;
  }
  ctx.body = {
    id: vehicleInfo.id,
    name: vehicleInfo.name,
    lastServiceMilage,
    maintenanceData: uiMaintenanceData,
    maintenanceDetails
  };
});

publicRouter.post('/maintenance-history/:vin', async (ctx, next) => {
  const { vin } = ctx.params;
  const { lastServiceMilage, maintenanceHash } = ctx.request.body;
  let serviceHistory = await ServiceHistory.getByVin(vin);
  if (!serviceHistory) {
    serviceHistory = {
      maintenancePerformed: []
    };
  }

  serviceHistory.lastServiceMilage = lastServiceMilage;
  serviceHistory.maintenancePerformed.push(maintenanceHash);

  await ServiceHistory.update(vin, serviceHistory);

  ctx.status = 200;
});

app.use(json());
app.use(bodyParser());
app.use(cors());

app.use(publicRouter.routes()).use(publicRouter.allowedMethods());

app.listen(process.env.PORT || 4000);

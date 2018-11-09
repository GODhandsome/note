const Router = require('koa-router');

const router = new Router();



router.get('/person', (ctx, next) => {
  console.log(ctx.query)
  ctx.body = ctx.query;
});

router.post('/person', (ctx, next) => {
  console.log(ctx)
  console.log(ctx.request.body)
  ctx.body = ctx.request.body;
});


module.exports = router;
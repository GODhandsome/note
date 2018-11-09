// 中间件
/*
像上面代码中的logger函数就叫做 "中间件"（middleware），
因为它处在 HTTP Request 和 HTTP Response 中间， 用来实现某种中间功能。 app.use() 用来加载中间件。
基本上， Koa 所有的功能都是通过中间件实现的， 前面例子里面的main也是中间件。 每个中间件默认接受两个参数，
 第一个参数是 Context 对象， 第二个参数是next函数。 只要调用next函数， 就可以把执行权转交给下一个中间件。
*/
const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}

app.use(logger)

app.listen(2195, () => {
  console.log('中间件链接成功')
})
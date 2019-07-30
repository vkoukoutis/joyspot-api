module.exports = factory

function factory(cookieParser, jwt, helmet, env) {
  const exports = { applyMiddleware }

  function applyMiddleware(app) {
    app.use(cookieParser(env.COOKIE_SECRET))
    app.use((req, res, next) => {
      const { token } = req.cookies

      if (token) {
        const { userId } = jwt.verify(token, env.JWT_SECRET)
        req.userId = userId
      }
      next()
    })
    app.use(setSecurityHeaders())
  }

  function setSecurityHeaders() {
    return helmet({
      crossdomain: true,
      dnsPrefetchControl: true,
      expectCt: false,
      frameguard: true,
      hidePoweredBy: true,
      hpkp: false,
      hsts: true,
      ieNoOpen: true,
      noCache: true,
      noSniff: true,
      referrerPolicy: { policy: 'no-referrer' },
      xssFilter: true
    })
  }

  return exports
}

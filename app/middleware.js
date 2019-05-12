import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import helmet from 'helmet'

const applyMiddleware = app => {
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use((req, res, next) => {
    const { token } = req.cookies

    if (token) {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = userId
    }
    next()
  })
  app.use(setSecurityHeaders())
}

const setSecurityHeaders = () => {
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

export { applyMiddleware }
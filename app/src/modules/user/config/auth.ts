export default {
  jwt: {
    secret: process.env.APP_SECRET || '10636819efc17a95d9ffff1dce450883',
    expiresIn: '1d'
  }
}

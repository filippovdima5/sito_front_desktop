const SERVER = typeof window === 'undefined'
const PRODUCTION = process.env.NODE_ENV === 'production'


function getApiEndpoint() {
  if (SERVER) return 'http://37.228.116.226:80/api/'
  return '/api/'
}

function getApiV2Endpoint() {
  if (PRODUCTION) return 'http://37.228.116.226:80/api/v2/'
  if (SERVER) return 'http://localhost:8080/api/v2/'
  return '/api/v2/'
}


export default {
  ssr: SERVER,
  api: {
    main: {
      endpoint: getApiEndpoint(),
      v2: getApiV2Endpoint()
    }
  }
}


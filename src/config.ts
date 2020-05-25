const SERVER = typeof window === 'undefined'


function getApiEndpoint() {
  if (SERVER) return 'http://37.228.116.226:80/api/'
  return '/api/'
}

function getApiV2Endpoint() {
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


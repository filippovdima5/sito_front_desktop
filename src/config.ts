const SERVER = typeof window === 'undefined'


function getApiEndpoint() {
  if (SERVER) return 'http://37.228.116.226:80/api/'
  return '/api/'
}


export default {
  ssr: SERVER,
  api: {
    main: {
      endpoint: getApiEndpoint()
    }
  }
}


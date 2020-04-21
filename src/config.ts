const SERVER = typeof window === 'undefined'
const LOCAL = !SERVER && window.location.hostname.includes('localhost') && process.env.NODE_ENV === 'development'

function getApiEndpoint() {
  //if (LOCAL) return '/api'
  if (SERVER) return 'http://37.228.116.226:80/api/'
  
  return '/api/'
}


export default {
  ssr: SERVER,
  local: LOCAL,
  api: {
    main: {
      endpoint: getApiEndpoint()
    }
  }
}


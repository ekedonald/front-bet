export const env = {
  API_LOCAL_API_BASE_URL: import.meta.env.VITE_APP_LOCAL_API_BASE_URL + '/api/v1/',
  API_STAGING_API_BASE_URL: import.meta.env.VITE_APP_STAGING_API_BASE_URL + '/api/v1/',
  API_PRODUCTION_API_BASE_URL: import.meta.env.VITE_APP_PRODUCTION_API_BASE_URL + '/api/v1/',
  APP_LOCAL_BASE_URL: import.meta.env.VITE_APP_LOCAL_BASE_URL,
  APP_STAGING_BASE_URL: import.meta.env.VITE_APP_STAGING_BASE_URL,
  APP_PRODUCTION_BASE_URL: import.meta.env.VITE_APP_PRODUCTION_BASE_URL,
  LANDING_PAGE_URL: import.meta.env.VITE_APP_LANDING_PAGE_URL,
  SOCKET_API_BASE_URL: import.meta.env.VITE_APP_API_BASE_URL,
  CLIENT_DOMAIN: import.meta.env.VITE_APP_CLIENT_DOMAIN,
  ADMIN_DOMAIN: import.meta.env.VITE_APP_ADMIN_DOMAIN,
  SEO_DOMAIN: import.meta.env.VITE_APP_SEO_DOMAIN,
  API_MOCKING: import.meta.env.VITE_APP_API_MOCKING,
};

const dev = {
	API_ENDPOINT_URL: env.API_LOCAL_API_BASE_URL
};

const prod = {
  API_ENDPOINT_URL: env.API_PRODUCTION_API_BASE_URL

};

const test = {
	API_ENDPOINT_URL: env.API_STAGING_API_BASE_URL
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}

export const _env = getEnv()
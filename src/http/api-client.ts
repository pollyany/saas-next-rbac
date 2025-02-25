import { CookiesFn, getCookie } from 'cookies-next/client'


import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'https://next-saas-api.rocketseat.dev',
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = serverCookies
        }
        const token = getCookie('token', { cookies: cookieStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
import { loadEnv } from 'vite'

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '')

export default {
  port: env.PORT
}
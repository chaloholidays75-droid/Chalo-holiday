import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import partnerHandler from './api/partner'

function partnerApiDevPlugin() {
  return {
    name: 'partner-api-dev',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use('/api/partner', async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method !== 'POST') {
          next()
          return
        }

        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
          }

          const rawBody = Buffer.concat(chunks).toString('utf8')
          let parsedBody = {}

          if (rawBody) {
            try {
              parsedBody = JSON.parse(rawBody)
            } catch {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Invalid JSON body.' }))
              return
            }
          }

          await partnerHandler(
            {
              method: req.method,
              body: parsedBody,
            },
            {
              status(code: number) {
                res.statusCode = code
                return {
                  json(payload: unknown) {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(payload))
                  },
                }
              },
            },
          )
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : 'Unexpected server error.',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    partnerApiDevPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

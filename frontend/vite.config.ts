import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import oxlintPlugin from 'vite-plugin-oxlint'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ command }): UserConfig => {
  const isBuild = command === 'build'

  return {
    plugins: [
      react(),
      !isBuild && oxlintPlugin(),
      tsconfigPaths(),
    ].filter(Boolean),
  }
})

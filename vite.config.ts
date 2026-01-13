import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'GeojsonToWkt',
            fileName: 'geojson-to-wkt',
            formats: ['es', 'cjs']
        }
    }
})

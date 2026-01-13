import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'GeoJSONToWKT',
            fileName: 'geojson-to-wkt',
            formats: ['es']
        }
    }
})

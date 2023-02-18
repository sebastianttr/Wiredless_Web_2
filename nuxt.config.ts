// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        strict: true
    },
    ssr: false,
    //vite: {
    //   server: {
    //     hmr: false
     //   }
    // },
    plugins:[
        {src:'~/plugins/bus', ssr: false}
    ],
    css: [
        "~/assets/global.css"
    ]
})

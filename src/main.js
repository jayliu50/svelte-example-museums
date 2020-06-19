// Initialize the Svelte app and inject it in the DOM
import App from './App.svelte'
import './polyfills'

const app = new App({
    target: document.body
})

export default app

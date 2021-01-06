import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import axios from 'axios'
import VueAxios from 'vue-axios'
import { isLoggedIn, setRestEndPoint, getRestEndPoint, logoutUser, getAuthToken, setAuthToken, getUserInfo } from './components/auth/auth'

// import vuetify from './plugins/vuetify' // path to vuetify export
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'

router.beforeEach((to, from, next) => {
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    if (!isLoggedIn() && to.path !== '/auth') {
        if (getUserInfo()) {
            logoutUser(function () { next({ name: 'Login' }) })
        } else {
            next({ name: 'Login' })
        }
    } else if (to.path !== '/auth') {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
        next()
    } else {
        next()
    }
});

setRestEndPoint(process.env.VUE_APP_BASE_REST)
const app = createApp(App)
const base_url = process.env.VUE_APP_BASE_URL + ":" + process.env.VUE_APP_PORT
app.use(VueAxios, axios)
app.use(router)
// app.use(Vuetify)
app.mixin({
    methods: {
        base_url() { return base_url },
        rest_url() { return getRestEndPoint() },
        isLoggedIn() { return isLoggedIn() },
        logout() { logoutUser(function () { router.push({ name: 'Login' }) }) },
        setAuthToken(token) { setAuthToken(token) },
        getAuthToken() { return getAuthToken() },
        getUserInfo() { return getUserInfo() },
        get_error_msg(error) {
            error = error.response
            let msg = error.data.error
            msg = msg ? msg : error.data.status
            msg = msg ? msg : ""
            alert(error.status + " " + msg)
        }
    }
})
app.mount("#app")

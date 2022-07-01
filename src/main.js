import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import VueCookies from 'vue-cookies';
import AlertMsg from '@/components/AlertMsg/AlertMsg.vue';
import VHSelect from '@/components/VH-Select/VH-Select.vue';
import VHPage from '@/components/VH-Page/VH-Page.vue';
import Headers from '@/views/header/header.vue';
import VHDialog from '@/components/VH-Dialog/VH-Dialog.vue';

const app = createApp(App);
app.use(router);
app.use(createPinia);
app.use(VueCookies);
app.component("AlertMsg",AlertMsg)
app.component("VHSelect",VHSelect)
app.component("VHPage",VHPage)
app.component("Headers",Headers)
app.component("VHDialog",VHDialog)
app.mount('#app');
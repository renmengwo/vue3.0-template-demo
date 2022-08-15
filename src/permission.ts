import NProgress from 'nprogress'
import router from "@/router";
import "nprogress/nprogress.css"

router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});

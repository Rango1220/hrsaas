import router from '@/router'
import store from '@/store' // 引入store实例
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/404', '/login']
// next() 放过 next(false)跳转终止  next(地址)跳转到某个地址
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()// 手动强制关闭一次,防止手动切换地址时进度条不关的问题
})

router.afterEach(() => {
  nprogress.done()
})

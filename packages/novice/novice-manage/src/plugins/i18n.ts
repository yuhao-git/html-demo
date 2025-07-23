import type { App } from 'vue';
import { provide } from 'vue';

// 自定义双击指令
export const dblclick = {
  mounted(el: HTMLElement, binding: any) {
    el.addEventListener('dblclick', binding.value);
  },
  unmounted(el: HTMLElement, binding: any) {
    el.removeEventListener('dblclick', binding.value);
  }
};


// 自定义右键指令
export const rightclick = {
  mounted(el: HTMLElement, binding: any) {
    // 阻止默认事件
    el.oncontextmenu = function (e: any) {
      e.preventDefault();
    };
    el.addEventListener('contextmenu', binding.value);
  },
  unmounted(el: HTMLElement, binding: any) {
    el.removeEventListener('contextmenu', binding.value);
  }
};

// 国际化 插件
function i18n(app) {
  // 注入一个全局可用的 $translate() 方法
  app.config.globalProperties.$translate = (key) => {
    // 获取 `options` 对象的深层属性
    // 使用 `key` 作为索引
    const options = {
      'zh-CN': {
        'username': '用户名',
        'password': '密码',
        'login': '登录',
        'register': '注册',
        'forget': '忘记密码',
        'third': '第三方登录',
        'third.tips': '第三方登录提示',
        'third.tips.content': '请选择第三方登录方式',
        'third.tips.cancel': '取消',
      },
      'en-US': {
        'username': 'Username',
        'password': 'Password',
        'login': 'Login',
        'register': 'Register',
        'forget': 'Forget Password',
        'third': 'Third Party Login',
        'third.tips': 'Third Party Login Tips',
        'third.tips.content': 'Please select the third-party login method',
      }
    };
    return key.split('.').reduce((o, i) => {
      if (o) return o[i]
    }, options)
  }
}


export default {
  install: (app: App, options: any): void => {
    // 双击指令
    app.directive('dblclick', dblclick);
    // 右键指令
    app.directive('rightclick', rightclick);
    i18n(app);
  }
};
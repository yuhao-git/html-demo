module.exports = {
  lang: 'en-US',
  title: 'YUBAIBAI',
  description: 'Just playing around.',
  markdown: {
    lineNumbers: true, // 开启行号
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],
  vue: {
    reactivityTransform: true
  },
  themeConfig: {
    logo: '../images/logo.png',
    nav: [
      {
        text: 'vitepress',
        link: '/start/markdownExtensions.md',
        activeMatch: '/start/markdownExtensions.md'
      },
      // {
      //   text: '嵌套链接', items: [
      //     {
      //       text: 'Twitter',
      //       link: 'https://twitter.com/vite_js'
      //     },
      //   ]
      // }
      {
        text: 'vue3',
        link: '/vue3/index.md',
        activeMatch: '/vue3/index.md'
      },
    ],
    sidebar: {
      '/start/': [
        {
          text: "vitepress",
          collapsible: true,
          items: [
            {
              text: 'markdown 扩展',
              link: '/start/markdownExtensions'
            },
            {
              text: '在 Markdown 中使用 Vue',
              link: '/start/vue'
            },
            {
              text: '全局计算属性',
              link: '../start/computed'
            },
          ]
        }
      ],
      '/vue3/': [
        {
          text: "typescript in vue",
          collapsible: true,
          items: [
            {
              text: 'vue3',
              link: '/vue3/index.md'
            },
            {
              text: 'css换肤',
              link: '/vue3/theme.md'
            },
            {
              text: 'less换肤',
              link: '/vue3/themeLess.md'
            },
          ]
        }
      ],
    },
    // 语言切换
    // localeLinks: {
    //   text: 'English',
    //   items: [
    //     { text: '简体中文', link: 'https://cn.vitejs.dev' },
    //     { text: '日本語', link: 'https://ja.vitejs.dev' },
    //     { text: 'Español', link: 'https://es.vitejs.dev' }
    //   ]
    // },
    // 社交链接
    // socialLinks: [
    //   { icon: 'twitter', link: 'https://twitter.com/vite_js' },
    //   { icon: 'discord', link: 'https://chat.vitejs.dev' },
    //   { icon: 'github', link: 'https://github.com/vitejs/vite' }
    // ],
    // 搜索
    // algolia: {
    //   appId: '7H67QR5P0A',
    //   apiKey: 'deaab78bcdfe96b599497d25acc6460e',
    //   indexName: 'vitejs',
    //   searchParameters: {
    //     facetFilters: ['tags:en']
    //   }
    // },
    // 底部
    // footer: {
    //   message: `Released under the MIT License. `,
    //   copyright: 'Copyright © 2019-present Evan You & Vite Contributors'
    // },

  }
}


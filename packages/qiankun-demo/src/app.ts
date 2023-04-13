const initApp = () => {
  return new Promise((resolve) => {
    console.log(new Date().getTime());
    setTimeout(() => {
      console.log(new Date().getTime());
      resolve({
        routes: [
          {
            path: '/micro1',
            microApp: 'micro1',
            microAppProps: {
              autoSetLoading: true,
              className: 'fs-micro-wraper',
              wrapperClassName: 'fs-micro-container',
            },
          },
          {
            path: '/micro2',
            microApp: 'micro2',
            microAppProps: {
              autoSetLoading: true,
              className: 'fs-micro-wraper',
              wrapperClassName: 'fs-micro-container',
            },
          },
        ],
        apps: [
          {
            name: 'micro1',
            activePath: '/micro1',
            entry: 'http://localhost:9000/micro1',
          },
          {
            name: 'micro2',
            activePath: '/micro2',
            entry: 'http://localhost:9001/micro',
          },
        ],
      });
    }, 2000);
  });
};

// 从接口中获取子应用配置，export 出的 qiankun 变量是一个 promise
export const qiankun = initApp().then(({ routes, apps }: any) => ({
  // 注册子应用信息
  apps,
  routes,
  // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
  lifeCycles: {
    afterMount: (props) => {
      console.log(props);
    },
  },
}));

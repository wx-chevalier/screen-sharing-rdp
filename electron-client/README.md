![](https://i.postimg.cc/0N7w0mnN/image.png)

# m-fe/react-ts-electron

mf-rte 是 [fe-boilerplates](https://github.com/wx-chevalier/fe-boilerplates) 的一部分，在 [Web 开发导论/微前端与大前端](https://github.com/wx-chevalier/Web-Series)一文中，笔者简述了微服务与微前端的设计理念以及微前端的潜在可行方案。微服务与微前端，都是希望将某个单一的单体应用，转化为多个可以独立运行、独立开发、独立部署、独立维护的服务或者应用的聚合，从而满足业务快速变化及分布式多团队并行开发的需求。如康威定律(Conway’s Law)所言，设计系统的组织，其产生的设计和架构等价于组织间的沟通结构；微服务与微前端不仅仅是技术架构的变化，还包含了组织方式、沟通方式的变化。微服务与微前端原理和软件工程，面向对象设计中的原理同样相通，都是遵循单一职责(Single Responsibility)、关注分离(Separation of Concerns)、模块化(Modularity)与分而治之(Divide & Conquer)等基本的原则。

![微前端项目结构](https://user-images.githubusercontent.com/5803001/44003230-de68ac5c-9e81-11e8-81f5-8092f7a9b421.png)

当我们考量项目框架、模板或者脚手架的时候，首先想到的点就是希望尽可能对上层屏蔽细节，但是对于长期维护的、多人协作的中大型项目而言，如果项目的主导者直接使用了部分抽象的脚手架，不免会给未来的更新、迭代带来一定的技术负债；同时，目前也有很多成熟的工程化脚手架，因此笔者选择以项目模板的形式抽象出微前端中所需要的部分。尽可能地遵循简约、直观的原则，减少抽象/Magic Function 等；大型项目可能会抽象出专用的开发工具流，但是对于大部分项目而言，在现有框架/工具链的基础上进行适当封装会是较优选择。

# Develop

```sh
# 拉取并且提取出子项目
$ git clone https://github.com/wx-chevalier/m-fe-rte

# 添加全局的依赖更新工具
$ yarn global add npm-check-updates npm-run-all copyfiles cross-env

# 为各个子项目安装依赖，以及链接各个子项目
$ ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ ELECTRON_CUSTOM_DIR=8.2.0 yarn install --registry https://registry.npm.taobao.org/

# 编译依赖
$ yarn build
# 启用 Web App & Node 的开发服务器
$ yarn run dev
# 打开 Electron 应用
$ yarn start

# 执行 Lint 操作
$ yarn lint

# 构建
# 构建应用程序代码
$ npm run build
# 构建对应的 Windows 系统发布包
$ npm run build:exe
```

值得说明的是，微前端作为概念对于不同人承载了不同的考量，其实现方式、落地路径也是见仁见智，若有不妥，敬请指教。

## Tips

1. 因为有指定 Windows 平台的依赖包存在，因此在 `*nix` 系统中运行 yanr 系列命令会报 incompatible platform 的错误。解决方法：在命令中加入 --ignore-platform 选项。

2. 为了解决 Windows 平台上的应用拖动问题，使用了 `-webkit-app-region` CSS 属性，这也导致了继承了该规则的元素无法响应点击事件。解决方法：不需要响应拖动的元素设置 `-webkit-app-region: no-drag;`

## Windows XP

- 下载 miniblink 的编译文件

下载最新的 miniblink 编译文件。例如：我们选择这个版本 2018-10-11 版，SDK 下载地址：https://pan.baidu.com/s/1sGkmAF34vZxXJj8dfekCXA

- 找出替换 electron 的关键文件

下载后，解压文件，将 electron 必要的几个文件或者文件夹拷贝出来。miniblink 替换 electron 用到 3 个文件：文件 node.dll 和 mini-electron.exe 文件夹 resources。我们把这个几个文件拷贝到 D:\myApp\ 中：

```
- D:\myApp\
  - node.dll
  - `mini-electron.exe`
  - resources\
     - miniblink.asar\
    3.3 从 electron 迁移到 miniblink
    拿 桌面版脑图 来举例，下载最新的 桌面版脑图编译文件 。
```

我们下载文件 DesktopNaotu-win32-ia32.zip ，解压后可以看到 桌面版脑图 编译后的目录结构如下：

```
- DesktopNaotu-win32-ia32\

  - electron 相关的其他文件(dll,exe,...)
  - resources\
     - app\
     - electron.asar
    我们把资源文件夹 resources\ 下的 electron.asar 和 app 拷贝到，miniblink 的 resources\ 下。

- D:\myApp\

  - node.dll
  - mini-electron.exe
  - resources\
     - miniblink.asar\
     - app\
     - electron.asar
    到这一步，可以打开 mini-electron.exe ，从 miniblink 中打开应用程序了。我们继续优化。
```

- 优化应用程序

修改应用程序名称。如：把 mini-electron.exe 改为 DesktopNaotu.exe，修改图标和文件信息。通过 reshacker 来修改，360 可能会提示病毒操作，全部允许即可。完成，我把示例程序放到 Release 中，感兴趣的可以下载查看。

## Nav | 关联项目

- [m-fe-configs](https://github.com/wx-chevalier/m-fe-configs)：Common Dev Configs(ESLint, Prettier, Husky, etc.) for Micro-Frontend Apps

- [m-fe-rtw](https://github.com/wx-chevalier/m-fe-rtw): Micro-Frontend boilerplate with React & TypeScript & Webpack, for complicated cooperative applications. | 微前端项目模板

- [m-fe-vtw](https://github.com/wx-chevalier/m-fe-vtw): Micro-Frontend boilerplate with Vue & TypeScript & Webpack, for complicated cooperative applications. | 微前端项目模板

- [m-fe-rm](https://github.com/wx-chevalier/m-fe-rm): 基于 React & TS & Webpack & APICloud 提供快速移动端应用开发的能力

- [m-fe-taro](https://github.com/wx-chevalier/m-fe-taro): 基于 Taro & TS 的多端小程序开发模板。

- [m-fe-scaffold](https://github.com/wx-chevalier/m-fe-scaffold/): Cli Toolkits for Web Development & Deploy on Kubernetes，微前端实践中沉淀的一系列脚手架工具。

- [m-fe-libs](https://github.com/wx-chevalier/m-fe-libs): Micro-Frontend boilerplate with React & TypeScript & Webpack, for complicated cooperative applications. | 微前端项目模板

--

- [react-snippets](https://github.com/wx-chevalier/react-snippets): React Snippets(.ts/.tsx), about design patterns/techniques used while developing with React and TypeScript.

- [vue-snippets](https://github.com/wx-chevalier/vue-snippets): Vue Snippets(.js/.ts), about design patterns/techniques used while developing with Vue and JavaScript/TypeScript.

- [fractal-components](https://github.com/wx-chevalier/fractal-components): Massive Fractal Components in Several Libraries(Vanilla, React, Vue, Weapp), for building your great apps easily again

- [Legoble](https://github.com/wx-chevalier/Legoble): Build your apps like stacking Lego blocks 💫 总想自己实现一款可视化配置的动态应用构建工具，动态表单、动态布局、动态报告、动态规则、动态选择、动态流程

# About

## Acknowledgements

- [electron-process-reporter](https://github.com/getstation/electron-process-reporter)

- [electron-about-window](https://github.com/rhysd/electron-about-window)

- [node-auto-launch](https://github.com/Teamwork/node-auto-launch)

- [nucleus](https://github.com/atlassian/nucleus): A configurable and versatile update server for all your Electron apps.

- [jsmpeg-vnc](https://github.com/phoboslab/jsmpeg-vnc): A low latency, high framerate screen sharing server for Windows and client for browsers.

## Todos

- [x] 使用 ESLint 替换 TSLint
- [x] 将现有项目中的通用配置抽出到 m-fe-configs 中

## Copyright & More | 延伸阅读

笔者所有文章遵循 [知识共享 署名-非商业性使用-禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)，欢迎转载，尊重版权。您还可以前往 [NGTE Books](https://ng-tech.icu/books/) 主页浏览包含知识体系、编程语言、软件工程、模式与架构、Web 与大前端、服务端开发实践与工程架构、分布式基础架构、人工智能与深度学习、产品运营与创业等多类目的书籍列表：

![NGTE Books](https://s2.ax1x.com/2020/01/18/19uXtI.png)

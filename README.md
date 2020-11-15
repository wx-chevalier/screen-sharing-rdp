[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/wx-chevalier/dd-screen-sharing-rdp">
    <img src="https://s2.ax1x.com/2020/01/06/lr21MT.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">dd-screen-sharing-rdp</h3>

  <p align="center">
    基于 Electron 的 Windows 软件管理、文件监听以及屏幕共享与控制
    <br />
    <a href="https://github.com/wx-chevalier/dd-screen-sharing-rdp"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/wx-chevalier/dd-screen-sharing-rdp">View Demo</a>
    ·
    <a href="https://github.com/wx-chevalier/dd-screen-sharing-rdp/issues">Report Bug</a>
    ·
    <a href="https://github.com/wx-chevalier/dd-screen-sharing-rdp/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

# Introduction

项目中我们使用了 Electron 进行 Windows 设备上的软件安装、软件运行监控与日志动态监控，使用 [jsmpeg-vnc](https://github.com/phoboslab/jsmpeg-vnc) 提供的 Windows 上实时屏幕共享的能力，其基于 WebSocket 传输标准 VNC 协议的数据；如果需要进行公网 WebSocket 转发可以自行搭建 WebSocket Forward 服务。

目前本项目正在尝试使用 Mpegts + WebSocket 方式以及原生桌面流推向 WebRTC 两种方式，分别参阅不同的目录，对于 Electron 客户端请参阅 [m-fe-electron](https://github.com/wx-chevalier/m-fe-electron)。

## Nav | 导航

# Getting Started

To get a local copy up and running follow these simple steps.

## Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm

```sh
npm install npm@latest -g
```

## Installation

1. Clone the dd-screen-sharing-rdp

```sh
git clone https://github.com/wx-chevalier/dd-screen-sharing-rdp.git
```

2. Install NPM packages

```sh
npm install
```

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

# About

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/wx-chevalier/dd-screen-sharing-rdp/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Awesome-Lists #Project#](https://github.com/wx-chevalier/Awesome-Lists): 📚 Guide to Galaxy, curated, worthy and up-to-date links/reading list for ITCS-Coding/Algorithm/SoftwareArchitecture/AI. 💫 ITCS-编程/算法/软件架构/人工智能等领域的文章/书籍/资料/项目链接精选。

- [Awesome-CS-Books #Project#](https://github.com/wx-chevalier/Awesome-CS-Books): :books: Awesome CS Books/Series(.pdf by git lfs) Warehouse for Geeks, ProgrammingLanguage, SoftwareEngineering, Web, AI, ServerSideApplication, Infrastructure, FE etc. :dizzy: 优秀计算机科学与技术领域相关的书籍归档。

- [jsmpeg #Project#](https://github.com/phoboslab/jsmpeg): JSMpeg is a Video Player written in JavaScript. It consists of an MPEG-TS demuxer, MPEG1 video & MP2 audio decoders, WebGL & Canvas2D renderers and WebAudio sound output. JSMpeg can load static videos via Ajax and allows low latency streaming (~50ms) via WebSockets.

- [neko #Project#](https://github.com/nurdism/neko): A self hosted virtual browser (rabb.it clone) that runs in docker.

- [Apache Guacamole #Project#](https://guacamole.apache.org/): Apache Guacamole is a clientless remote desktop gateway. It supports standard protocols like VNC, RDP, and SSH.

## Copyright & More | 延伸阅读

笔者所有文章遵循[知识共享 署名 - 非商业性使用 - 禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)，欢迎转载，尊重版权。您还可以前往 [NGTE Books](https://ng-tech.icu/books/) 主页浏览包含知识体系、编程语言、软件工程、模式与架构、Web 与大前端、服务端开发实践与工程架构、分布式基础架构、人工智能与深度学习、产品运营与创业等多类目的书籍列表：

[![NGTE Books](https://s2.ax1x.com/2020/01/18/19uXtI.png)](https://ng-tech.icu/books/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/wx-chevalier/dd-screen-sharing-rdp.svg?style=flat-square
[contributors-url]: https://github.com/wx-chevalier/dd-screen-sharing-rdp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/wx-chevalier/dd-screen-sharing-rdp.svg?style=flat-square
[forks-url]: https://github.com/wx-chevalier/dd-screen-sharing-rdp/network/members
[stars-shield]: https://img.shields.io/github/stars/wx-chevalier/dd-screen-sharing-rdp.svg?style=flat-square
[stars-url]: https://github.com/wx-chevalier/dd-screen-sharing-rdp/stargazers
[issues-shield]: https://img.shields.io/github/issues/wx-chevalier/dd-screen-sharing-rdp.svg?style=flat-square
[issues-url]: https://github.com/wx-chevalier/dd-screen-sharing-rdp/issues
[license-shield]: https://img.shields.io/github/license/wx-chevalier/dd-screen-sharing-rdp.svg?style=flat-square
[license-url]: https://github.com/wx-chevalier/dd-screen-sharing-rdp/blob/master/LICENSE.txt

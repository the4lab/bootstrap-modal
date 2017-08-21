# bootstrap-modal
基于bootstrap的弹出框组件

1.js核心。static/js/pop.js 为弹出框组件的js核心，static/js里面剩下的js文件都是第三方类库，pop.js需要把Pop(构造函数)变量暴露出来给外面使用，本例中是直接赋值给全局变量，根据项目需求决定是哪种方式暴露。此外，还可根据需求在Pop.js中对Pop.prototype进行扩展。

2.css核心。static/css/index.css 是弹出框组件css核心，里面是对每种弹出框样式的汇总。static/css 里面剩下的css文件都是第三方css库。

3.icon，弹出框组件的icon是 static/fonts 提供的。

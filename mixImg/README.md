## 需求背景
将两张图片合成并提供用户下载       

## 兼容问题
因为canvas是h5新增元素，所以首先ie10以下就不考虑了。实测67的谷歌以下方法是都可以实现的。

## canvas介绍
Canvas API（画布）是在HTML5中新增的标签用于在网页实时生成图像，并且可以操作图像内容，基本上它是一个可以用JavaScript操作的位图。<canvas> 元素给网页中的视觉展示带来了革命性的变化， 能够实现各种让人惊叹的视觉效果和高效的动画甚至游戏。

## canvas特点
![20170120104336764](https://github.com/GODhandsome/note/blob/master/mixImg/read.png)

## 注意点
1.  canvas使用css设置宽高会认为是在默认宽高300:150上进行缩放，图像会变形。
2.  canvas有层级关系，图像引入记得处理异步问题，避免层级混乱。
3.  不通过 CORS 就在画布中使用的图片，会污染画布。一旦画布被污染，你就无法读取其数据。不能再使用画布的 toBlob(), toDataURL() 或 getImageData() 方法，调用它们会抛出安全错误。所以需要给图片配置`crossorigin`属性为`anonymous`并且需要给跨域图片合适的 CORS 响应头(参考文档[CORS图片](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image))。

## 推荐书籍
[HTML5 Canvas核心技术](https://book.douban.com/subject/24533314/)

## 实现方式
1.  通过canvas提供的getContext，drawImage方法以及图片onload控制层级关系完成绘图。
2.  使用 toBlob()或toDataURL()取得相应数据对象进行后续上传下载操作。
3.  使用a标签h5新增dowload属性以及URL.createObjectURL(blob)生成下载链接并手动触发a标签click事件进行下载

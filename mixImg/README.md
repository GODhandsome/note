## 需求背景
将两张图片合成并提供用户下载       
[demo](/uploads/32be6864172f400bf7278009077ccdae/mixImg.zip),演示需要开启本地服务，推荐http-server快速开启

## 兼容问题
因为canvas是h5新增元素，所以首先ie10以下就不考虑了。67的谷歌以下方法是都可以实现的。

## 实现方式
桌面已有一个id为can的canvas元素，执行下方函数可以在该canvas上合成图片，在canvas上右键是有图片另存为选项的，onload是为了避免图片加载速度的不同造成的层级影响。canvas的宽高不要使用css设置，因为canvas默认是300：150，在css设置会认为是在该大小上进行放大或缩小，比例不同图像还会变形。    
`function mixImg() {
    const content = document.getElementById('can');
    content.width = 600;
    content.height = 300;
    const context = content.getContext('2d');
    const bg = new Image();
    bg.src = './123.jpg';
    bg.onload = function () {
      const qr = new Image();
      qr.src = './mpQR@2x.png';
      context.drawImage(bg, 0, 0, content.width, content.height);
      qr.onload = function () {
        context.drawImage(qr, (content.width - 100) / 2, (content.height - 100) / 2, 100, 100);
      }
    }
  }`

canvas自带toDataURL方法，可以把canvas转成base64编码，执行下面的方法可以将canvas转成一个blob二进制对象，方便进行上传与下载 。但其实canvas自带一个toBlob方法可以直接将canvas转成blob对象。canvas不通过CORS使用图片会污染画布，这个时候调用 toBlob(), toDataURL()会抛出安全错误，需要给图片对象添加`crossOrigin = "Anonymous"`属性。并且这里需要有一个可以对图片响应正确 Access-Control-Allow-Origin 响应头的服务器[CORS图片](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image)。        
` function base64Img2Blob(code) {
    var parts = code.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }`              


点击下载的时候我们就可以新建a标签并利用h5新增的dowload属性,将blob对象生成一个url对象就可以进行下载了。我们下载的时候可能会有不展示图片直接就能点击进行下载的情况，可以直接`document.createElement('canvas')`生成一个canvas进行操作                     
` function downloadFile(fileName, content) {
    var aLink = document.createElement('a');
    var blob = base64Img2Blob(content);
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
  }`

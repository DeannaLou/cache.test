var xmlHttp = createXHR();
xmlHttp.onreadystatechange = httpStateChange;
function httpStateChange() {
  //判断异步调用是否完成
  if(xmlHttp.readyState == 4) {
    //判断异步调用是否成功,如果成功开始局部更新数据
    if(xmlHttp.status == 200 ) {
      document.getElementById('res').innerHTML = xmlHttp.responseText;
    } else {
      //如果异步调用未成功,
      alert("Problem retrieving XML data:" + xmlHttp.statusText);
    }
  }
}
function createXHR() {
  var xmlHttp;
  /*兼容ie部分省略*/
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp=new XMLHttpRequest();
  } catch (e) {
    // Internet Explorer
    try {
      // Internet Explorer 6.0+
      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        // Internet Explorer 5.0+
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert("您的浏览器不支持AJAX！");
        return false;
      }
    }
  }
  return xmlHttp;
}

function GET(url, header) {
  xmlHttp.open("GET", url, true);
  if (header) {
    for (var prop in header) {
      xmlHttp.setRequestHeader(prop, header[prop]);
    }
  }
  xmlHttp.send(null);
};
function clickMe() {
  GET("/info", { "Cache-Control": "no-cache" });
  //GET("/info", {"Cache-Control": "max-age=5"});
  //GET("/info");
}
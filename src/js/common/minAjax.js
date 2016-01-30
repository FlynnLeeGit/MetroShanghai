const minAjax = (config) => {
    if (!config.url) {
        throw new Error('请填写请求url地址！')
    }
    if (!config.success) {
        throw new Error('请填写回调函数！')
    }
    let option = {
        type: config.type || 'GET', //请求方式 默认为get
        data: reformatParams(config.data), //数据格式化为xmlHttp对象格式
        url: config.url, //请求地址
        success: config.success, //成功的回调
    }

    let xmlHttp = getXmlHttpObj();
     
    xmlHttp.open(option.type.toUpperCase(), option.url, true); //发送数据
    if(option.type=='GET'){
        xmlHttp.send(null);
    }else{
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //设置头信息
        xmlHttp.send(option.data); //发送数据
    }
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let _resultValue;
            try {
                _resultValue = JSON.parse(xmlHttp.responseText); //如果能够json解析使用json
            } catch (e) {
                _resultValue = xmlHttp.responseText; //不能则返回普通文本字符串内容
            }
            option.success(_resultValue);
        }
    }
}

const reformatParams = (data) => {
    var _arr = [];
    for (let k in data) {
        _arr.push(`${k}=${data[k]}`)
    }
    return _arr.join('&'); //格式化为name=lee&pwd=3的形式
}

const getXmlHttpObj = () => {
    let xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
                alert('您的浏览器不支持ajax请求！')
            }
        }
    }
    return xmlHttp;
}

export default minAjax;
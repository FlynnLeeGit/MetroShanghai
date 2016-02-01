import minAjax from './minAjax';
import host from '../../../conf/ajaxServer';

//ajax 请求对象包装
const ajax = {
    stationGet(fnDone) { //获得站点数据
        minAjax({
            url: `${host}/station`,
                success: (result) => {
                    fnDone(result);
                },
            })
        },
        stationPost(data, fnDone) { //更新站点数据
            minAjax({
                url: `${host}/station`,
                type: 'post',
                data: data,
                success: (result) => {
                    if (result == 'ok') {
                        fnDone();
                    }
                }
            })
        },
        stationPut(data, fnDone) {
           minAjax({
                url: `${host}/station`,
                type: 'put',
                data: data,
                success: (result) => {
                    if (result) {
                        fnDone(result);
                    }
                }
            })
        },
        stationDel(id, fnDone) {
           minAjax({
                url: `${host}/station`,
                type: 'delete',
                data: {
                    id: id
                },
                success: (result) => {
                    if (result == 'ok') {
                        fnDone();
                    }
                }
            })
        },
        maxKeyGet(fnDone) {
            minAjax({
                url: `${host}/maxkey`,
                type: 'get',
                success: (data) => {
                    if (data.result == 'ok') {
                        fnDone(data.maxkey);
                    }
                }
            })
        },
        timeGet(fnDone) {
            minAjax({
                url: `${host}/time`,
                type: 'get',
                success: (result) => {
                    fnDone(result);
                }
            })
        },

        timePut(data, fnDone) {
            minAjax({
                url: `${host}/time`,
                type: 'put',
                data: data,
                success: (result) => {
                    if (result) {
                        fnDone(result);
                    }
                }
            })
        },
        timeDel(data, fnDone) {
           minAjax({
                url: `${host}/time`,
                type: 'delete',
                data: data,
                success: (result) => {
                    if (result == 'ok') {
                        fnDone();
                    }
                }
            })

        },

}

export default ajax;

//获取control-show
var controlShow = document.getElementsByClassName('control-show')[0];
// 获取days-show
var daysdom = document.getElementsByClassName('days-show')[0];
// 获取今天日期
var Today = new Date();
// 显示年份的下拉菜单
var selectYear;
// 显示月份的下拉菜单
var selectMouth;
// 渲染年份的select
countSelectYear();
countSelectMouth();
daysShow();

selectYear.onchange = selectMouth.onchange = function () {
    daysdom.innerHTML = ''
    daysShow();
};
btn.onclick = function () {
    console.log('click');
    daysdom.innerHTML = ''
    selectYear.value = Today.getFullYear();
    selectMouth.value = Today.getMonth() + 1;
    daysShow();
}
// 渲染年份
function countSelectYear() {
    var currentYear = Today.getFullYear();
    selectYear = createDom('select', controlShow);
    for (var i = currentYear - 50; i <= currentYear + 50; i++) {
        var optionDom = createDom('option', selectYear, i);
        if (i == currentYear) {
            optionDom.setAttribute('selected', 'selected');
        }
    }
    var span = createDom('span', controlShow);
    span.innerHTML = '年';
}
// 渲染月份
function countSelectMouth() {
    var currentMouth = Today.getMonth();
    selectMouth = createDom('select', controlShow);
    for (var i = 1; i <= 12; i++) {
        var optionDom = createDom('option', selectMouth, i);
        // optionDom.innerHTML = i;
        if (i == currentMouth + 1) {
            optionDom.setAttribute('selected', 'selected');
        }
    }
    var span = createDom('span', controlShow);
    span.innerHTML = '月';
    this.btn = createDom('button', controlShow);
    btn.innerHTML = '今天'
}

function getdayInfo() {
    // 获取下拉菜单中选中的年份及月份
    var getyear = selectYear.value;
    var getmonth = selectMouth.value;
    // 判断是否是闰年
    var isleap = (getyear % 4 == 0 && getyear % 100 != 0) || getyear % 400 == 0;
    // 判断每月有多少天
    var days;
    if (getmonth == 2) {
        days = isleap ? 29 : 28;
    } else if (getmonth <= 7){
        days = getmonth % 2 != 0 ? 31 :30;
    }else{
        days = getmonth % 2 == 0 ? 31 :30;
    }

    // 判断月份是星期几
    var Time = new Date(getyear, getmonth - 1, 1);
    var getTimeWeek = Time.getDay();
    if (getTimeWeek == 0) {
        getTimeWeek = 7;
    }
    // 创建信息对象
    var obj = {
        year: getyear,
        month: getmonth,
        isleap: isleap,
        days : days,
        getTimeWeek:getTimeWeek,
    }
    return obj;
}

// 渲染days-show
function daysShow() {
    var obj = getdayInfo();
    for (var i = 0; i < obj.getTimeWeek - 1; i++) {
        createDom('span', daysdom);
    }

    for (var i = 1; i <= obj.days; i++) {
        this.spandom = createDom('span', daysdom, i);
        // spandom.innerHTML = i;
        if (obj.year == Today.getFullYear() && obj.month - 1 == Today.getMonth() && i == Today.getDate()) {
            spandom.classList.add('active');
        }
    }
}


function createDom(dom, wrapper, num) {
    var temp = document.createElement(dom);
    if (num)
        temp.innerHTML = num;
    wrapper.appendChild(temp);
    return temp;
}
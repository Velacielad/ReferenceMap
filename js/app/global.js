/**
 * Created by jack on 2015/12/27.
 */


// baseUrl
//var baseUrl = "http://localhost:8080/Plane/simulation";
var baseUrl = "http://121.42.217.4\:8080/Plane/simulation";



// 当前模拟暂停事件
var isPause = false;

function pause(){
    console.log("pause clicked");
    isPause = true;
}

function continueDisplay(){
    console.log("pause is canceled");
    isPause = false;
}


/**
 * index 向 detail 的跳转
 * @constructor
 */
function ShowDetail(){
    //window.location.href="view/detail.html";
    window.open("detail.html");
}



// 自定义 pophover
function tooltipHtmlSynchronous(n, d){	/* function to create html content string in tooltip div. */
    return "<h4>"+n+"</h4><table>"+
        "<tr><td>机名</td><td>"+(d.flight)+"</td></tr>"+
        "<tr><td>飞机编号</td><td>  "+(d.icao)+"</td></tr>"+
        "<tr><td>经度</td><td>  "+(d.lon)+"</td></tr>"+
        "<tr><td>纬度</td><td>  "+(d.lat)+"</td></tr>"+
        "<tr><td>海拔</td><td>  "+(d.alt)+"</td></tr>"+
        "<tr><td>速度</td><td>  "+(d.speed)+"</td></tr>"+
        "<tr><td>方向</td><td>  "+(d.trueTrack)+"</td></tr>"+
        "<tr><td>垂直速度</td><td>  "+(d.vrate)+"</td></tr>"+
        "<tr><td>距离</td><td>  "+(d.dist)+"</td></tr>"+
        "<tr><td>国家</td><td>  "+(d.country)+"</td></tr>"+
        "</table>";
}
//  定义鼠标移上函数
function mouseOverSynchronous(dPlane){
    // 先暂停模拟的过程
    pause();

    // 呈现出选中的圆
    d3.selectAll(".class_" + dPlane.icao).attr('opacity',0.5);

    // 出现数据的详情
    var planeSelect  = d3.selectAll(".plane_" + dPlane.icao)[0];
    console.log(planeSelect);
    planeSelect.forEach(function(d,i){
        var X = planeSelect[i].getBoundingClientRect().left;
        var Y = planeSelect[i].getBoundingClientRect().top;
        //console.log();
        console.log((i+1) + ":" + X + "  :  " + Y);
        d3.select("#tooltip"+(i+1)).transition().duration(200).style("opacity", .9);

        d3.select("#tooltip"+(i+1)).html(tooltipHtmlSynchronous(dPlane.flight, dPlane))
            .style("left", X + "px")
            //.style("left", (d3.event.pageX) + "px")
            .style("top", Y + "px");
        //.style("top", (d3.event.pageY - 28) + "px");
    });
}
//  定义鼠标移出函数
function mouseOutSynchronous(dPlane){

    if(!MouseClicked) {
        // 恢复模拟过程
        continueDisplay();
        // 隐藏选中的圆
        d3.selectAll(".class_" + dPlane.icao).attr('opacity', 0);
        // 隐藏数据的详情
        d3.select("#tooltip1").transition().duration(500).style("opacity", 0).attr("fill", "#ffffff");
        d3.select("#tooltip2").transition().duration(500).style("opacity", 0).attr("fill", "#ffffff");
        d3.select("#tooltip3").transition().duration(500).style("opacity", 0).attr("fill", "#ffffff");
    }
}

var MouseClicked = false;
function mouseClickSynchronous(dPlane){
    MouseClicked = MouseClicked != true;
    // 先暂停模拟的过程
    if(MouseClicked){
        pause();

        // 所有轨迹
        d3.selectAll(".PlaneMark").attr("opacity",0);
        // 所有直线隐藏
        d3.selectAll(".PlaneLine").attr("opacity",0);

        d3.selectAll(".plane_" + dPlane.icao).attr("opacity",1);
        d3.selectAll(".class_" + dPlane.icao).attr("opacity",0.5);
    }else{
        d3.selectAll(".PlaneLine").attr("opacity",1);
    }

}




/**
 * global,全局可能用到的 比例尺
 */

var speedScale = d3.scale.linear()
    .domain([0,560])
    .range([0,150]);
//height
var heightScale = d3.scale.linear()
    .domain([0,41125])
    .range([0,150]);
var vrateScale = d3.scale.linear()
    .domain([0,5120])  // 3264 所获取数据中最大的一个
    .range([0,60]);
//color
var c_start = d3.rgb(253,237,134);
var c_end = d3.rgb(227,91,44);
var c_start2 = d3.rgb(220,236,201);
var c_end2 = d3.rgb(53,119,174);
var c_start3 = d3.rgb(249,205,172);
var c_end3 = d3.rgb(151,52,144);
var compute = d3.interpolate(c_start,c_end);
var compute2 = d3.interpolate(c_start2,c_end2);
var compute3 = d3.interpolate(c_start3,c_end3);
var colorScale = d3.scale.linear()
    .domain([0,560])
    .range([0,1]);
var colorScale2 = d3.scale.linear()
    .domain([0,41125])
    .range([0,1]);
var colorScale3 = d3.scale.linear()
    .domain([0,5120])
    .range([0,1]);

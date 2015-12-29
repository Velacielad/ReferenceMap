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
    // 恢复模拟过程
    continueDisplay();
    // 隐藏选中的圆
    d3.selectAll(".class_" + dPlane.icao).attr('opacity',0);
    // 隐藏数据的详情
    d3.select("#tooltip1").transition().duration(500).style("opacity", 0).attr("fill","#ffffff");
    d3.select("#tooltip2").transition().duration(500).style("opacity", 0).attr("fill","#ffffff");
    d3.select("#tooltip3").transition().duration(500).style("opacity", 0).attr("fill","#ffffff");

}


function mouseClickSynchronous(dPlane){


}


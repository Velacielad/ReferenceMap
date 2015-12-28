/**
* Created by jack on 2015/12/27.
*/

var canvasSide;

/**
 * 比例尺
 */
var yScale = d3.scale.linear()
    .domain([0,41200])  // 41125 所获取数据中最大的一个
    .range([maxHeight,0]);

function initSide(){
    canvasSide = svgSide.append("svg:g")
        .attr("class", "airplaneInTianjinSide");


    //绘制坐标轴的直线
    canvasSide.append("line")
        .attr("stroke","gray")
        .attr("stroke-width","2px")
        .attr("x1",0)
        .attr("y1",maxHeight)
        .attr("x2",width)
        .attr("y2",maxHeight);

    //定义y轴
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("right");

    //添加y轴
    canvasSide.append("g")
        .attr("class","axis")
        .attr("transform","translate(" + 0 + "," + 0 + ")")
        .call(yAxis);

    //绘制坐标轴的直线
    //canvasSide.append("line")
    //    .attr("stroke","gray")
    //    .attr("stroke-width","2px")
    //    .attr("x1",0)
    //    .attr("y1",maxHeight-20)
    //    .attr("x2",width)
    //    .attr("y2",maxHeight-20);
}





/**
* 更新飞机数据
* @type {number}
*/
var count = 1;
function updatePlanesSide(projectionProvince) {
//        $.getJSON( "http://localhost:8080/Plane/planes/3", function(data) {
    d3.json(baseUrl, function (error, plane) {
        if (error)
            return console.error(error);
        //console.log(plane);


        canvasSide.selectAll("defs").remove();
        var arrowMarker = [];
        var arrowMarkerPoint = [];
        plane.forEach(function (d) {

            var defs = canvasSide.append("defs");
            // 飞机模型
            arrowMarker[d.icao] = defs.append("marker")
                .attr("id","arrowSide"+ d.icao)
                .attr("markerUnits","strokeWidth")
                .attr("markerWidth","13")
                .attr("markerHeight","13")
                .attr("viewBox","0 0 18 18")
                .attr("refX","8")
                .attr("refY","8")
                //.attr("orient","auto");
                .attr("orient",function(){
                    //if()
                    var dir = d.trueTrack - 90;
                    //console.log("方向是 "+ d.trueTrack + " ：" + dir);
                    return dir;
                });

            var arrow_path = "M11,8 L10,8.8 L9,9 L7,9 L3,16 L2,16 L4,9 L2,8.8 L1,10 L0,10 L1,8 L0,6 L1,6 L2,7.2 L4,7 L2,0 L3,0 L7,7 L9,7 L10,7.2 L11,8";

            arrowMarker[d.icao].append("path")
                .attr("d",arrow_path)
                .attr("fill","#000");

            // 箭头模型
            arrowMarkerPoint[d.icao] = defs.append("marker")
                .attr("id","arrowPointSide"+ d.icao)
                .attr("markerUnits","strokeWidth")
                .attr("markerWidth","10")
                .attr("markerHeight","10")
                .attr("viewBox","0 0 12 12")
                .attr("refX","6")
                .attr("refY","6")
                .attr("orient",function(){
                    //if()
                    var dir = d.trueTrack - 90;
                    //console.log("方向是 "+ d.trueTrack + " ：" + dir);
                    return dir;
                });

            var arrow_path_point = "M2,2 L10,6 L2,10 L6,6 L2,2";

            arrowMarkerPoint[d.icao].append("path")
                .attr("d",arrow_path_point)
                .attr("fill","red");
        });



        //colors_city.domain(d3.extent(plane, function (d) {
        //    return d["icao"];
        //}));

        // 自定义 pophover
        function tooltipHtmlCity(n, d){	/* function to create html content string in tooltip div. */
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
        function mouseOver2(d){
            d3.select("#tooltip").transition().duration(200).style("opacity", .9);

            d3.select("#tooltip").html(tooltipHtmlCity(d.flight, d))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        }
        //  定义鼠标移出函数
        function mouseOut2(){
            d3.select("#tooltip").transition().duration(500).style("opacity", 0).attr("fill","#ffffff");
        }


        //// 画轨迹
        canvasSide.selectAll("circle").remove();
            //.attr("fill",function(d){
            //    return "#1A76FF";
            //})
            //.attr('opacity',1)
            //.attr('r',1);
        canvasSide.append("svg:g")
            .attr("class", "tracks")
            .selectAll("circle")
            .data(plane)
            .enter()
            .append('circle')
            .attr('class',function(d,i){
                return d.icao;
            })
            .attr('cx',function(d){
                return projectionProvince([d.lon,d.lat])[0];
            })
            .attr('cy',function(d){
                return yScale(d.alt);
                //return  height - 50;
            })
            .attr('r',5)
            .attr('opacity',1)
            .attr("fill",function(d){
                return "#" + d.icao;
            })
            //.attr("marker-end","url(#arrow)")
            .on("mouseover", mouseOver2).on("mouseout", mouseOut2);




        // 标注飞机位置
        //获取飞机的update部分
        //var updatePlane = canvasSide
        //    .selectAll("line")
        //    .attr("class", "planes")
        //    .data(plane);
        //
        ////获取飞机的enter部分
        //var enterPlane = updatePlane.enter();
        //
        ////获取飞机的exit部分
        //var exitPlane = updatePlane.exit();
        //
        ////1. 飞机的update部分的处理方法
        //updatePlane.attr('x1',function(d){
        //    return projectionProvince([d.lon,d.lat])[0];
        //})
        //    .attr('y1',function(d){
        //        return  projectionProvince([d.lon,d.lat])[1];
        //    })
        //    .attr('x2',function(d){
        //        return projectionProvince([d.lon,d.lat])[0] + d.speed /10 *  Math.sin(d.trueTrack*Math.PI/180);
        //    })
        //    .attr('y2',function(d){
        //        return  projectionProvince([d.lon,d.lat])[1]- d.speed / 10 * Math.cos(d.trueTrack*Math.PI/180);
        //    })
        //    .attr("stroke","red")
        //    .attr("stroke-width",2)
        //    .attr("fill",function(d){
        //        return "#000000";
        //    })
        //    //.attr("marker-end","url(arrow"+ d.icao+")")
        //    .attr("marker-start",function(d){
        //        //return arrowMarker[d.icao];
        //        return "url(#arrow"+ d.icao+")";
        //    })
        //    .attr("marker-end",function(d){
        //        //return arrowMarker[d.icao];
        //        return "url(#arrowPoint"+ d.icao+")";
        //    })
        //    .on("mouseover", mouseOver2).on("mouseout", mouseOut2);
        //
        ////2. 飞机的enter部分的处理方法
        //enterPlane.append('line')
        //    .attr('x1',function(d){
        //        return projectionProvince([d.lon,d.lat])[0];
        //    })
        //    .attr('y1',function(d){
        //        return  projectionProvince([d.lon,d.lat])[1];
        //    })
        //    .attr('x2',function(d){
        //        return projectionProvince([d.lon,d.lat])[0] + d.speed /10 *  Math.sin(d.trueTrack*Math.PI/180);
        //    })
        //    .attr('y2',function(d){
        //        return  projectionProvince([d.lon,d.lat])[1]- d.speed / 10 * Math.cos(d.trueTrack*Math.PI/180);
        //    })
        //    .attr("stroke","red")
        //    .attr("stroke-width",2)
        //    .attr("fill",function(d){
        //        return "#000000";
        //    })
        //    //.attr("marker-end","url(arrow"+ d.icao+")")
        //    .attr("marker-start",function(d){
        //        //return arrowMarker[d.icao];
        //        return "url(#arrow"+ d.icao+")";
        //    })
        //    .attr("marker-end",function(d){
        //        //return arrowMarker[d.icao];
        //        return "url(#arrowPoint"+ d.icao+")";
        //    })
        //    .on("mouseover", mouseOver2).on("mouseout", mouseOut2);
        //
        ////3. 飞机的exit部分的处理方法
        //exitPlane.remove();



        //canvasSide.selectAll("line").remove();
        //canvasSide.append("svg:g")
        //    .attr("class", "planes")
        //    .selectAll("line")
        //    .data(plane)
        //    .enter()
        //    .append('line')
        //    .attr('x1',function(d){
        //        //return projectionProvince([d.lon,d.lat])[0];
        //    })
        //    .attr('y1',function(d){
        //        return  projectionProvince([d.lon,d.lat])[1];
        //    })
        //    .attr('x2',function(d){
        //        return projectionProvince([d.lon,d.lat])[0] + d.speed /10 *  Math.sin(d.trueTrack*Math.PI/180);
        //    })
        //    .attr('y2',function(d){
        //        return  projectionProvince([d.lon,d.lat])[1]- d.speed / 10 * Math.cos(d.trueTrack*Math.PI/180);
        //    })
        //    .attr("stroke","red")
        //    .attr("stroke-width",1.5)
        //    .attr("fill",function(d){
        //        return "#000000";
        //    })
        //    //.attr("marker-end","url(arrow"+ d.icao+")")
        //    .attr("marker-start",function(d){
        //        //return arrowMarker[d.icao];
        //        return "url(#arrowSide"+ d.icao+")";
        //    })
        //    .attr("marker-end",function(d){
        //        //return arrowMarker[d.icao];
        //        return "url(#arrowPointSide"+ d.icao+")";
        //    })
        //    .on("mouseover", mouseOver2).on("mouseout", mouseOut2);



    });
}


function startModelSide(projectionProvince) {
    initSide();
    count = count + 1;
    updatePlanesSide(projectionProvince);
    //getNext();
    setInterval(function() {
        if(!isPause) {
            updatePlanesSide(projectionProvince);
            //getNext();
        }
    }, 3000);
}

function destroy(){
    svgSide.selectAll(".airplaneInTianjin").remove();
}

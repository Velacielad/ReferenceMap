/**
 * 中国地图上绘制飞机,ok ok
 * @param projection
 */
function drawAirplaneChina(projection) {
    /**
     * 标记地图上的飞机场阿卡丽设计费快乐圣诞节疯狂了
     */
    d3.json("json/airport.json", function (error, airport) {

        // 自定义 pophover
        function tooltipHtmlAirport(d){	/* function to create html content string in tooltip div. */
            return "<h4>"+ d.name+"</h4><table>"+
                "<tr><td>位置</td><td>"+(d.address)+"</td></tr>"+
                "</table>";
        }

        //  定义鼠标移上函数
        function mouseOver3(d){
            d3.select("#tooltip1").transition().duration(200).style("opacity", .9);

            d3.select("#tooltip1").html(tooltipHtmlAirport(d))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        }
        //  定义鼠标移出函数
        function mouseOut3(){
            d3.select("#tooltip1").transition().duration(500).style("opacity", 0).attr("fill","#ffffff");
        }
        svg.append("svg:g")
            .attr("class", "airports")
            .selectAll("image")
            .data(airport)
            .enter()
            .append('image')
            .attr("x", function (d) {
                return projection([d.lon, d.lat])[0]-2;
            })
            .attr("y", function (d) {
                return projection([d.lon, d.lat])[1]-1;
            })
            .attr("width", 2)
            .attr("height", 2)
            .attr("xlink:href","img/airport.png")
            .on("mouseover", mouseOver3).on("mouseout", mouseOut3);
    });
}


//    var obj = "{'id': 1,'time': '10:19:45.728584687','recordTime': '2015-12-13 18:20:05','uti': 1450001985,'ICAO': '78076B','flight': "",'lon': '0.00000','lat': '0.00000','src': 'A','ground': 'A','alt': 13225,'VRate': -1408,'speed': 319,'trueTrack': 23,'cat': '','orig': '','dest': '','oper': '','type': '','reg': '','squawk': '','country': 'Chin','dist': '0.0','trust': 10,'trackSize': '0','lla': 1450002005},'";
// jQuery $fucntion3(), 读取飞机信息，对应投影到2中所绘制地图

// 初始化飞机模型


/**
* 更新飞机数据
* @type {number}
*/
var insertspeed
function updatePlanesChina(projection) {
//        $.getJSON( "http://localhost:8080/Plane/planes/3", function(data) {
    d3.json(baseUrl, function (error, plane) {
        if (error)
            return console.error(error);
        // console.log();

        var sped = document.getElementById("speed");
        sped.innerHTML =
        "<div style='float:left;'>速度:</div><div style='float:left;margin-left:5px;padding-left:5px;width:"+plane[0].speed/5+"px;color:#fff;background-color:#"+plane[0].speed+"'>"+plane[0].speed+"</div><div>位置:</div><div style='float:left;'>"+plane[0].lat+" , "+plane[0].lon+"</div>";

        svg.selectAll("defs").remove();
        var arrowMarker = [];
        var arrowMarkerPoint = [];
        plane.forEach(function (d) {

            var defs = svg.append("defs");
            // 飞机模型
            arrowMarker[d.icao] = defs.append("marker")
                .attr("id","arrow"+ d.icao)
                .attr("markerUnits","strokeWidth")
                .attr("markerWidth","6")
                .attr("markerHeight","6")
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
                .attr("fill","#"+ d.icao);

            // 箭头模型
            arrowMarkerPoint[d.icao] = defs.append("marker")
                .attr("id","arrowPoint"+ d.icao)
                .attr("markerUnits","strokeWidth")
                .attr("markerWidth","3")
                .attr("markerHeight","3")
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


        function mouseClick(d){
            d3.selectAll(".class_"+ d.icao).attr("r",10);
            console.log(d.icao + "is clicked");
        }

        // 画轨迹
        svg.selectAll("circle")
            //.attr("fill",function(d){
            //    return "#1A76FF";
            //})
            .attr('opacity',1)
            .attr('r',0.1);
        svg.append("svg:g")
            .attr("class", "tracks")
            .selectAll("circle")
            .data(plane)
            .enter()
            .append('circle')
            .attr('class',function(d,i){
                return "class_" + d.icao;
            })
            .attr('cx',function(d){
                return projection([d.lon,d.lat])[0];
            })
            .attr('cy',function(d){
                return  projection([d.lon,d.lat])[1];
            })
            .attr('r',0)
            .attr('opacity',1)
            .attr("fill",function(d){
                return "#" + d.icao;
            })
            //.attr("marker-end","url(#arrow)")
            .on("mouseover", mouseOverSynchronous).on("mouseout", mouseOutSynchronous);
            //.on("click",mouseClick);


        // 标注飞机位置
        //获取飞机的update部分
        //var updatePlane = svg
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
        //    return projection([d.lon,d.lat])[0];
        //})
        //    .attr('y1',function(d){
        //        return  projection([d.lon,d.lat])[1];
        //    })
        //    .attr('x2',function(d){
        //        return projection([d.lon,d.lat])[0] + d.speed /10 *  Math.sin(d.trueTrack*Math.PI/180);
        //    })
        //    .attr('y2',function(d){
        //        return  projection([d.lon,d.lat])[1]- d.speed / 10 * Math.cos(d.trueTrack*Math.PI/180);
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
        //        return projection([d.lon,d.lat])[0];
        //    })
        //    .attr('y1',function(d){
        //        return  projection([d.lon,d.lat])[1];
        //    })
        //    .attr('x2',function(d){
        //        return projection([d.lon,d.lat])[0] + d.speed /10 *  Math.sin(d.trueTrack*Math.PI/180);
        //    })
        //    .attr('y2',function(d){
        //        return  projection([d.lon,d.lat])[1]- d.speed / 10 * Math.cos(d.trueTrack*Math.PI/180);
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



        svg.selectAll("line").remove();
        svg.append("svg:g")
            .attr("class", "planes")
            .selectAll("line")
            .data(plane)
            .enter()
            .append('line')
            .attr('class',function(d){
                return "plane_" + d.icao;
            })
            .attr('x1',function(d){
                return projection([d.lon,d.lat])[0];
            })
            .attr('y1',function(d){
                return  projection([d.lon,d.lat])[1];
            })
            .attr('x2',function(d){
                return projection([d.lon,d.lat])[0] + d.speed /100 *  Math.sin(d.trueTrack*Math.PI/180);
            })
            .attr('y2',function(d){
                return  projection([d.lon,d.lat])[1]- d.speed / 100 * Math.cos(d.trueTrack*Math.PI/180);
            })
            .attr("stroke","red")
            .attr("stroke-width",0.4)
            .attr("fill",function(d){
                return "#000000";
            })
            //.attr("marker-end","url(arrow"+ d.icao+")")
            .attr("marker-start",function(d){
                //return arrowMarker[d.icao];
                return "url(#arrow"+ d.icao+")";
            })
            .attr("marker-end",function(d){
                //return arrowMarker[d.icao];
                return "url(#arrowPoint"+ d.icao+")";
            })
            .on("mouseover", mouseOverSynchronous).on("mouseout", mouseOutSynchronous);



    });
}

function getNext(){
    $.getJSON(baseUrl + "/update", function(data) {
        //console.log(data);
    });
}


function startChinaModel(projection) {
    drawAirplaneChina(projection);
    updatePlanesChina(projection);
    getNext();
    setInterval(function() {
        if(!isPause){
            updatePlanesChina(projection);
            getNext();
        }
    }, 3000);
}

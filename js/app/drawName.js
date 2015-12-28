/**
* Created by jack on 2015/12/21.
*/
/**
* 给省加上名字
*/
function drawProvinceName(){

    d3.selectAll(".province_name").remove();
    d3.selectAll(".city_name").remove();
    d3.selectAll(".county_name").remove();


    //给国家地图中的省加名字
    nodes.forEach(function(d){
        svg.append("text").attr("class","province_name")
            .attr("dx",d.x).attr("dy",d.y).attr("text-anchor","middle")
            .attr("fill",textColor).attr("font-size","3px").attr("font-family","微软雅黑")
            .attr("display","none")
            .text(d.name);
    });
}

/**
* 给市加上名字
*/
function drawCityName(type){
    //d3.selectAll(".province_name").remove();
    d3.selectAll(".city_name").remove();
    d3.selectAll(".county_name").remove();

    // 0 代表全国地图上
    // 1 代表地图详情
    if(type == 0){

        //给国家地图中的市加名字
        provinceNodes.forEach(function(d){
            svgRight.append("text").attr("class","city_name")
                .attr("dx",d.x).attr("dy",d.y).attr("text-anchor","middle")
                .attr("fill",textColor).attr("display","none").attr("font-size","3px")
                .text(d.name);

        });
    }else if(type == 1){
        //给国家地图中的市加名字
        provinceNodes.forEach(function(d){
            svgRight.append("text").attr("class","city_name")
                .attr("dx",d.x).attr("dy",d.y).attr("text-anchor","middle")
                .attr("fill",textColor).attr("display","none").attr("font-size","3px")
                .text(d.name);

        });
    }

}

/**
* 给县加上名字
*/
function drawCountryName(){

    //d3.selectAll(".province_name").remove();
    d3.selectAll(".city_name").remove();
    d3.selectAll(".county_name").remove();

    //给国家地图中的市加名字
    coutiesNodes.forEach(function(d){
        svgRight.append("text").attr("class","county_name")
            .attr("dx",d.x).attr("dy",d.y).attr("text-anchor","middle")
            .attr("fill",textColor).attr("display","none").attr("font-size","3px")
            .text(d.name);
    });
}

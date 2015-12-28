/**
 * 绘制中国地图
 * @param mapPath
 * @param svg
 * @param c
 */
function drawMap(mapPath, svg, c) {
	var projection = d3.geo.mercator()
					.center([107, 38])
					.scale(width-100)
    			.translate([width/1.8, height/2]);

	var path = d3.geo.path().projection(projection);

	//var color = d3.scale.category20();

	d3.json(mapPath, function(error, root) {

		var backColor;

		if (error)
			return console.error(error);
		//console.log(root.features);

		svg.selectAll(".pathChina")
			.data( root.features )
			.enter()
			.append("path")
			.attr("class", "pathChina")
			.attr("stroke","#6B695D")
			.attr("stroke-width", 0.3)
			.attr("fill", function(d,i){
					return background;
				})
			.attr("d", path )
			.on("mouseover",function(d,i){
				backColor = d3.select(this).attr("fill");
               	var colorPre =  d3.select(this)
                .attr("fill",overColor);
            })
            .on("mouseout",function(d,i){
         		d3.select(this)
              	.attr("fill",backColor);
      		}).on("click",function(d,i){
                var id = d.properties.id;
                clickChina(d, i, "mapdata/geometryProvince/" + id + ".json");
            });

            nodes = [];
            //获取中心点坐标
            root.features.forEach(function(d, i) {
                var centroid = path.centroid(d);
                centroid.x = centroid[0];
                centroid.y = centroid[1];
                centroid.id = d.properties.id;
                centroid.name = d.properties.name;
                centroid.feature = d;
                nodes.push(centroid);
            });


        ////给省加上名字
        drawProvinceName();
        startChinaModel(projection);

	});//end json




}//end drawMap

/**
 * 中国地图上的点击事件
 * @param d
 * @param i
 * @param path
 */
function clickChina(d, i, path) {
	d3.selectAll(".pathProvince").remove();
    d3.selectAll(".pathCouty").remove();
    if(d.properties.id != 50 && d.properties.id !=46 && d.properties.id !=71&&d.properties.id !=11&&d.properties.id !=12&&d.properties.id !=81&&d.properties.id !=82&&d.properties.id !=31){
        //console.log("有二级点击事件的是： "+ d.properties.id);
        drawPrivenceMap( path, svgRight,true,0);
    }else{
        drawPrivenceMap( path, svgRight,false,0);
    }

}

/**
 * 右侧省级地图上的点击事件
 * @param d
 * @param i
 */
function clickProvince(d, i) {
	d3.selectAll(".pathProvince").remove();
    d3.selectAll(".pathCouty").remove();
	drawCoutyMap(d, svgRight);
}

/**
 * 右侧市级地图上的点击事件
 * @param d
 * @param i
 * @param path
 */
function clickCouty(d, i, path) {
	d3.selectAll(".pathProvince").remove();
    d3.selectAll(".pathCouty").remove();
	drawPrivenceMap( path, svgRight,true,0);
}



/**
 * 点击省级地区事件，包括四个直辖市（但要考虑排除直辖市的二级点击）
 * @param d
 * @param mapPath
 * @param svg
 */
function drawPrivenceMap( mapPath, svg,canCountriesClick,type) {

	d3.json(mapPath, function(error, root) {

		if (error)
			console.log(error);

		//console.log(root.features);

		var projectionProvince = d3.geo.mercator()
					.center(root.cp)
					.scale(root.size*2.5)
    				//.translate([width/4*3, height/2]);
    				.translate([width/1.9, height/2]);

		var path = d3.geo.path().projection(projectionProvince);

		//var color = d3.scale.category20();

		svg.selectAll(".pathProvince")
			.data( root.features )
			.enter()
			.append("path")
			.attr("class", "pathProvince")
			.attr("stroke","#6B695D")
			.attr("stroke-width",0.3)
			.attr("fill", function(d,i){
					return background;
				})
			.attr("d", path )
			.on("mouseover",function(d,i){
                d3.select(this)
                .attr("fill",overColor);

            })
            .on("mouseout",function(d,i){
         		d3.select(this)
              	.attr("fill",background);
      		}).on("click",function(d,i){
                if(canCountriesClick){
                    clickProvince(d, i);
                }

            });

            provinceNodes = [];
            //获取中心点坐标
            root.features.forEach(function(d, i) {
                //console.log(d);
                var centroid = path.centroid(d);
                centroid.x = centroid[0];
                centroid.y = centroid[1];
                centroid.id = d.properties.id;
                centroid.name = d.properties.name;
                centroid.feature = d;
                //console.log("x:" + centroid.x);
                provinceNodes.push(centroid);
            });



        //给市加上名字
        drawCityName(type);
        if(!canCountriesClick){
            startModel(projectionProvince);
            if(type==1){
                startModelSide(projectionProvince);
            }
        }else{
            destroy();
        }


	});//end json


}//end drawMap


/**
 * 绘制市级地图
 */
var projectionCountry;
function drawCoutyMap(d,svg) {
	var id = d.properties.id;

	var mapPath = "mapdata/geometryCouties/" + id + "00.json";

	d3.json(mapPath, function(error, root) {

		if (error)
			return console.error(error);
		//console.log(root.features);

		var zoomScale = getZoomScale(root.features, width, height);

		var centers = getCenters(root.features);

		projectionCountry = d3.geo.mercator()
					//.center(d.properties.cp)
					.center(centers)
					.scale(zoomScale*35)
    				.translate([width/1.9, height/2]);
		var path = d3.geo.path().projection(projectionCountry);
		//var color = d3.scale.category20();

		svg.selectAll(".pathCouty")
			.data( root.features )
			.enter()
			.append("path")
			.attr("class", "pathCouty")
			.attr("stroke","#6B695D")
			.attr("stroke-width",0.3)
			.attr("fill", function(d,i){
					return background;
				})
			.attr("d", path )
			.on("mouseover",function(d,i){
                d3.select(this)
                .attr("fill",overColor);
            })
            .on("mouseout",function(d,i){
         		d3.select(this)
              	.attr("fill",background);
      		}).on("click",function(d,i){
                clickCouty(d, i, "mapdata/geometryProvince/" + id.substr(0,2) + ".json");
            });

            coutiesNodes = [];
            //获取中心点坐标
            root.features.forEach(function(d, i) {
                var centroid = path.centroid(d);
                centroid.x = centroid[0];
                centroid.y = centroid[1];
                centroid.id = d.properties.id;
                centroid.name = d.properties.name;
                centroid.feature = d;
                coutiesNodes.push(centroid);
            });

        ////给县加上名字
        drawCountryName();
	});//end json
}//end drawMap

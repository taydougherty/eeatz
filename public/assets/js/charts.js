// This is a function that will make a pie chart for the summary page
// will draw in a <div> with id "piechart" or "d3-tip"
// @param arr This parameter accept an array that is shaped as follows
//            [
//              ["Main Category name in str", $ in number], 
//              ["another category name", $ in number], 
//            ...]
// @param main Check if we are making summary pie chart (true) or sub category pie chart (false)
// @param name This parameter only except "Budget" or "Expense"
// 
// does not return anything
function makePieChart(arr, main, name) {
    // First check if parameter is passed in correctly
    if (name !== "Budget" && name !== "Expense") {
        console.log("Wrong paramter was passed into function. Please use either 'Budget' or 'Expense'.")
        return ""
    }

    google.charts.load("current", { packages: ["corechart"] });

    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // add in headers
        if (main) {
            var cate = "Main Categories";
        } else {
            var cate = "Sub Categories";
        }

        if (arr[0][0] !== cate) {
            arr.unshift([cate, name]);
        }

        // create data table
        var data = google.visualization.arrayToDataTable(arr);

        var formatter = new google.visualization.NumberFormat(
            { prefix: '$', negativeColor: 'red', negativeParens: true });
        formatter.format(data, 1);
        
        // add in options
        var options = {
            pieSliceText: 'label',
            slices: {},
            backgroundColor: 'transparent',
            legend: "none",
            pieHole: 0.5
        };

        // get the location where the chart will be added
        if (main) {
            var div = name;
        } else {
            var div = "d3-tip";
        }
        var chart = new google.visualization.PieChart(document.getElementById(div));
        
        // add event handler
        
        if (main) {
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var category = data.getValue(selectedItem.row, 0);
                    top = $("#" + category).offset().top;
                    $("html, body").animate({ scrollTop: top }, 1000);
                }
            }
            google.visualization.events.addListener(chart, 'select', selectHandler); 
        }

        function mouseOverHandler(e) {
            var slices = options.slices;
            if (slices.hasOwnProperty(e.row)) {
                if (slices[e.row].hasOwnProperty('offset')) return false
            }
            slices[e.row] = { offset: 0.2 };
            options['slices'] = slices;
            chart.draw(data, options);
        }

        google.visualization.events.addListener(chart, 'onmouseover', mouseOverHandler); 

        function mouseOutHandler(e) {
            var slices = options.slices;
            slices[e.row] = {};
            options['slices'] = slices;
            chart.draw(data, options);
        }

        google.visualization.events.addListener(chart, 'onmouseout', mouseOutHandler); 

        // draw the chart
        chart.draw(data, options);
    }
}

// This is a function that will make percantage bar graphs for the summary page
// Will draw in a <div> with class "g-chart"
// @param arr This parameter accept an array that is shaped as follows
//            [
//              ["Subcategory name in str", $ of expenses in number], 
//              ["another category name", $ of expenses in number], 
//            ...]
// @param name Category name, must match name used in create pie chart
// @param totalBudget The amount of budget in number $
// 
// does not return anything
function makePercentageBar(arr, name, totalBudget) {
    //Margin conventions
    var margin = { top: 10, right: 50, bottom: 20, left: 227 };

    var widther = window.outerWidth;

    var width = widther - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    var barHeight = 35;

    //Appends the svg to the chart-container div
    var svg = d3.select(".g-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Creates the xScale 
    var xScale = d3.scale.linear()
        .range([0, width]);

    //Creates the yScale
    var y0 = d3.scale.ordinal()
        .rangeBands([height, 0], 0)
        .domain([name]);

    //Defines the y axis styles
    var yAxis = d3.svg.axis()
        .scale(y0)
        .orient("left");

    //Defines the y axis styles
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickFormat(function (d) { return d + "%"; })
        .tickSize(height);

    //Get the percentage number
    var perc = 0;
    arr.forEach(function (element) {
        perc += parseFloat(element);
    });
    perc = perc/parseFloat(totalBudget);

    //Local data
    var data = [{ "category": name, "num": perc, "num2": 100 }];

    var tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]).html(function (d) {
        makePieChart(arr, false, "Expense");
        return "<div></div>";
    });

    svg.call(tip);

    //Draw the chart
    ready(data);

    function ready(data) {

        //FORMAT data
        data.forEach(function (d) {
            d.num = +d.num;
            d.num2 = +d.num2;
        });

        //Sets the max for the xScale
        var maxX = d3.max(data, function (d) { return d.num2; });

        //Gets the min for bar labeling
        var minX = d3.min(data, function (d) { return d.num; });

        //Defines the xScale max
        xScale.domain([0, maxX]);

        //Appends the y axis
        var yAxisGroup = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        //Appends the x axis    
        var xAxisGroup = svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        //Binds the data to the bars      
        var categoryGroup = svg.selectAll(".g-category-group")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "g-category-group")
            .attr("transform", function (d) {
                return "translate(0," + y0(d.category) + ")";
            })
            .on('mouseover', function (d) {
                tip.show(d);
                d3.select(this).style('opacity', 1).style('stroke-width', 3);
            })
            .on('mouseout', function (d) {
                tip.hide(d);
                d3.select(this).style('opacity', 0.8).style('stroke-width', 0.3);
            });

        //Appends background bar   
        var bars2 = categoryGroup.append("rect")
            .attr("width", function (d) { return xScale(d.num2); })
            .attr("height", barHeight - 1)
            .attr("class", "g-num2")
            .attr("rx", 7)
            .attr("transform", "translate(0,4)");

        //Appends main bar   
        var bars = categoryGroup.append("rect")
            .attr("width", function (d) { return xScale(d.num); })
            .attr("height", barHeight - 1)
            .attr("class", "g-num")
            .attr("rx", 7)
            .attr("transform", "translate(0,4)");

        //Binds data to labels
        var labelGroup = svg.selectAll("g-num")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "g-label-group")
            .attr("transform", function (d) {
                return "translate(0," + y0(d.category) + ")";
            });

        //Appends main bar labels   
        var barLabels = labelGroup.append("text")
            .text(function (d) { return d.num + "%"; })
            .attr("x", function (d) {
                if (minX > 32) {
                    return xScale(d.num) - 37;
                }
                else {
                    return xScale(d.num) + 6;
                }
            })
            .style("fill", function (d) {
                if (minX > 32) {
                    return "white";
                }
                else if (d.num >= 80 ){
                    return "#696969";
                } else if (d.num >= 60) {
                    return "#f2914b";
                } else if (d.num >= 40) {
                    return "#f2ed4b";
                } else if (d.num >= 20) {
                    return "#c8f24b";
                } else {
                    return "#80f24b";
                }
            })
            .attr("y", y0.rangeBand() / 1.6)
            .attr("class", "g-labels");

        //RESPONSIVENESS
        d3.select(window).on("resize", resized);

        function resized() {

            //new margin
            var newMargin = { top: 10, right: 10, bottom: 20, left: 227 };


            //Get the width of the window
            var w = d3.select(".g-chart").node().clientWidth;
            console.log("resized", w);

            //Change the width of the svg
            d3.select("svg")
                .attr("width", w);

            //Change the xScale
            xScale
                .range([0, w - newMargin.right - newMargin.left]);

            //Update the bars
            bars
                .attr("width", function (d) { return xScale(d.num); });

            //Update the second bars
            bars2
                .attr("width", function (d) { return xScale(d.num2); });

            //Updates bar labels
            barLabels
                .attr("x", function (d) {
                    if (minX > 32) {
                        return xScale(d.num) - 37;
                    }
                    else {
                        return xScale(d.num) + 6;
                    }
                })
                .attr("y", y0.rangeBand() / 1.6)

            //Updates xAxis
            xAxisGroup
                .call(xAxis);

            //Updates ticks
            xAxis
                .scale(xScale)

        };

    }
}

function sum(arr) {
    var tempArr = [];

    arr.forEach(item => {
        var existing = tempArr.filter(function (v, i) {
            return v.departmentName == item.departmentName;
        });
        if (existing.length) {
            var existingIndex = tempArr.indexOf(existing[0]);
            tempArr[existingIndex].budgetTotal += Number(item.budgetTotal);
        } else {
            item.budgetTotal = Number(item.budgetTotal);
            tempArr.push(item);
        }
    });

    return tempArr;
}

$(document).ready(function () {
    var budgetArr = [];

    $.get("/api/query/", {
        table: "Budget",
        headers: "departmentName, budgetTotal"
    }).then(function (data) {
        if (data.status === 200) {         
            var tempArr = sum(data.data);

            tempArr.forEach(e => {
                budgetArr.push([e.departmentName, Number(e.budgetTotal)]);
            });
            // sum up all cate amt first before calling function
            makePieChart(budgetArr, true, "Budget");
        } else if (data.status === 201) {
            console.log(data.msg);
        }
    })

    $.get("/api/query/", {
        table: "Expense",
        headers: "departmentName, expenseCost"
    }).then(function (data) {
        if (data.status === 200) {
            var tempArr = sum(data.data);

            tempArr.forEach(e => {
                budgetArr.push([e.departmentName, Number(e.expenseCost)]);
            });
            // sum up all cate amt first before calling function
            makePieChart(budgetArr, true, "Expense");
        } else if (data.status === 201) {
            console.log(data.msg);
        }
    })

    $(window).resize(function () {
        makePieChart(budgetArr, true, "Budget");
    });
})
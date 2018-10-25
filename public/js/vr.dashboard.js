/*
 *
 *	Streaming Media Hosting
 *	
 *	Dashboard
 *
 *	6-01-2015
 */
//Main constructor
function Dashboard() {}

//Global variables
var graph1, graph2, live_count_plays, count_plays, sum_time_viewed, avg_time_viewed, count_loads, tut_data, tut_count, tut_init = false;

//Login prototype/class
Dashboard.prototype = {
    constructor: Dashboard,
    //Creates area graph instance
    createAreaGraphInstance:function(id){
        if(id == 'liveEntries'){      
            graph1 =  Morris.Area({
                element: id,
                behaveLikeLine: true,
                xkey: 'date',
                ykeys: ['value'],
                labels: ['plays'],
                hideHover: 'auto',
                pointSize: 0,
                lineColors: ['#73B597'],
                fillOpacity: 0.4,
                smooth: true,
                resize: true,
                xLabelMargin: 50,
                parseTime: true
            });
        } else if(id == 'vodEntries') {
            graph2 =  Morris.Area({
                element: id,
                behaveLikeLine: true,
                xkey: 'date',
                ykeys: ['value'],
                labels: ['plays'],
                hideHover: 'auto',
                pointSize: 0,
                lineColors: ['#73B597'],
                fillOpacity: 0.4,
                smooth: true,
                resize: true,
                xLabelMargin: 50,
                parseTime: true
            }); 
        }
    },
    //Gets graph data
    getGraphData:function(days_from_today,from,to,days,type,dimension,entryId,graph){
        var cb = function(success, results){
            if(!success)
                alert(results);
        
            if(results.code && results.message){
                alert(results.message);
                return;
            }
            
            var dataString, graphData, preGraphData, i;
            var totals = {};
            var data = [];
            
            for (i = 0; i < results.length; i++) {
                totals[results[i]['id']] = results[i]['data'];
            }   

            var button_text;
            var label = '';
            button_text = $('.dropdown-text').text();
            
            if(graph == 'live'){
                live_count_plays = totals.count_plays;
                if(live_count_plays){
                    graphData = smhDash.formatDateRange(live_count_plays);        
                } else if(live_count_plays == null || live_count_plays == '') {
                    dataString = from+'00,0;'+to+'00,0;';
                    live_count_plays = dataString;
                    graphData = smhDash.formatDateRange(live_count_plays);
                }
                preGraphData = smhDash.generalDate(graphData,days,days_from_today);
                data = smhDash.formatLineData(preGraphData);
                graph1.setData(data); 
            } else {
                count_plays = totals.count_plays;
                sum_time_viewed = totals.sum_time_viewed;
                avg_time_viewed = totals.avg_time_viewed;
                count_loads = totals.count_loads;
                if(button_text == 'Plays'){
                    label = 'Plays';
                    if(count_plays){
                        graphData = smhDash.formatDateRange(count_plays); 
                    } else if (count_plays == null || count_plays == ''){
                        dataString = from+'00,0;'+to+'00,0;';
                        count_plays = dataString;
                        graphData = smhDash.formatDateRange(count_plays);
                    }                    
                } else if(button_text == 'Minutes Viewed'){
                    label = 'Minutes';
                    if(sum_time_viewed){
                        graphData = smhDash.formatDateRange(sum_time_viewed); 
                    } else if (sum_time_viewed == null || sum_time_viewed == ''){
                        dataString = from+'00,0;'+to+'00,0;';
                        sum_time_viewed = dataString;
                        graphData = smhDash.formatDateRange(sum_time_viewed);
                    }  
                } else if(button_text == 'Avg. View Time'){
                    label = 'Minutes';
                    if(avg_time_viewed){
                        graphData = smhDash.formatDateRange(avg_time_viewed); 
                    } else if (avg_time_viewed == null || avg_time_viewed == ''){
                        dataString = from+'00,0;'+to+'00,0;';
                        avg_time_viewed = dataString;
                        graphData = smhDash.formatDateRange(avg_time_viewed);
                    }  
                } else if(button_text == 'Player Impressions'){
                    label = 'Impressions';
                    if(count_loads){
                        graphData = smhDash.formatDateRange(count_loads); 
                    } else if (count_loads == null || count_loads == ''){
                        dataString = from+'00,0;'+to+'00,0;';
                        count_loads = dataString;
                        graphData = smhDash.formatDateRange(count_loads);
                    }  
                }
                preGraphData = smhDash.generalDate(graphData,days,days_from_today);
                data = smhDash.formatLineData(preGraphData);
                graph2.setData(data);   
                
                $("#menu li a").click(function(){
                    $('#graph-loading').html('<img src="/img/chart-loading.gif" height="20px" />');
                    var selText = $(this).text();
                    var label = '';
                    if(selText == 'Plays'){
                        label = 'Plays';
                        if(count_plays){
                            graphData = smhDash.formatDateRange(count_plays); 
                        } else if (count_plays == null || count_plays == ''){
                            dataString = from+'00,0;'+to+'00,0;';
                            count_plays = dataString;
                            graphData = smhDash.formatDateRange(count_plays);
                        } 
                    } else if(selText == 'Minutes Viewed'){
                        label = 'Minutes';
                        if(sum_time_viewed){
                            graphData = smhDash.formatDateRange(sum_time_viewed); 
                        } else if (sum_time_viewed == null || sum_time_viewed == ''){
                            dataString = from+'00,0;'+to+'00,0;';
                            sum_time_viewed = dataString;
                            graphData = smhDash.formatDateRange(sum_time_viewed);
                        } 
                    } else if(selText == 'Avg. View Time'){
                        label = 'Minutes';
                        if(avg_time_viewed){
                            graphData = smhDash.formatDateRange(avg_time_viewed); 
                        } else if (avg_time_viewed == null || avg_time_viewed == ''){
                            dataString = from+'00,0;'+to+'00,0;';
                            avg_time_viewed = dataString;
                            graphData = smhDash.formatDateRange(avg_time_viewed);
                        } 
                    } else if(selText == 'Player Impressions'){
                        label = 'Impressions';
                        if(count_loads){
                            graphData = smhDash.formatDateRange(count_loads); 
                        } else if (count_loads == null || count_loads == ''){
                            dataString = from+'00,0;'+to+'00,0;';
                            count_loads = dataString;
                            graphData = smhDash.formatDateRange(count_loads);
                        }  
                    }
                    preGraphData = smhDash.generalDate(graphData,days,days_from_today);
                    data = smhDash.formatLineData(preGraphData);
                    graph2.options.labels = [label];
                    graph2.setData(data);
                    $(this).parents('.dropdown').find('.dropdown-text').html(selText);
                    $('#graph-loading').empty();
                });
            }                            
                       
            $('#graph-loading').empty(); 
           
        };
        
        var reportType;
        var offset = smhDash.getOffset();
        if(type == 'live'){
            reportType = KalturaReportType.LIVE;      
        } else if(type == 'top_content') {
            reportType = KalturaReportType.TOP_CONTENT;
        }      
        var reportInputFilter = new KalturaReportInputFilter();
        reportInputFilter.fromDay = from;
        reportInputFilter.toDay = to;     
        reportInputFilter.searchInTags = true;
        reportInputFilter.searchInAdminTags = true;
        reportInputFilter.timeZoneOffset = offset;
        client.report.getGraphs(cb, reportType, reportInputFilter, dimension, entryId);
    },
    //Gets total plays
    getTotalPlays:function(from,to,type,entry){
        var cb = function(success, results){
            if(!success)
                alert(results);
        
            if(results.code && results.message){
                alert(results.message);
                return;
            }
            
            var i, count_plays, count_loads;
            var headers = results.header.split(",");
            var data = results.data.split(",");
            var totals = {};
                       
            for (i = 0; i < headers.length; i++) {
                totals[headers[i]] = data[i];
            }
            
            if(totals.count_plays == '' || totals.count_plays == null){
                count_plays = 0
            } else {
                count_plays = totals.count_plays;
            }
            
            if(type == 'live'){
                if(count_plays > 1){
                    $('#live-graph #ls-plays').html("<strong>"+smhDash.format(count_plays)+" Plays</strong>");
                } else if (count_plays == 1){
                    $('#live-graph #ls-plays').html("<strong>"+count_plays+" Play</strong>");
                }    
            } else {
                if(totals.count_loads == '' || totals.count_loads == null){
                    count_loads = 0
                } else {
                    count_loads = totals.count_loads;
                }
                $('#top_content-graph #plays').html(smhDash.format(count_plays));
                $('#top_content-graph #minutes').html(smhDash.convertToHHMM(Number(totals.sum_time_viewed)));
                $('#top_content-graph #time').html(smhDash.convertToHHMM(Number(totals.avg_time_viewed)));
                $('#top_content-graph #impressions').html(smhDash.format(count_loads));
                $('#top_content-graph #ratio').html((totals.load_play_ratio*100).toFixed(2)+'%');
                $('#top_content-graph #drop').html((totals.avg_view_drop_off*100).toFixed(2)+'%');
            }            
      
        };
        
        var offset = smhDash.getOffset();
        var reportType, objectIds;
        if(type == 'live'){
            reportType = KalturaReportType.LIVE;         
        } else if (type == 'top_content') {
            reportType = KalturaReportType.TOP_CONTENT;
        }
        
        if(entry == null){
            objectIds = null;
        } else {
            objectIds = entry;
        }

        var reportInputFilter = new KalturaReportInputFilter();
        reportInputFilter.fromDay = from;
        reportInputFilter.toDay = to;
        reportInputFilter.searchInTags = true;
        reportInputFilter.searchInAdminTags = true;
        reportInputFilter.timeZoneOffset = offset;
        client.report.getTotal(cb, reportType, reportInputFilter, objectIds);  
    },
    //Gets Map data
    getMapData:function(from,to,entryId){
        var cb = function(success, results){
            if(!success)
                alert(results);
        
            if(results.code && results.message){
                alert(results.message);
                return;
            }
            
            var i;
            var country_data = {};
            var country_ids = {};
            var countries = {};
            var data = {};
            var plays = {};
            var fillData = {};
            
            if(results.length > 0){
                for (i = 0; i < results.length; i++) {
                    country_data[results[i]['id']] = results[i]['data'];
                }   
            
                country_ids = country_data.country.split(';');
            
                for (i = 0; i < country_ids.length - 1; i++) {
                    var ids = country_ids[i].split(',');
                    if(ids[1] !== 'ZZ'){
                        countries[ids[1]] = ids[0];  
                    }               
                }
            
                data = country_data.count_plays.split(';');
            
                for (i = 0; i < data.length - 1; i++) {
                    var cp = data[i].split(',');
                    if(cp[1] !== ''){
                        plays[cp[0]] = cp[1];  
                    }                                 
                }
                
                $.each(countries, function(index1, value1) {
                    $.each(plays, function(index2, value2) {
                        if(value1 == index2){
                            if(index1 == 'UK'){
                                index1 = 'GB';
                            }
                            fillData[index1] = "#66C2A5";
                        }
                    });
                });
                
                $('#geo-dist').vectorMap({
                    map: 'world_mill_en',
                    normalizeFunction: 'polynomial',
                    hoverOpacity: 0.7,
                    hoverColor: false,
                    backgroundColor: 'transparent',
                    regionStyle: {
                        initial: {
                            fill: 'rgba(210, 214, 222, 1)',
                            "fill-opacity": 1,
                            stroke: 'none',
                            "stroke-width": 0,
                            "stroke-opacity": 1
                        },
                        hover: {
                            "fill-opacity": 0.7,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: 'yellow'
                        },
                        selectedHover: {
                        }
                    },
                    series: {
                        regions: [{
                                values: fillData,
                                attribute: 'fill'
                            }]
                    },
                    onRegionTipShow: function(e, el, code){
                        var country_plays
                        if(code == 'GB'){
                            code = 'UK'
                        }
                        if(countries[code]){
                            var country = countries[code];
                            if(plays[country]){
                                country_plays = smhDash.formatNumber(plays[country]); 
                            } else {
                                country_plays = 0;  
                            }                            
                        } else {
                            country_plays = 0;
                        }

                        el.html(el.html()+' ( '+country_plays+' Plays )');
                    }

                }); 
            } else {
                $('#geo-dist').vectorMap({
                    map: 'world_mill_en',
                    normalizeFunction: 'polynomial',
                    hoverOpacity: 0.7,
                    hoverColor: false,
                    backgroundColor: 'transparent',
                    regionStyle: {
                        initial: {
                            fill: 'rgba(210, 214, 222, 1)',
                            "fill-opacity": 1,
                            stroke: 'none',
                            "stroke-width": 0,
                            "stroke-opacity": 1
                        },
                        hover: {
                            "fill-opacity": 0.7,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: 'yellow'
                        },
                        selectedHover: {
                        }
                    },
                    onRegionTipShow: function(e, el, code){
                        el.html(el.html()+' ( 0 Plays )');
                    }
                }); 
            }
            
           
        };
        
        var reportType;
        var offset = smhDash.getOffset();
        reportType = KalturaReportType.MAP_OVERLAY;   
        var dimension = 'count_plays';
        var reportInputFilter = new KalturaReportInputFilter();
        reportInputFilter.fromDay = from;
        reportInputFilter.toDay = to;     
        reportInputFilter.searchInTags = true;
        reportInputFilter.searchInAdminTags = true;
        reportInputFilter.timeZoneOffset = offset;
        client.report.getGraphs(cb, reportType, reportInputFilter, dimension, entryId);
    },
    //Loads graph
    loadLastSevenDaysGraph:function(entryId,reportType,dimension,graph){
        $('#graph-loading').html('<img src="/img/chart-loading.gif" height="20px" />');
        var days = 7;        
        var from = Date.today().addDays(-days).toString("yyyyMMdd");
        var to = Date.today().toString("yyyyMMdd");
        var days_from_today = days;        
        smhDash.getGraphData(days_from_today,from,to,days,reportType,dimension,entryId,graph);
        smhDash.getTotalPlays(from,to,reportType,entryId);      
    },
    //Loads map data
    loadLastSevenDaysMap:function(entryId){
        var days = 7;        
        var from = Date.today().addDays(-days).toString("yyyyMMdd");
        var to = Date.today().toString("yyyyMMdd");      
        smhDash.getMapData(from,to,entryId);
    },
    //Adds date range to stats
    formatDateRange:function(data){
        var index;
        var dateRange = [];
        var split = data.split(";");
        for (index = 0; index < split.length; ++index) {
            if (split[index]){
                var result = split[index].split(",");
                var date = result[0].substring(0, 8); 
                var hour = result[0].substring(8, 11);
                var value = result[1];
                
                if(hour == null || hour == ''){
                    hour = '00';
                }
                dateRange.push({
                    date: date, 
                    hour: hour+":00", 
                    value: Number(value).toFixed(2)
                });
            }
        }
        return dateRange;
    },
    //Get general date range
    generalDate:function(data,days,days_from_today){
        var index;
        for (index = 0; index <= days; ++index) {
            var date = Date.today().addDays(-days_from_today).addDays(+index).toString("yyyyMMdd"); 
            if(!smhDash.inArray(data,date)){
                data.push({
                    date: date, 
                    hour: '00:00', 
                    value: 0
                });
            }
        }
        return data;  
    },
    //Format number
    formatNumber:function(num){
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    //Formats line graph data
    formatLineData:function(data){
        var formatedData = [];
        for (var index = 0; index < data.length; ++index) {
            var dateData = data[index]['date'];
            var result1 = smhDash.insert(dateData, 4, "-");
            var result2 = smhDash.insert(result1, 7, "-");
            var date = result2+" "+data[index]['hour'];
            var value = data[index]['value'];
            formatedData.push({
                date: date, 
                value: Number(value).toFixed(2)
            });
        }
        return formatedData;
    },
    inArray:function(data,date){
        var inArray = false;
        var index;
        for (index = 0; index < data.length; ++index) {
            if(data[index]['date'] == date){
                inArray = true;
            }
        }
        return inArray;
    },
    //Inserts string value at specified integer index
    insert:function(str, index, value){
        return str.substr(0, index) + value + str.substr(index);
    },
    //Format Number
    format:function(nStr){
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    },
    convertToHHMM:function(secs){
        secs = Math.floor(secs * 60);
        var h = Math.floor(secs/3600);
        var sh = h * 3600;
        var m = Math.floor((secs - sh)/60);
        var sm = m * 60;
        var s = secs - sh - sm;

        return ((h < 10) && (h > 0) ? "0"+h+':' : ((h == 0) ? "" : h+':'))+((m < 10) && (m > 0) ? "0"+m+':' : ((m == 0) ? "00:" : m+':'))+((s < 10) && (s > 0) ? "0"+s : ((s == 0) ? "00" : s));
    },
    //Gets time offset
    getOffset:function(){
        var dt = new Date();
        var tz = dt.getTimezoneOffset();
        return tz;
    },
    //Get usage stats
    getUsage:function(){
        var TodayDate = new Date();
        var y = TodayDate.getFullYear();
        var m = TodayDate.getMonth() + 1;
        m = m > 9 ? m : "0"+m;
        var date = String(y)+String(m);
        var sessData = {
            pid: sessInfo.pid,
            date: date
            }
        var reqUrl = '/apps/scripts/getStats.php';
        $.ajax({
            cache:      false,
            url:        reqUrl,
            type:       'GET',
            data:       sessData,
            dataType:   'json',
            success:function(data) { 
                var storage, transfer;                
  
                var cb = function(success, results){
                    if(!success)
                        alert(results);

                    if(results.code && results.message){
                        alert(results.message);
                        return;
                    }
            
                    if(data.Error){
                        storage = "0.00 MB";
                        transfer = "0.00 MB";
                    } else {
                        if(data.result.storage){
                            storage = smhDash.formatStorage(data.result.storage);
                        } else {
                            storage = "0.00 MB";
                        }
                        if(data.result.bandwidth){
                            transfer = smhDash.formatStorage(data.result.bandwidth);
                        } else {
                            transfer = "0.00 MB";
                        }
                    }
                    $('#user-storage').html(smhDash.format(storage));
                    $('#user-transfer').html(smhDash.format(transfer));
                    $('#user-vod').html(smhDash.format(results[0]));
                    $('#user-live').html(smhDash.format(results[1]));
                };
                
                client.startMultiRequest();
                var request1filter = new KalturaMediaEntryFilter();
                request1filter.statusEqual = KalturaEntryStatus.READY;
                request1filter.typeEqual = KalturaEntryType.MEDIA_CLIP;
                client.baseEntry.count(cb, request1filter);
                var request2filter = new KalturaMediaEntryFilter();
                request2filter.statusEqual = KalturaEntryStatus.READY;
                request2filter.typeEqual = KalturaEntryType.LIVE_STREAM;
                client.baseEntry.count(cb, request2filter);
                client.doMultiRequest(cb);
            }
        });
    },
    //Formats user's storage
    formatStorage:function(size){
        var storage_size = Number(size);
        if(storage_size >= 1){
            return storage_size.toFixed(2) + " GB";
        } else {
            storage_size = storage_size*1000;
            return storage_size.toFixed(2) + " MB";
        }
    },
    //Draw GeoMap
    loadGeoMap:function(){
        smhDash.loadLastSevenDaysMap(null);
    },
    //Register actions
    registerActions:function(){       
        $('#active-content').mCustomScrollbar({
            theme:"inset-dark",
            scrollButtons:{
                enable: true
            }
        });  
        $('#inactive-content').mCustomScrollbar({
            theme:"inset-dark",
            scrollButtons:{
                enable: true
            }
        });
    }
}

// Main on ready
$(document).ready(function(){
    smhDash = new Dashboard();
    smhDash.getUsage();
    if($.inArray("ANALYTICS_BASE", sessPerm) != -1) {
        smhDash.createAreaGraphInstance('vodEntries');
        smhDash.loadLastSevenDaysGraph(null,'top_content','count_plays','vod');
        smhDash.createAreaGraphInstance('liveEntries');
        smhDash.loadLastSevenDaysGraph(null,'live','count_plays','live');
        smhDash.loadGeoMap();      
    }
    smhDash.registerActions();
});

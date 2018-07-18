// Getting URL Value
// Url should have "server" and "OS" values.
// index.html?server=""&os=""
var GET_VALUE = {};
var q_value = window.location.search.substring(1).split("&");
for (var i = 0, max = q_value.length; i < max; i++) {
    if (q_value[i] === "") {
        continue;
    }
    var param = q_value[i].split("=");
    GET_VALUE[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
}

// Fetch JSON data
var json = [];
var x = 0;
var resturl = "http://www.roguard.net/english-patch-status/";
$.getJSON(resturl, function(data) {
    console.log(data);
    for (x in data) {
        if (GET_VALUE.server == data[x].server && GET_VALUE.os == data[x].os &&
            data[x].client == "obt") {
            if (data[x].status == "AVAILABLE") {
                data[x].status = "Available :white_check_mark:";
                data[x].color = "#00ff00";
            }
            if (data[x].status == "OUTDATED") {
                data[x].status = "Outdated :x:";
                data[x].color = "#ff0000";
            }
            if (data[x].status == "DOWNLOADING") {
                data[x].status = "Updating :repeat:";
                data[x].color = "#0000ff";
            }
            json = JSON.stringify(data[x], null, 2);
            break;
        }
    }
    $("#update").html(json);
});
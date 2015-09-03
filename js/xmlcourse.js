        function _$(i){ 
            var j = encodeURIComponent(i);
            return j;
        }
        
        var strUrl = decodeURIComponent(location.search);
        var getPara, ParaVal;
        var aryPara = [];
        var cc, cc2, cc3, cc4;
        var secCount = 0;
        var teacherObj = new Object();
        var classObj = new Object();
        var teacherObj2 = new Object();
        var classObj2 = new Object();
        
        var teacherList = new Object();
        var classList = new Object();
        var courseList = new Object();
        var classPairList = new Object();
        
        
        
        cc = 0;
        cc2 = 0;
        cc3 = 0;
        cc4 = 0;
        if (strUrl.indexOf("?") != -1) {
            var getSearch = strUrl.split("?");
            getPara = getSearch[1].split("&");
            for (i = 0; i < getPara.length; i++) {
                ParaVal = getPara[i].split("=");
                aryPara.push(ParaVal[0]);
                aryPara[ParaVal[0]] = ParaVal[1];
            }

        }

        for (var i; i <= 12; i++) {


        }

        
        $.ajax({
            url: './ClassPair.xml',
            type: 'GET',
            dataType: 'xml', //資料型態可以不設定，且此型態不可是text或html
            timeout: 1000,
            error: function (xml) {
                 alert("教室對應表找不到，採用撈資料模式，煩請管理員在資料夾中放入「ClassPair.xml」！");
                        $.ajax({
                    url: './ClassRoomList.xml',
                    type: 'GET',
                    dataType: 'xml', //資料型態可以不設定，且此型態不可是text或html
                    timeout: 1000,
                    error: function (xml) {

                        alert("採用「教室資料表」找不到，煩請管理員在資料夾中放入「ClassRoomList.xml」！");
                    },
                    success: function (xml) {
                        alert("教室對應表找到了，採用對應模式");
                    }
                });
            },
            success: function (xml) {
                alert("教室對應表找到了，採用對應模式");
            }
        });
        
        

        $.ajax({
            url: './ClassProcessing.xml',
            type: 'GET',
            dataType: 'xml', //資料型態可以不設定，且此型態不可是text或html
            timeout: 1000,
            error: function (xml) {
                alert('讀取xml錯誤' + xml); //當xml讀取失敗
            },
            success: function (xml) {
                $(xml).find("ClassList").each(function (i) { //取得xml父節點       
                    var total = $(xml).find("ClassList").length; //xml的總筆數
                    var classDay = $(this).children("Cday").text();
                    var classSec = $(this).children("Csection").text();
                    var classTeacher = $(this).children("Cteacher").text(); //老師名子
                    var className = $(this).children("className").text(); //課程名字
                    var Cclass = $(this).children("Cclass").text(); //班級
                    var whichClass = "t";
                    var whichDay = "1";
                    var whichSec = "1";
                    var exc = 0;
                    //製作選單列表
                    if (teacherList[classTeacher] >= 1) teacherList[classTeacher] ++;
                        else teacherList[classTeacher] = 1;
                    
                    if (classList[Cclass] >= 1) classList[Cclass] ++;
                        else classList[Cclass] = 1;
                    
                    if (courseList[className] >= 1) courseList[className] ++;
                        else courseList[className] = 1;
                    for(var n=0;n <= 6;n++){
                    var m = n-1;
                    var o = n+1;
                        if (classPairList[classTeacher+"0"] == null){ classPairList[classTeacher+"0"] = className;
exc++;                                                                    }else if(classPairList[classTeacher+"0"] == className){}
        else if(classPairList[classTeacher+m] != null && classPairList[classTeacher+o] == null && exc == 0){
                 classPairList[classTeacher+n] = className;
exc++;
                        }
                }
                    
                    switch (classDay) {

                    case "週一":
                        whichDay = 1;
                        break;
                    case "週二":
                        whichDay = 2;
                        break;
                    case "週三":
                        whichDay = 3;
                        break;
                    case "週四":
                        whichDay = 4;
                        break;
                    case "週五":
                        whichDay = 5;
                        break;

                    }


                    switch (classSec) {
                    case "第一節":
                        whichSec = 1;
                        break;
                    case "第二節":
                        whichSec = 2;
                        break;
                    case "第三節":
                        whichSec = 3;
                        break;
                    case "第四節":
                        whichSec = 4;
                        break;
                    case "第五節":
                        whichSec = 5;
                        break;
                    case "第六節":
                        whichSec = 6;
                        break;
                    case "第七節":
                        whichSec = 7;
                        break;
                    case "第八節":
                        whichSec = 8;
                        break;
                    case "第九節":
                        whichSec = 9;
                        break;
                    case "第十節":
                        whichSec = 10;
                        break;
                    case "第十一節":
                        whichSec = 11;
                        break;
                    case "第十二節":
                        whichSec = 12;
                        break;

                    }
                    whichClass = whichClass.concat(whichSec);
                    whichClass = whichClass.concat(whichDay);



                    if (Cclass == aryPara["class2ID"] || classTeacher == aryPara["teacher2ID"]) {
                        if (whichSec > secCount) {
                            secCount = whichSec;
                        }
                        
                        if (aryPara["class2ID"] != null || aryPara["teacher2ID"] != null) {
                            if (aryPara["class2ID"] != null) {

                                if (cc2 == 0) {
                                    $("#twoTable .tTitle").append(aryPara["class2ID"] + "的班級課表");

                                    cc2++;
                                }

                                $("#twoTable ." + whichClass).append("<span class='cname'>" + className + "</span><br><span class='tname'><a href='./?class2ID=" + _$(aryPara["class2ID"]) + "&teacherID=" + _$(classTeacher) + "'>" + classTeacher + "</a></span>");

                            } else if (aryPara["teacher2ID"] != null) {

                                if (cc2 == 0) {
                                    $("#twoTable .tTitle").append(aryPara["teacher2ID"] + "的教師課表");

                                    cc2++;
                                }

                                $("#twoTable ." + whichClass).append("<span class='cname'>" + className + "</span><br><span class='tname'><a href='./?teacher2ID=" + _$(aryPara["teacher2ID"]) + "&classID=" + _$(Cclass) + "'>" + Cclass + "</span>");

                            }

                        }

                    }

        
//課程查詢左邊
                    if (aryPara["course"] != null && className == aryPara["course"]) {
                        if (cc3 == 0) {
                                    $("#oneTable .tTitle").append(aryPara["course"] + "科的教師課表");

                                    cc3++;
                                }
                        
                        if (teacherObj[classTeacher] >= 1) teacherObj[classTeacher] ++;
                        else teacherObj[classTeacher] = 1;
                        $("#oneTable ." + whichClass).addClass("tName" + classTeacher);
                        $("#oneTable ." + whichClass).addClass("tName" + classTeacher + Cclass);
                        classObj[Cclass] = Cclass;

                        if (whichSec > secCount) {
                            secCount = whichSec;
                        }

                    }//end of 課程查詢左邊
                    
//課程查詢右邊
                    if (aryPara["course2"] != null && className == aryPara["course2"]) {
                        if (cc4 == 0) {
                                    $("#twoTable .tTitle").append(aryPara["course2"] + "科的教師課表");

                                    cc4++;
                                }
                        
                        if (teacherObj2[classTeacher] >= 1) teacherObj2[classTeacher] ++;
                        else teacherObj2[classTeacher] = 1;
                        $("#twoTable ." + whichClass).addClass("tName" + classTeacher);
                        $("#twoTable ." + whichClass).addClass("tName" + classTeacher + Cclass);
                        classObj2[Cclass] = Cclass;

                        if (whichSec > secCount) {
                            secCount = whichSec;
                        }

                    } //end of 課程查詢右邊
                    
                    
        

                    if (Cclass == aryPara["classID"] || classTeacher == aryPara["teacherID"]) {
                        if (whichSec > secCount) {
                            secCount = whichSec;
                        }
                        if (aryPara["classID"] != null || aryPara["teacherID"] != null) {
                            if (aryPara["classID"] != null) {
                                if (cc == 0) {
                                    $("#oneTable .tTitle").append(aryPara["classID"] + "的班級課表");
                                    cc++;
                                }


                                $("#oneTable ." + whichClass).append("<span class='cname'>" + className + "</span><br><span class='tname'><a href='./?classID=" + _$(aryPara["classID"]) + "&teacher2ID=" + _$(classTeacher) + "'>" + classTeacher + "</a></span>");

                            } else if (aryPara["teacherID"] != null) {


                                if (cc == 0) {
                                    $("#oneTable .tTitle").append(aryPara["teacherID"] + "的教師課表");

                                    cc++;
                                }

                                $("#oneTable ." + whichClass).append("<span class='cname'>" + className + "</span><br><span class='tname'><a href='./?teacherID=" + _$(aryPara["teacherID"]) + "&class2ID=" + _$(Cclass) + "'>" + Cclass + "</span>");

                            }


                        }


                    }



                });
                //                console.log(secCount);

                for (var i = secCount + 1; i <= 12; i++) {
                    $(".t" + i + "r").css("display", "none");

                }
Object.getOwnPropertyNames(courseList).forEach(function (val, idx, array) {
    $(".courseList > ul").append("<li>"+val+"</li>");
    $(".teacherList > ul").append("<li class='tcList"+val+"'>"+val+"<ul></ul></li>")
});
                

    Object.getOwnPropertyNames(classPairList).forEach(function (val, idx, array) {
        var nTec = val.replace("[0-9]","");
        //console.log(val+"老師<>課"+classPairList[val]);
        $(".tcList"+classPairList[val]+" > ul").append("<li>"+nTec+"</li>");
        
});
    
                
                Object.getOwnPropertyNames(classList).forEach(function (val, idx, array) {
    $(".classList > ul").append("<li>"+val+"</li>")
});
                

                
                if (aryPara["course"] != null) {
                    Object.getOwnPropertyNames(teacherObj).forEach(function (val, idx, array) {
                        //console.log(val + ' -> ' + teacherObj[val]);
                        $("#oneTable td").append("<span class='disable tName" + val + "'>" + val + "</span><br>");
                        $("#oneTable .tName" + val + " .tName" + val).removeClass("disable");
                        $("#oneTable .tName" + val + " .tName" + val).addClass("tname");

                        for (var i in classObj) {
                            $("#oneTable .tName" + val + i + " .tName" + val).append("<br><span class='classMark'>(" + i + ")</span>");

                        }
                    });
                }
                
                if (aryPara["course2"] != null) {
                    Object.getOwnPropertyNames(teacherObj2).forEach(function (val, idx, array) {
                        //console.log(val + ' -> ' + teacherObj2[val]);
                        $("#twoTable td").append("<span class='disable tName" + val + "'>" + val + "</span><br>");
                        $("#twoTable .tName" + val + " .tName" + val).removeClass("disable");
                        $("#twoTable .tName" + val + " .tName" + val).addClass("tname");

                        for (var i in classObj) {
                            $("#twoTable .tName" + val + i + " .tName" + val).append("<br><span class='classMark'>(" + i + ")</span>");

                        }
                    }); //end of ajax
                }

                
                
                
                
                
                function secCountUpate() {
                    if (whichSec > secCount) {
                        secCount = whichSec;
                    }
                }

                $("#oneTable").css("display", "block");
                $("#twoTable").css("display", "block");
            }


        })
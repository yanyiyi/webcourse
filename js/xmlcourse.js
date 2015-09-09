//The MIT License (MIT)
//
//Copyright (c) 2015 Yanyiyi 
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.

function _$(i) {
        var j = encodeURIComponent(i);
        return j;
    }

function XMLreader(){

$.ajax({
        url: './Room.xml',
        type: 'GET',
        dataType: 'xml', //資料型態可以不設定，且此型態不可是text或html
        timeout: 10000,
        error: function (xml) {
            //alert("教室對應表找不到，採用撈資料模式，煩請管理員在資料夾中放入「ClassPair.xml」！");
            
            
            $.ajax({
                url: './ClassRoomList.xml',
                type: 'GET',
                dataType: 'xml', //資料型態可以不設定，且此型態不可是text或html
                timeout: 1000,
                error: function (xml) {

                    // alert("採用「教室資料表」找不到，煩請管理員在資料夾中放入「ClassRoomList.xml」！");
                },
                success: function (xml) {
                    //alert("教室對應表找到了，採用對應模式");                 


                }
            });
        },
        success: function (xml) {

            $(xml).find("RoomList").each(function (i) { //取得xml父節點
                // alert("教室對應表找到了，採用對應模式");
                var total = $(xml).find("RoomList").length; //
                var Rid = $(this).children("Rid").text();
                var Rori = $(this).children("RoriClass").text();
                var Room = $(this).children("Room").text();


                classRoom[Rori] = Room;



            });


        }
    });
 



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
    var CateON = false;
    var classRoom = new Object();
    var CateCourse = new Object();
    var CateNameList = new Object();
    cc = 0;
    cc2 = 0;
    cc3 = 0;
    cc4 = 0;
    cc5 = 0;
    cc6 = 0;
    if (strUrl.indexOf("?") != -1) {
        var getSearch = strUrl.split("?");
        getPara = getSearch[1].split("&");
        for (i = 0; i < getPara.length; i++) {
            ParaVal = getPara[i].split("=");
            aryPara.push(ParaVal[0]);
            aryPara[ParaVal[0]] = ParaVal[1];
        }

    }

    if (aryPara["course2"] == "undefined") aryPara["course2"] = "";
    if (aryPara["course"] == "undefined") aryPara["course"] = "";
    if (aryPara["classID"] == "undefined") aryPara["classID"] = "";
    if (aryPara["class2ID"] == "undefined") aryPara["class2ID"] = "";
    if (aryPara["teacherID"] == "undefined") aryPara["teacherID"] = "";
    if (aryPara["teacher2ID"] == "undefined") aryPara["teacher2ID"] = "";
    
    $.ajax({
        url: './ClassProcessing.xml',
        type: 'GET',
        dataType: 'xml', //資料型態可以不設定，且此型態不可是text或html_
        timeout: 10000,
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


                if (exc == 0) {
                    for (var n = 1; n <= 6; n++) {
                        var m = n - 1;
                        var o = n + 1;

                        classPairList[classTeacher + "0"] = 1;

                        //console.log("1-N:"+n+",老師:"+classTeacher+",課程:"+ className+",開關:"+ exc + classPairList[classTeacher + m]);

                        if (classPairList[classTeacher + m] != className) {
                            //console.log("2-N:"+n+",老師:"+classTeacher+",課程:"+ className+",開關:"+ exc);                                    
                            if (classPairList[classTeacher + "0"] == null || classPairList[classTeacher + m] != null) {
                                //console.log("3-N:"+n+",老師:"+classTeacher+",課程:"+ className+",開關:"+ exc);                     

                                if (classPairList[classTeacher + o] == null && classPairList[classTeacher + n] == null) {


                                    classPairList[classTeacher + n] = className;
                                    exc = 1;
                                    //console.log("N:"+n+",老師:"+classTeacher+",課程:"+ className+",開關:"+ exc);

                                }
                            }

                        }



                    } /// end of for loop for Arrar Object Check
                }
                //製作選單列表 end
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


                if (Cclass == aryPara["classID"] || classTeacher == aryPara["teacherID"]) {
                    if (whichSec > secCount) {
                        secCount = whichSec;
                    }
                    if (aryPara["classID"] != null || aryPara["teacherID"] != null) {
                        if (aryPara["classID"] != null && aryPara["classID"] != "") {
                            if (cc == 0) {
                                $("#oneTable .tTitle").append(aryPara["classID"] + "的班級課表");
                                cc++;
                            }

                            $("#oneTable ." + whichClass).append("<span class='cname'><a href='./?course2=" + _$(className) + "&classID=" + _$(aryPara["classID"]) + "'>" + className + "</a></span><br><span class='tname'><a href='./?classID=" + _$(aryPara["classID"]) + "&teacher2ID=" + _$(classTeacher) + "'>" + classTeacher + "</a></span>");


                        } else if (aryPara["teacherID"] != null && aryPara["teacherID"] != "") {


                            if (cc == 0) {
                                $("#oneTable .tTitle").append(aryPara["teacherID"] + "的教師課表");

                                cc++;
                            }

                            $("#oneTable ." + whichClass).append("<span class='cname'><a href='./?course2=" + _$(className) + "&classID=" + aryPara["classID"] + "&course=" + aryPara["course"] + "&teacherID=" + aryPara["teacherID"] + " '>" + className + "</a></span><br><span class='tname'><a href='./?teacherID=" + _$(aryPara["teacherID"]) + "&class2ID=" + _$(Cclass) + "'>" + Cclass + "</span>");

                        }

                    }

                }


                if (Cclass == aryPara["class2ID"] || classTeacher == aryPara["teacher2ID"]) {
                    if (whichSec > secCount) {
                        secCount = whichSec;
                    }
                    if (aryPara["class2ID"] != null || aryPara["teacher2ID"] != null) {

                        if (aryPara["class2ID"] != null && aryPara["class2ID"] != "") {

                            if (cc2 == 0) {
                                $("#twoTable .tTitle").append(aryPara["class2ID"] + "的班級課表");
                                cc2++;
                            }

                            $("#twoTable ." + whichClass).append("<span class='cname'><a href='./?course=" + _$(className) + "&class2ID=" + _$(aryPara["class2ID"]) + "'>" + className + "</a></span><br><span class='tname'><a href='./?class2ID=" + _$(aryPara["class2ID"]) + "&teacherID=" + _$(classTeacher) + "'>" + classTeacher + "</a></span>");

                        } else if (aryPara["teacher2ID"] != null && aryPara["teacher2ID"] != "") {

                            if (cc2 == 0) {
                                $("#twoTable .tTitle").append(aryPara["teacher2ID"] + "的教師課表");
                                cc2++;

                            }

                            $("#twoTable ." + whichClass).append("<span class='cname'><a href='./?course=" + _$(className) + "&class2ID=" + _$(aryPara["class2ID"]) + "&course2=" + _$(aryPara["class2ID"]) + "&teacher2ID=" + _$(aryPara["teacher2ID"]) + "'>" + className + "</a></span><br><span class='tname'><a href='./?teacher2ID=" + _$(aryPara["teacher2ID"]) + "&classID=" + _$(Cclass) + "'>" + Cclass + "</span>");

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

                } //end of 課程查詢左邊

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




                if (aryPara["room1"] != null) {
                    Object.getOwnPropertyNames(classRoom).forEach(function (val, idx, array) {

                        if (className == val && aryPara["room1"] == classRoom[val]) {
                            if (cc5 == 0) $("#oneTable h1").append(classRoom[val]);
                            $("#oneTable ." + whichClass).append("<span class='cname'><a href='./?course2=" + _$(className) + "&room1=" + _$(aryPara["room1"]) + "'>" + className + "</a></span><br><span class='tname'><a href='./?teacher2ID=" + _$(classTeacher) + "&room1=" + _$(aryPara["room1"]) + "'>" + classTeacher + "</a></span><br><span class='tname classMark'><a href='./class2ID=" + _$(Cclass) + "&room1=" + _$(aryPara["room1"]) + "'>(" + Cclass + ")</a></span><br>");
                            cc5++;
                        }

                    });
                }

                if (aryPara["room2"] != null) {
                    Object.getOwnPropertyNames(classRoom).forEach(function (val, idx, array) {

                        if (className == val && aryPara["room2"] == classRoom[val]) {
                            if (cc6 == 0) $("#twoTable h1").append(classRoom[val]);
                            $("#twoTable ." + whichClass).append("<span class='cname'><a href='./?course=" + _$(className) + "&room2=" + _$(aryPara["room2"]) + "'>" + className + "</a></span><br><span class='tname'><a href='./?teacherID=" + _$(classTeacher) + "&room2=" + _$(aryPara["room2"]) + "'>" + classTeacher + "</a></span><br><span class='tname classMark'><a href='./?classID=" + _$(Cclass) + "&room2=" + _$(aryPara["room2"]) + "'>(" + Cclass + ")</a></span><br>");
                            cc6++;
                        }

                    });
                }


                
            });

        },
        complete: function (xml) {
    $.ajax({
        url: './Category.xml',
                type: 'GET',
                dataType: 'xml', //資料型態可以不設定，且此型態不可是text或html
                timeout: 1000,
                error: function (xml) {
                   Object.getOwnPropertyNames(courseList).forEach(function (val, idx, array) {

                $(".one .teacherList > ul").append("<li onClick='' class='tcList" + val + "'><a href='./?course=" + _$(val) + "&class2ID=" + _$(aryPara["class2ID"]) + "&teacher2ID=" + _$(aryPara["teacher2ID"]) + "'>" + val + "</a><ul></ul></li>");
                $(".two .teacherList > ul").append("<li onClick='' class='tcList" + val + "'><a href='./?course2=" + _$(val) + "&classID=" + aryPara["classID"] + "&teacherID=" + aryPara["teacherID"] + "'>" + val + "</a><ul></ul></li>");

                $(".one .courseList > ul").append("<li><a href='./?course=" + _$(val) + "&class2ID=" + _$(aryPara["class2ID"]) + "&teacher2ID=" + _$(aryPara["teacher2ID"]) + "&course2=" + aryPara["course"] + "'>" + val + "</a><ul></ul></li>");

                $(".two .courseList > ul").append("<li><a href='./?course2=" + _$(val) + "&classID=" + aryPara["classID"] + "&teacherID=" + aryPara["teacherID"] + "&course=" + aryPara["course"] + "'>" + val + "</a><ul></ul></li>");
                if (val.substr(0, 1) == "補") $(".tcList" + val).css("display", "none");
            });  
  
  
                },
        
                success: function (xml) {
                  CateON = true;
                                    $(xml).find("CateList").each(function (i) {
                                        
                     var courseName = $(this).children("courseName").text(); 
                      var cateName = $(this).children("cateName").text(); 
                       
                    CateCourse[courseName] = cateName;
                    
                    if (CateNameList[cateName] != null) CateNameList[cateName] = 1 ; else CateNameList[cateName]++;                
                                        
                                        
                   });



                    Object.getOwnPropertyNames(CateNameList).forEach(function (val, idx, array) {

                $(".one .teacherList > ul").append("<li class='cX"+val+"'>" + val + "<ul></ul></li>");
                $(".two .teacherList > ul").append("<li class='cX"+val+"'>" + val + "<ul></ul></li>");

                $(".one .courseList > ul").append("<li class='cX"+val+"'>" + val + "<ul></ul></li>");

                $(".two .courseList > ul").append("<li class='cX"+val+"'>" + val + "<ul></ul></li>");
 
                                });

Object.getOwnPropertyNames(courseList).forEach(function (val, idx, array) {

                $(".one .teacherList > ul > .cX"+CateCourse[val]+" > ul").append("<li onClick='' class='tcList" + val + "'><a href='./?course=" + _$(val) + "&class2ID=" + _$(aryPara["class2ID"]) + "&teacher2ID=" + _$(aryPara["teacher2ID"]) + "'>" + val + "</a><ul></ul></li>");
                $(".two .teacherList > ul > .cX"+CateCourse[val]+" > ul").append("<li onClick='' class='tcList" + val + "'><a href='./?course2=" + _$(val) + "&classID=" + aryPara["classID"] + "&teacherID=" + aryPara["teacherID"] + "'>" + val + "</a><ul></ul></li>");

                $(".one .courseList > ul > .cX"+CateCourse[val]+" > ul").append("<li><a href='./?course=" + _$(val) + "&class2ID=" + _$(aryPara["class2ID"]) + "&teacher2ID=" + _$(aryPara["teacher2ID"]) + "&course2=" + aryPara["course"] + "'>" + val + "</a><ul></ul></li>");

                $(".two > .courseList > ul > .cX"+CateCourse[val]+" > ul").append("<li><a href='./?course2=" + _$(val) + "&classID=" + aryPara["classID"] + "&teacherID=" + aryPara["teacherID"] + "&course=" + aryPara["course"] + "'>" + val + "</a><ul></ul></li>");
                if (val.substr(0, 1) == "補") $(".tcList" + val).css("display", "none");
            });  
                    
                                        
                },
        
            complete: function (xml) {
            Object.getOwnPropertyNames(classPairList).forEach(function (val, idx, array) {
                var nTec = val.length;
                nTec = val.substring(0, nTec - 1);
                //console.log(val + "老師<>課" + classPairList[val]);
                $(".one .tcList" + classPairList[val] + " > ul").append("<li><a href='./?teacherID=" + _$(nTec) + "&class2ID=" + _$(aryPara["class2ID"]) + "&course2=" + _$(aryPara["class2ID"]) + "&teacher2ID=" + _$(aryPara["teacher2ID"]) + " '>" + nTec + "</li>");

                $(".two .tcList" + classPairList[val] + " > ul").append("<li><a href='./?teacher2ID=" + _$(nTec) + "&classID=" + aryPara["classID"] + "&course=" + aryPara["course"] + "&teacherID=" + aryPara["teacherID"] + " '>" + nTec + "</li>");

            });
        }
    });  
            
   $.ajax({
        url: './section.xml',
                type: 'GET',
                dataType: 'xml', //資料型態可以不設定，且此型態不可是text或html
                timeout: 1000,
                error: function (xml) {
                    
                },
                success: function (xml) {
                    //alert("教室對應表找到了，採用對應模式");  
                    $(xml).find("section").each(function (i) { //取得xml父節點  
                    var sec = $(this).children("section").text();
                    var newSec = $(this).children("newSec").text();
                    var startTime = $(this).children("startTime").text();
                    var startMin = $(this).children("startMin").text();
                    var endTime = $(this).children("endTime").text();
                    var endMin = $(this).children("endMin").text();
                        
                        $(".t"+(i+1)+"0").html(newSec+"<br><span class='time'>"+startTime+":"+startMin+"<br>-"+endTime+":"+endMin+"</span>");
                        
                        if( (i+1) == 5 && startTime >= 12) $(".t6r.lunchtime").css("display","none");
                        else if((i+1) == 5) $(".t5r.lunchtime").css("display","none");
                 
                    if( (i+1) == 9 && startTime >= 17) $(".t10r.sleeptime").css("display","none");
                        else if((i+1) == 9) $(".t9r.sleeptime").css("display","none");
                    });
                }
    });
            //                console.log(secCount);
            if (secCount <= 7) secCount = 7;
            for (var i = secCount + 1; i <= 12; i++) {
                $(".t" + i + "r").css("display", "none");

            }
            
     


            function whichGrade(i) {
                var gClass = 0;
                var isub = i.substr(0, 1);

                if (isub == "一" || isub == "1") {
                    $(".c7").css("display", "none");
                    gClass = ".c1";
                    return gClass;
                }

                if (isub == "二" || isub == "2") {
                    $(".c8").css("display", "none");
                    gClass = ".c2";
                    return gClass;
                }
                if (isub == "三" || isub == "3") {
                    gClass = ".c3";
                    $(".c9").css("display", "none");
                    return gClass;

                }
                if (isub == "七" || isub == "7") {
                    gClass = ".c7";
                    $(".c1").css("display", "none");
                    return gClass;
                }

                if (isub == "八" || isub == "8") {
                    gClass = ".c8";
                    $(".c2").css("display", "none");
                    return gClass;
                }

                if (isub == "九" || isub == "9") {
                    gClass = ".c9";
                    $(".c9").css("display", "none");
                    return gClass;

                }

            }

            

            Object.getOwnPropertyNames(classList).forEach(function (val, idx, array) {
                var g = whichGrade(val);
                $(".one .classList > ul > li" + g + " ul").append("<li><a href='./?classID=" + _$(val) + "&class2ID=" + _$(aryPara["class2ID"]) + "&course2=" + _$(aryPara["class2ID"]) + "&teacher2ID=" + _$(aryPara["teacher2ID"]) + " '>" + val + "</a></li>");

                $(".two .classList > ul > li" + g + " ul").append("<li><a href='./?class2ID=" + _$(val) + "&classID=" + _$(aryPara["classID"]) + "&course=" + _$(aryPara["course"]) + "&teacherID=" + _$(aryPara["teacherID"]) + " '>" + val + "</a></li>");
            });


            Object.getOwnPropertyNames(classRoom).forEach(function (val, idx, array) {
                
                $(".one .roomList > ul").append("<li><a href='./?room1=" + _$(classRoom[val]) + "&room2=" + _$(aryPara["room2"]) + "&class2ID=" + _$(aryPara["class2ID"]) + "&course2=" + _$(aryPara["course2"]) + "&teacher2ID=" + _$(aryPara["teacher2ID"]) + "'>" + classRoom[val] + "</a></li>");
                $(".two .roomList > ul").append("<li><a href='./?room2=" + _$(classRoom[val]) + "&room1=" + _$(aryPara["room1"]) + "&classID=" + _$(aryPara["classID"]) + "&course=" + _$(aryPara["course"]) + "&teacherID=" + _$(aryPara["teacherID"]) + "'>" + classRoom[val] + "</a></li>");

            });



            if (aryPara["course"] != null || aryPara["course"] != "") {
                Object.getOwnPropertyNames(teacherObj).forEach(function (val, idx, array) {
                    //console.log(val + ' -> ' + teacherObj[val]);
                    $("#oneTable td").append("<span class='disable tName" + val + "'><a href='./?teacher2ID=" + _$(val) + "&classID=" + _$(aryPara["classID"]) + "&course=" + _$(aryPara["course"]) + " '>" + val + "</a></span><br>");



                    $("#oneTable .tName" + val + " .tName" + val).removeClass("disable");
                    $("#oneTable .tName" + val + " .tName" + val).addClass("tname");

                    for (var i in classObj) {
                        $("#oneTable .tName" + val + i + " .tName" + val).append("<br><span class='classMark'><a href='./?class2ID=" + _$(i) + "&classID=" + _$(aryPara["classID"]) + "&course=" + _$(aryPara["course"]) + "&teacherID=" + _$(aryPara["teacher"]) + " '>(" + i + ")</span>");

                    }
                });
            }

            if (aryPara["course2"] != null, aryPara["course2"] != "") {
                Object.getOwnPropertyNames(teacherObj2).forEach(function (val, idx, array) {
                    //console.log(val + ' -> ' + teacherObj2[val]);
                    $("#twoTable td").append("<span class='disable tName" + val + "'><a href='./?teacherID=" + _$(val) + "&class2ID=" + _$(aryPara["class2ID"]) + "&course2=" + _$(aryPara["course2"]) + " '>" + val + "</span><br>");
                    $("#twoTable .tName" + val + " .tName" + val).removeClass("disable");
                    $("#twoTable .tName" + val + " .tName" + val).addClass("tname");

                    for (var i in classObj2) {
                        $("#twoTable .tName" + val + i + " .tName" + val).append("<br><span class='classMark'><a href='./?classID=" + _$(i) + "&class2ID=" + _$(aryPara["class2ID"]) + "&course2=" + _$(aryPara["course2"]) + "&teacher2ID=" + aryPara["teacher2ID"] + " '>(" + i + ")</span>");

                    }
                }); //end of ajax
            }


            $("#oneTable").css("display", "block");
            $("#twoTable").css("display", "block");
            $("#foo").remove();
        }
    });
}
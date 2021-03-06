
var oEditors = [];
$(function(){
      nhn.husky.EZCreator.createInIFrame({
          oAppRef: oEditors,
          elPlaceHolder: "qna", //textarea에서 지정한 id와 일치해야 합니다. 
          //SmartEditor2Skin.html 파일이 존재하는 경로
          sSkinURI: "/resources/SE2/SmartEditor2Skin.html",  
          htParams : {
              // 툴바 사용 여부 (true:사용/ false:사용하지 않음)
              bUseToolbar : true,             
              // 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
              bUseVerticalResizer : true,     
              // 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
              bUseModeChanger : true,         
              fOnBeforeUnload : function(){
                   
              }
          }, 
          fOnAppLoad : function(){
              //기존 저장된 내용의 text 내용을 에디터상에 뿌려주고자 할때 사용
              //oEditors.getById["ir1"].exec("PASTE_HTML", ["기존 DB에 저장된 내용을 에디터에 적용할 문구"]);
          },
          fCreator: "createSEditor2"
      });
      
    
});

/********************************************************************
Name   : ready                                                 
Desc   : 
Param  :            
********************************************************************/
$(document).ready(function(){

	showPaging(1,5);
	
	$("#imgInp").change(function(){
		readURL(this);
	});
	
	$('#fileupload').click(function(event){
		console.log("fileupload");
        event.preventDefault();
        fileupload();
	});
	
	$('#btn_sch').click(function(){
		console.log("btn_sch");
		getList();
	});
	
	$('#btn_sch2').click(function(){
		console.log("btn_sch2");
		getList2();
	});
	
	$('#sms').click(function(){
		 $('#target').submit();
		
	});
	
	  //저장버튼 클릭시 form 전송
    $("#save").click(function(){
        //oEditors.getById["qna"].exec("UPDATE_CONTENTS_FIELD", []);
    	var sHTML = oEditors.getById["qna"].getIR();
    	alert(sHTML);
       
    	
    	
    });    
});



/********************************************************************
Name   :      readURL                                            
Desc   : 
Param  :            
********************************************************************/
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader(); 
        reader.onload = function (e) { 
            $('#blah').attr('src', e.target.result);
        }                    
        reader.readAsDataURL(input.files[0]);
    }
}


/********************************************************************
Name   :      readURL                                            
Desc   : 
Param  :            
********************************************************************/
function fileupload() {
	var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    //data.append("CustomField", "This is some extra data, testing");

    //console.log(data);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/sample/fileupload",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
            $("#result").text(data);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            $("#result").text(e.responseText);
            console.log("ERROR : ", e);
        }
    });
}

function setHiChart(){
	Highcharts.chart('container', {

	    title: {
	        text: '테스트, 2010-2016'
	    },

	    subtitle: {
	        text: 'Source: 테스트'
	    },

	    yAxis: {
	        title: {
	            text: 'Number of Employees'
	        }
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },

	    plotOptions: {
	        series: {
	            label: {
	                connectorAllowed: false
	            },
	            pointStart: 2010
	        }
	    },

	    series: [{
	        name: 'Installation',
	        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
	    }, {
	        name: 'Manufacturing',
	        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
	    }, {
	        name: 'Sales & Distribution',
	        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
	    }, {
	        name: 'Project Development',
	        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
	    }, {
	        name: 'Other',
	        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
	    }],

	    responsive: {
	        rules: [{
	            condition: {
	                maxWidth: 500
	            },
	            chartOptions: {
	                legend: {
	                    layout: 'horizontal',
	                    align: 'center',
	                    verticalAlign: 'bottom'
	                }
	            }
	        }]
	    }

	});
}

/********************************************************************
Name   :      getList                                            
Desc   : 
Param  :            
********************************************************************/
function getList(){
	console.log("testList11");
	$.ajax(
			{async : true
			,type : "POST"
			,url : "/sample/testList"
			,dataType : "json"
			,data: {ID : '1'}
			,success : function(jsonData) {
				console.log("success" + jsonData.name);
				console.log(jsonData);
				$('#test').val(jsonData.name);
				alert("test");
			}
			,error:	function(request,status,error){
				console.log("error");
				console.log(request);
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
	});
}


/********************************************************************
Name   :      getList2                                            
Desc   : 
Param  :            
********************************************************************/
function getList2(){
	console.log("testListAll");
	$.ajax({async : false
		, url: '/sample/testListAll'
		, dataType: 'JSON'
		, type: 'POST'
		, data: { 
			IDNO1 		: 'test1',
			IDNO2 		: 'test1',
			meberName 	: 'test1'
		}
		, success: function(data) {
			console.log("success");
			console.log(data);
		}
		,complete : function(data) {
			console.log("com");
		}
		, error: function(xhr, ajaxOptions, thrownError) {
			console.log(xhr);
			console.log(ajaxOptions);
			console.log(thrownError);
//			alert('', '', '오류가 발생했습니다.. [' + xhr.status + ']', true);
		}
	});
	
}



/********************************************************************
Name   :      getList3                                            
Desc   : 
Param  :            
********************************************************************/
function getList3(){
	console.log("testListAll");
	$.ajax({
		 url: '/sample/testList2'
		, dataType: 'JSON'
		, type: 'POST'
		, data: { 
			IDNO1 		: 'test1',
			IDNO2 		: 'test1',
			meberName 	: 'test1'
		}
		, success: function(data) {
			console.log("success");
			console.log(data);
			alert(data);
		}
		,complete : function(data) {
			console.log("com");
		}
		, error: function(xhr, ajaxOptions, thrownError) {
			console.log(xhr);
			console.log(ajaxOptions);
			console.log(thrownError);
//			alert('', '', '오류가 발생했습니다.. [' + xhr.status + ']', true);
		}
	});
	
}




function showPaging(page,totalPage){
	page = parseInt(page);
	totalPage = parseInt(totalPage);
	var paging = $('#paging');
	paging.html("");
	var defSpan = $(document.createElement('span'));
	var limit = 10;
	var st = Math.floor((page-1)/limit)*(limit)+1;
	var ed = Math.min(st+limit-1,totalPage);
	var spans = [];
	if(totalPage<=0){
		paging.html("NoPage");
		return;
	}


	var span = defSpan.clone();
	span.prop('page',1);
	span.text('처음');
	spans.push(span);

	var span = defSpan.clone();
	span.prop('page',(st-1)<=0?-1:(st-1));
	span.text('이전');
	spans.push(span);

	for(var i=st,m=ed;i<=m;i++){
		var span = defSpan.clone();
		span.prop('page',i);
		if(i == page){
			span.addClass('current');
		}
		span.text(i);
		spans.push(span);
	}

	var span = defSpan.clone();
	span.prop('page',(ed+1)>=totalPage?-1:(ed+1));
	span.text('다음');
	spans.push(span);

	var span = defSpan.clone();
	span.prop('page',totalPage);
	span.text('마지막');
	spans.push(span);
	
	for(var i=0,m=spans.length;i<m;i++){
		paging.append(spans[i]);
	}

}
function submitPaging(n){
	alert(n);
	return false;
	if(!selectedShForm){return false;}
	selectedShForm.page.value = n;
	if(selectedShForm.onsubmit()){
		selectedShForm.submit();
	}
}
function clickPaging(event,paging){
	alert(paging);
	event = $(event)[0];
	if(event.target && event.target.tagName =='SPAN' && event.target.page && event.target.page>0){
		submitPaging(event.target.page)

	}
	return false;
}
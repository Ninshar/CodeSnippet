(function($){ 
    $.extend({  
        hintShow: function({type,hintText}) {//sizes设置图片大小，imageUrl设置图片路径  
            var type = type || 0;
            var bgColor = '#00CC99';
            switch(type){
                case 0:
                    bgColor='#00CC99';
                    break;
                case 1:
                    bgColor='#CCCC66';
                    break;
                case 2:
                    bgColor='#FF0033';
                    break;
            }
			var loadingDiv ='<div id="hints" class="hintbox" style="background-color:'+bgColor+';">'
                                +'<span>'+hintText+'</span>'+
                            +'</div>';
            $('body').append(loadingDiv);  
            $('#hints').animate({top:'10px'},200,function(){
                setTimeout(function(){
                   $('#hints').animate({top:'-50px'},200,function(){
                        $('#hints').remove();
                    })
                },3000)
            })
		},  
        hintHide: function() {  
            $('#hints').remove();
        }  
    })
})($);
			
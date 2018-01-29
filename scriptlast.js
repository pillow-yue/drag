window.onload = function(){
    var aLi = document.getElementsByTagName("li");
    var i = 0;
    var aPos = [];
    var iMinZindex = 2;
    for (i=0;i<aLi.length;i++){
        aPos[i]={left: aLi[i].offsetLeft,top: aLi[i].offsetTop}
    }
    for(i=0;i<aLi.length;i++){
        aLi[i].style.left = aPos[i].left + "px";
        aLi[i].style.top = aPos[i].top + "px";
        aLi[i].style.position = "absolute";
        aLi[i].style.margin = "0";
        aLi[i].index = i;
    }
    for(i=0;i<aLi.length;i++){
        setDrag(aLi[i]);
    }
    function setDrag(obj){
        obj.onmousedown = function(ev){
            obj.style.zIndex = iMinZindex++;
            var oEvent = ev||event;
            var disX = oEvent.clientX - obj.offsetLeft;
            var disY = oEvent.clientY - obj.offsetTop;

            document.onmousemove = function(ev){
                var oEvent = ev||event;
                obj.style.left = oEvent.clientX - disX + "px";
                obj.style.top = oEvent.clientY - disY + "px";
                for(i=0;i<aLi.length;i++){
                    aLi[i].className = "";
                }
                var oNear = near(obj);
                if(oNear){
                    oNear.className = "active";
                }
            }
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
                var oNear = near(obj);
                if(oNear){
                    oNear.className = "";
                    oNear.style.zIndex = iMinZindex++;
                    obj.style.zIndex = iMinZindex++;
                    startMove(obj,aPos[oNear.index]);
                    startMove(oNear,aPos[obj.index]);
                    var temp = obj.index;
                    obj.index = oNear.index;
                    oNear.index = temp;
                }else{
                    startMove(obj,aPos[obj.index]);
                }
            }
            clearInterval(obj.timer);
            return false;
        }
        function test(obj1,obj2){
            var l1 = obj1.offsetLeft;
            var r1 = obj1.offsetLeft + obj1.offsetWidth;
            var t1 = obj1.offsetTop;
            var b1 = obj1.offsetTop + obj1.offsetHeight ;
    
            var l2 = obj2.offsetLeft;
            var r2 = obj2.offsetLeft + obj2.offsetWidth;
            var t2 = obj2.offsetTop;
            var b2 = obj2.offsetTop + obj2.offsetHeight ;
            if(l1>r2 || r1<l2 || t1>b2 || b1<t2){
                return false;
            }
            else{
                return true;
            } 
        }
        function getDis(obj1,obj2){
            var a = obj1.offsetLeft - obj2.offsetLeft;
            var b = obj1.offsetTop - obj2.offsetTop;

            return Math.sqrt(a*a+b*b);
        }
        function near(obj){
            var iMin = 99999999;
            var iMinIndex = -1;
            for(i=0;i<aLi.length;i++){
                if(obj == aLi[i])continue;

                if(test(obj,aLi[i])){
                    var dis = getDis(obj,aLi[i]);
                    if(iMin>dis){
                        iMin = dis;
                        iMinIndex = i;
                    }
                }
            }
            if(iMinIndex == -1){
                return false;
            }else{
                return aLi[iMinIndex];
            }
        }
    }
}
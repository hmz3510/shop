$(function(){
    /*为你推荐商品事件 */
    $(()=>{
            var timer;
            var $wrap =$(".wrap"), len=540, i=0;
            function goodsMove(){
                timer = setInterval(()=>{
                    i>=len?i=0:i++;
                    $wrap.css('left',`${-i*1}px`)
                },50)

            }
            goodsMove();
            $wrap.hover(
                ()=>{
                    clearInterval(timer);
                    timer=null;
                },
                ()=>goodsMove()
            );
    })




    /*绑定标题查询结果处事件 */
    if(location.search.indexOf("kwords=")!=-1){
        var kwords = decodeURI(location.search.split("=")[1]);
        //console.log(kwords);
        $(".search>strong").html(`"${kwords}"`)
        var mun = $(".search-r").children(":last-child");
        var pno=0;
        function loadpage(no=0){
            pno=no;
            //console.log(pno)
            $.ajax({
                url:"http://localhost:3000/products",
                type:"get",
                data:{kwords,pno},
                dataType:"json",
                success:function(output){
                    console.log(output);
                    $(".search-r>span>strong").html(output.count);
                    var {products,pageCount} =output;
                    if(pageCount>1){
                        mun.html(`/${pageCount}`)
                    }else{
                        mun.html(`页`)
                    }
                    var html="";
                    for(var p of products){
                        //console.log(p)
                        var {lid,title,price,md,took}=p
                        html+=`<li>
                        <div class="product-top">
                            <a href="product_details.html?lid=${lid}" title="${p.title}"><img src="${md}" alt=""></a>
                            <div class="desc">
                                <span>￥${p.price.toFixed(2)}</span>
                                <a href="" >${p.title}</a>
                                <a href="">${p.took}条评价</a>
                            </div>
                            <div class="addCart">
                                <a href="">
                                    <input type="checkbox">
                                    <span>对比</span>
                                </a>
                                <a href="">
                                    <img src="images/shopping_cart/foodstore_img3.png" alt="" data->
                                    <span>收藏</span>
                                </a>
                                <a href="">
                                    <img src="images/header/shop_car1.png" alt="">
                                    <span>加入购物车</span>
                                </a>
                            </div>
                        </div>
                     </li>`
                    }
                    $(".middle-content>ul").html(html);
                    var html=""
                    for(var i=1;i<=pageCount;i++){
                        html+=`<a href="" class="${i==pno+1?'selectd':''}">${i}</a>`
                    }
                    $(".pages").children(":not(:first-child):not(:last-child)").remove();
                    $(".pages>a").first().after(html);
                    $(".page-move>span").html(`共${pageCount}页`)
                    //console.log(pno,pageCount)
                    var $page = $('.pages') //pno0为第一页
                    if(pno==0){
                        $page.children().first().addClass("disabled")
                       
                    }else{
                        $page.children().first().removeClass("disabled");
                    }
                    if(pno==pageCount-1){
                        $page.children().last().addClass("disabled")
                    }else{
                        $page.children().last().removeClass("disabled")
                    }
                }
            })
        }
        loadpage()
        var $page = $('.pages');
        //第几页点击事件
        $page.on("click","a",function(e){
            e.preventDefault();
            var a = $(this)
            if(!a.is(".disabled,.selectd")){ //除了禁用的和选中的其它才能点
                if(a.is(":first-child")){
                    var no = pno-1
                    //console.log(no)
                }else if(a.is(":last-child")){
                    var no = pno+1
                    //console.log(no)     
                }else{  //0为第一页所以新页号要-1
                    var no = a.html()-1;
                    $('.pages').children().first().removeClass("disabled");
                    //console.log(no)
                }
            loadpage(no);
            }     
        })
        $(".middle-page").children().last().on("click",function(e){
            e.preventDefault();
            let n=$(".page-move").children().last().val()-1;
            loadpage(n);
        })


        
    }








})
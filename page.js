/**
 * Created by hisihi on 2016/11/9.
 */
(function ($) {

    $.fn.extend({
        "page":function(options){
            //do something
            var opts = $.extend({}, defaluts, options); //ʹ��jQuery.extend ���ǲ��Ĭ�ϲ���
            return this.each (function (){  //�����this����jquery��������return��Ϊ��֧����ʽ����
            // ����������Ҫչʾ��dom��������page()�������һ�����ϵ�ʱ��
                    var $this = $(this),//��ȡ��ǰdom��jquery���������this�ǵ�ǰѭ����dom
                        len = opts.totalPages,
                        num = opts.liNums,
                        active = opts.activeClass,
                        str = '',
                        str1='',
                        list='',
                        i;
                    //Ĭ�ϵ�һҳ��ѡ��״̬
                    str1 = '<li><a href="javascript:" class="'+ active +'">1</a></li>';
                    //�ж���ҳ���Ƿ�Ϸ�
                    if (len > 1 && len < num+1) {
                        //�ӵڶ�ҳ��ʼѭ������ҳ�棬ʼ��Ĭ��չʾ�е�һҳ
                        for (i = 2; i < len + 1; i++) {
                            str += '<li><a href="javascript:">' + i + '</a></li>';
                        }
                    }else if(len > num){
                        for (i = 2; i < num + 1; i++) {
                            str += '<li><a href="javascript:">' + i + '</a></li>';
                        }
                    }
                    //�ж��Ƿ���ں�һҳ��ť������У���չʾĩҳ��ť
                    if(opts.hasNext){
                        list +='<div class="next-page">'+ opts.next+ '</div>';
                    }
                    //�ж��Ƿ���ĩҳ��ť
                    if(opts.hasLastPage){
                        list +='<div class="last-btn">' + opts.lastPage + '</div>';
                    }
                    //��Ĭ��չʾ�ĵ�һҳ��ʣ��ҳ��ƴ������
                    list  +='<ul class="page-list">'+ str1 + str +'</ul>';
                    //�ж�ҳ���Ƿ�����ҳ��ť
                    if(opts.hasFirstPage){
                        list +='<div class="first-btn">'+ opts.firstPage +'</div>';
                    }
                    //�ж�ҳ���Ƿ���ǰһҳ��ť
                    if(opts.hasPrv) {
                        list +='<div class="first-btn">'+ opts.page +'</div>';
                    }

                    $this.html(list).off("click");//��ֹ����ظ�����ʱ���ظ����¼�

                    $this.on('click', '.next', function () {
                        var pageshow = parseInt($('.' + active).html()),
                            nums, flag,
                            a = num % 2;
                        if(a == 0){
                            //ż��
                            nums = num;
                            flag = true;
                        }else if(a == 1){
                            //����
                            nums = (num+1);
                            flag = false;
                        }
                        if(pageshow >= l) {
                            return;
                        }else if(pageshow > 0&&pageshow <= nums/2){
                            //��ǰ����
                            $('.' + active).removeClass(active).parent().next().find('a').addClass(active);
                        }else if((pageshow > l-nums/2&&pageshow < l&&flag==false)||(pageshow > l-nums/2-1&&pageshow < l&&flag==true)){
                            //�����
                            $('.' + active).removeClass(active).parent().next().find('a').addClass(active);
                        }else{
                            $('.' + active).removeClass(active).parent().next().find('a').addClass(active);
                            fpageShow(pageshow+1);
                        }
                        opts.callBack(pageshow+1);
                    });
                    obj.on('click', '.prv', function () {
                        var pageshow = parseInt($('.' + active).html());
                        var nums = odevity(n);
                        if (pageshow <= 1) {
                            return;
                        }else if((pageshow > 1&&pageshow <= nums/2)||(pageshow > l-nums/2&&pageshow < l+1)){
                            //��ǰ����������
                            $('.' + active).removeClass(active).parent().prev().find('a').addClass(active);
                        }else {
                            $('.' + active).removeClass(active).parent().prev().find('a').addClass(active);
                            fpageShow(pageshow-1);
                        }
                        opts.callBack(pageshow-1);
                    });

                    obj.on('click', '.first', function(){
                        var activepage = parseInt($('.' + active).html());
                        if (activepage <= 1){
                            return
                        }//��ǰ��һҳ
                        opts.callBack(1);
                        fpagePrv(0);
                    });
                    obj.on('click', '.last', function(){
                        var activepage = parseInt($('.' + active).html());
                        if (activepage >= l){
                            return;
                        }//��ǰ���һҳ
                        opts.callBack(l);
                        if(l>n){
                            fpageNext(n-1);
                        }else{
                            fpageNext(l-1);
                        }
                    });

                    obj.on('click', 'li', function(){
                        var $this = $(this);
                        var pageshow = parseInt($this.find('a').html());
                        var nums = odevity(n);
                        opts.callBack(pageshow);
                        if(l>n){
                            if(pageshow > l-nums/2&&pageshow < l+1){
                                //�����
                                fpageNext((n-1)-(l-pageshow));
                            }else if(pageshow > 0&&pageshow < nums/2){
                                //��ǰ����
                                fpagePrv(pageshow-1);
                            }else{
                                fpageShow(pageshow);
                            }
                        }else{
                            $('.' + active).removeClass(active);
                            $this.find('a').addClass(active);
                        }
                    });

                }
            )}
    });

    var defaluts = {
        totalPages: 9,//��ҳ��
        liNums: 9,//��ҳ�����ְ�ť��(����ȡ����)
        activeClass: 'active' ,//active��
        firstPage: '��ҳ',//��ҳ��ť����
        lastPage: 'ĩҳ',//ĩҳ��ť����
        prv: '?',//ǰһҳ��ť����
        next: '?',//��һҳ��ť����
        hasFirstPage: true,//�Ƿ�����ҳ��ť
        hasLastPage: true,//�Ƿ���ĩҳ��ť
        hasPrv: true,//�Ƿ���ǰһҳ��ť
        hasNext: true,//�Ƿ��к�һҳ��ť
        callBack : function(page){
            //�ص���pageѡ��ҳ��
        }
    };

})(jQuery);
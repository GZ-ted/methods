<!DOCTYPE html>
<html lang="zh-CN">
<head>
        <meta charset="utf-8">
        <style type="text/css" media="screen">
               * { margin: 0; padding: 0;}
               .game-wrap { position: relative;}
               table { border-collapse: collapse;}
               td { padding: 20px; display: inline-block; float: left; width: 100px; height: 100px; border: 1px solid; background: #f00;}
               #cover { display: none; width: 141px; height: 141px; background: #fff; opacity: 0.6; position: absolute; top: 0; left: 0;}

               #route { height: 200px; overflow: hidden; position: relative; border: 1px solid; padding: 10px;}
               .inner { position: absolute; top: 0;}
               .inner p { height: 20px; line-height: 20px;}
        </style>

</head>
<body>
        <!-- 抽奖dom -->
        <div id="game" class="game-wrap">
                <table>
                        <tbody>
                                <tr>
                                        <td data-index="1">11111111</td>
                                        <td data-index="2">22222222222</td>
                                        <td data-index="3">33333333333</td>

                                </tr>
                                <tr>
                                        <td data-index="8">88888888888</td>
                                        <td id="play">click</td>
                                        <td data-index="4">44444444444</td>

                                </tr>
                                <tr>
                                        <td data-index="7">777777777777</td>
                                        <td data-index="6">666666666666</td>
                                        <td data-index="5">55555555555</td>

                                </tr>
                        </tbody>
                </table>
                <div id="cover"></div>
        </div>
        <!-- 滚动 -->
        <div id="route">

            <div class="inner">

                <p>-------BEGIN-------123123123123123-----------</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>本网站主办方已经对本网站内全部正版授权的视频</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>123123123123123</p><p>---------END--------123123123123123</p>


            </div>

        </div>
        <script src="../js/jquery.js"></script>

        <script>
        // 滚动begin
            var route = $('#route');

            var inner = $('.inner');

            var timer2Stop = false;

            var innerH = inner.height();

            var timer2 = setInterval(function() {

                if(timer2Stop) return;

                var top = parseInt(inner.css('top')) - 1;

                if(Math.abs(top) >= innerH) top = 0;
                inner.css('top', top);
            }, 30);

            route.hover(
                function() { timer2Stop = true;},
                function() { timer2Stop = false;}
            );

        </script>

        <script>
        // 简单的顺时针抽奖机
                var game = $('#game'),

                cover = $('#cover'),

                table = $('table'),

                play = $('#play'),

                _coverWidth = cover.width(),

                _coverHeight = cover.height(),

                width = table.width(),

                height = table.height();

                GAME = {

                        maxX: width - _coverWidth,

                        maxY: height - _coverHeight,

                        maxIndex: 8, //最大礼品数

                        //isStop: false, //进入停止状态

                        mark: cover,

                        move: _coverWidth,

                        run: function() {

                                var self = this;

                                self.init();

                                self.timer = setTimeout(function() {
                                        // 根据方向改变x，y值
                                        switch(self.dire) {
                                                case '+x':
                                                        self.y = 0;
                                                        self.x+=self.move;
                                                        break;
                                                case '-x':
                                                        self.y = self.maxY;
                                                        self.x-=self.move;
                                                        break;
                                                case '+y':
                                                        self.y+=self.move;
                                                        self.x = self.maxX;
                                                        break;
                                                case '-y':
                                                        self.y-=self.move;
                                                        self.x = 0;
                                                        break;
                                        }

                                        if(++self.index > self.maxIndex) self.index = 1;


                                        if(self.x <= 0 && self.y <= 0 && self.dire == '-y') {
                                                self.dire = '+x';
                                                //减去1是因为拐点多加了1
                                                self.index--;
                                        }
                                        if(self.x >= self.maxX && self.y >= self.maxY && self.dire == '+y') {
                                                self.dire = '-x';
                                                self.index--;
                                        }
                                        if(self.x >= self.maxX && self.y <= 0 && self.dire == '+x') {
                                                self.dire = '+y';
                                                self.index--;
                                        }
                                        if(self.x <= 0 && self.y >= self.maxY && self.dire == '-x') {
                                                self.dire = '-y';
                                                self.index--;
                                        }

                                        self.mark.css({left: self.x, top: self.y});

                                        //console.log(self.index);

                                        if(self.getIndex == self.index) {
                                                clearTimeout(self.timer);
                                                alert('恭喜，您中了'+self.index+'号奖品！');
                                        } else {
                                                self.timer = setTimeout(arguments.callee, self.speed);
                                        }


                                }, self.speed);

                        },
                        // 调整转到速度
                        adjustSpeed: function(speed) {
                                this.speed = speed;
                        },
                        // 停止
                        stop: function(index) {
                                var self = this;
                                setTimeout(function() {
                                        self.adjustSpeed(200);
                                        self.getIndex = index;
                                }, 1000);
                        },
                        //初始化
                        init: function() {
                                this.speed = 60;
                                this.getIndex = -1;
                                this.index = 1;
                                this.dire = '+x';
                                this.x = this.y = 0;
                                this.mark.show();
                        }
                }

                play.click(function() {
                        var g = GAME;
                        g.run();
                        //模拟ajax 操作，真是环境使用ajax代替settimeout
                        setTimeout(function() {
                                g.adjustSpeed(150);
                                //map 映射奖品与td的index关系
                                //var map = 
                                //例子，停止在第三格
                                g.stop(3);
                        }, 2000);

                });
                


        </script></body>
</html>

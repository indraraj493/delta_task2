//peddle obs
function obs1(){
        this.xpos=0;
        this.ypos=0;
        this.x_axis;
        this.y_axis;
        this.color;
        this.sped=2.4;
        this.w=120;
        this.h=20;
        this.toright=false;
        this.switched=false;
        this.rot=0;
        this.next=0;
        this.init=function(color,x_ax,y_ax){
            this.x_axis=x_ax;
            this.y_axis=y_ax*-1;
            this.color=color;
            this.xpos=20;
            this.next=y_ax+120; 
        }
        this.draw=function(){
            if(this.toright==false){
                this.xpos-=this.sped;
                if(this.xpos<=0){
                    this.toright=true;
                }
            }else{
                this.xpos+=this.sped;
                if(this.xpos+120>=400){
                    this.toright=false;
                }
            }
            //draw enemy
            this.ypos=coords.y_axis(this.y_axis);
            game.draw.fillStyle=this.color;
            game.draw.fillRect(this.xpos,this.ypos,this.w,this.h);

            if(this.xpos<=player.xpos&&this.xpos+this.w>=player.xpos&&this.ypos<=player.ypos&&this.ypos+this.h>=player.ypos){
                  if(player.color!=this.color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
            }
            if(this.xpos<=player.xpos+10&&this.xpos+this.w>=player.xpos+10&&this.ypos<=player.ypos+10&&this.ypos+this.h>=player.ypos+10){
                  if(player.color!=this.color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
            }
            //get switcher
            if(this.switched==false){
                game.draw.save();
                    game.draw.translate(player.xpos+7,coords.y_axis(this.y_axis-50)+7);
                    game.draw.rotate(this.rot*(Math.PI/180.));
                    game.draw.fillStyle="#999999";
                    game.draw.fillRect(-7,-7,14,14);
                game.draw.restore();
                if(coords.y_axis(this.y_axis-50)+7>=player.ypos){
                   this.switched=true;
                    score++;
                    player.color=colorz[Math.floor(Math.random()*colorz.length)];
                }
                this.rot+=2;
                if(this.rot>=360){
                    this.rot=0;
                }
            } 

        }
        this.check=function(i){
            if(this.ypos-10>game.h){
                _obs.splice(i,1);
            }
        }
    }
    // single circle obstacle
    function obs2(){
        this.xpos=0;
        this.ypos=0;
        this.x_axis;
        this.y_axis;
        this.rot=0;
        this.rotsped=0.05;
        this.next=0;
        this.switched=false;
        this.rott=0;
        this.init=function(color,x_ax,y_ax){
            this.x_axis=x_ax;
            this.y_axis=y_ax*-1;
            this.color=color;
            this.xpos=200-5;
            this.next=y_ax+180;
        }
        this.draw=function(i){
            var rad=360/30;
            var rot=0;
            var color="";
            for(var i=0;i<30;i++){
                var xx=80*Math.cos(this.rot*(Math.PI/180))+this.xpos;
                var yy=80*Math.sin(this.rot*(Math.PI/180))+coords.y_axis(this.y_axis);
                if(i<10){
                    color="lime";
                }else if(i>=10 && i<20){
                    color="orange";
                }else{
                    color="deepskyblue";
                }
                if(xx<=player.xpos&&xx+10>=player.xpos&&yy<=player.ypos&&yy+10>=player.ypos){
                  if(player.color!=color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
                }
                if(xx<=player.xpos+player.h&&xx+10>=player.xpos+player.h&&yy<=player.ypos+player.h&&yy+10>=player.ypos+player.h){
                    if(player.color!=color&&game.gameover==false){
                        game.gameover=true;
                        player_is_dead_();
                  }
                }
                //draw the squares in circle
                game.draw.fillStyle=color;
                game.draw.fillRect(xx,yy,10,10);
                this.rot+=rad+this.rotsped;
            }
             if(this.switched==false){
                game.draw.save();
                game.draw.translate(player.xpos+7,coords.y_axis(this.y_axis)+7);
                game.draw.rotate(this.rott*(Math.PI/180.));
                game.draw.fillStyle="#999999";
                game.draw.fillRect(-7,-7,14,14);
                game.draw.restore();
                if(coords.y_axis(this.y_axis)+7>=player.ypos){
                   this.switched=true;
                    score++;
                    player.color=colorz[Math.floor(Math.random()*colorz.length)];
                }
                this.rott+=2;
                if(this.rott>=360){
                    this.rott=0;
                }
            } 
        }
        this.check=function(i){
            if(coords.y_axis(this.y_axis)-90>game.h){
                _obs.splice(i,1);

            }
        }
    }
    //double circle
    function obs3(){
        this.xpos=0;
        this.ypos=0;
        this.x_axis;
        this.y_axis;
        this.rot=0;
        this.w=3;
        this.h=2;
        this.rotsped=0.01;
        this.next=0;
        this.switched=false;
        this.rott=0;
        this.init=function(color,x_ax,y_ax){
            this.x_axis=x_ax;
            this.y_axis=y_ax*-1;
            this.color=color;
            this.xpos=192-35;
            this.next=y_ax+160;
        }
        this.draw=function(){
            var rad=360/150;
            var color=0;
            this.ypos=coords.y_axis(this.y_axis);
            for(var i=0;i<150;i++){
                if(i<50){
                    color="lime";
                }else if(i>=50&&i<100){
                    color="orange";
                }
                else{
                    color="deepskyblue";
                }
                var xx=40*Math.cos(this.rot*(Math.PI/180))+this.xpos;
                var yy=40*Math.sin(this.rot*(Math.PI/180))+this.ypos;
                var rot=Math.atan2(yy-this.ypos,xx-this.xpos);
                game.draw.save();
                    game.draw.translate(xx+this.w,yy);
                    game.draw.rotate(rot);
                    game.draw.fillStyle=color;
                    game.draw.fillRect(this.w*-1,0,this.w,this.h);
                game.draw.restore();
                var tx= (player.xpos+(player.w/2))-xx+1.5;
                var ty=(player.ypos+(player.h/2))-yy;
                var d=Math.sqrt(tx*tx+ty*ty);
                 if(d<=10){
                  if(player.color!=color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
                }

                var xx=40*Math.cos((180-this.rot)*(Math.PI/180))+this.xpos+83;
                var yy=40*Math.sin((180-this.rot)*(Math.PI/180))+this.ypos;
                var rot=Math.atan2(yy-this.ypos,xx-this.xpos);
                game.draw.save();
                    game.draw.translate(xx+this.w,yy);
                    game.draw.rotate(rot);
                    game.draw.fillStyle=color;
                    game.draw.fillRect(this.w*-1,0,this.w,this.h);
                game.draw.restore();
                this.rot+=rad+this.rotsped;

            }
             if(this.switched==false){
                game.draw.save();
                game.draw.translate(player.xpos+7,coords.y_axis(this.y_axis-80)+7);
                game.draw.rotate(this.rott*(Math.PI/180));
                game.draw.fillStyle="#999999";
                game.draw.fillRect(-7,-7,14,14);
                game.draw.restore();
                if(coords.y_axis(this.y_axis-80)+7>=player.ypos){
                   this.switched=true;
                    score++;
                    player.color=colorz[Math.floor(Math.random()*colorz.length)];
                }
                this.rott+=2;
                if(this.rott>=360){
                    this.rott=0;
                }
            } 
        }
        this.check=function(i){
            if(this.ypos-50>game.h){
                _obs.splice(i,1);
            }
        }
    }
    //lineobs
    function obs4(){
        this.xpos=0;
        this.ypos=0;
        this.x_axis;
        this.y_axis;
        this.rot=0;
        this.w=3;
        this.h=2;
        this.rotsped=0.005;
        this.child_obs=[];
        this.len_of_color=0;
        this.width_slice=0;
        this.next=0;
        this.switched=false;
        this.rott=0;
        this.init=function(color,x_ax,y_ax){
            this.x_axis=x_ax;
            this.y_axis=y_ax*-1;
            this.color=color;
            this.xpos=0;
            this.width_slice=game.w/5;
            var len_of_color=0;
            var xpos=game.w-this.width_slice;
            for(var i=0;i<6;i++){
                this.child_obs.push({color:colorz[this.len_of_color],xpos:xpos,w:this.width_slice,h:10});
                this.len_of_color++;
                if(this.len_of_color==3){
                    this.len_of_color=0;
                }
                xpos-=this.width_slice;
            }
            this.next=y_ax+140;
        }
        this.draw=function(){
            var e=0, ee=false;
            this.ypos=coords.y_axis(this.y_axis);
            for(var i=0;i<this.child_obs.length;i++){
                game.draw.fillStyle=this.child_obs[i].color;
                game.draw.fillRect(this.child_obs[i].xpos,this.ypos,this.child_obs[i].w,this.child_obs[i].h);
                this.child_obs[i].xpos+=2;
                if(this.child_obs[i].xpos<=player.xpos&&
                    this.child_obs[i].xpos+this.child_obs[i].w>=player.xpos&&
                    this.ypos<player.ypos&&
                    this.ypos+this.child_obs[i].h>=player.ypos
                  ){
                    if(player.color!=this.child_obs[i].color&&game.gameover==false){
                        game.gameover=true;
                        player_is_dead_();
                    }
                }
                if(this.child_obs[i].xpos<=player.xpos+player.w&&
                    this.child_obs[i].xpos+this.child_obs[i].w>=player.xpos+player.w&&
                    this.ypos<player.ypos+player.h&&
                    this.ypos+this.child_obs[i].h>=player.ypos+player.h
                  ){
                    if(player.color!=this.child_obs[i].color&&game.gameover==false){
                        game.gameover=true;
                        player_is_dead_();
                    }
                }
                if(this.child_obs[i].xpos>=game.w){
                    ee=true;
                    e=i;
                    this.len_of_color++;
                    if(this.len_of_color==3){
                        this.len_of_color=0;
                    }
                    this.child_obs.push({color:colorz[this.len_of_color],xpos:this.child_obs[this.child_obs.length-1].xpos-this.width_slice,w:this.width_slice,h:10});
                }
            }
            if(ee==true){
                this.child_obs.splice(e,1);
            }
            if(this.switched==false){
                game.draw.save();
                game.draw.translate(player.xpos+7,coords.y_axis(this.y_axis-65)+7);
                game.draw.rotate(this.rott*(Math.PI/180));
                game.draw.fillStyle="#999999";
                game.draw.fillRect(-7,-7,14,14);
                game.draw.restore();
                if(coords.y_axis(this.y_axis-65)+7>=player.ypos){
                   this.switched=true;
                    score++;
                    player.color=colorz[Math.floor(Math.random()*colorz.length)];
                }
                this.rott+=2;
                if(this.rott>=360){
                    this.rott=0;
                }
            } 
        }
        this.check=function(i){
            if(this.ypos-30>game.h){
                _obs.splice(i,1);
            }
        }
    }
    //3 circle
    function obs5(){
        this.xpos=0;
        this.ypos=0;
        this.x_axis;
        this.y_axis;
        this.rot=0;
        this.w=3;
        this.h=2;
        this.rotsped=0.01;
        this.next=0;
        this.switched=false;
        this.rott=0;
        this.init=function(color,x_ax,y_ax){
            //axis is the distance in world point
            this.x_axis=x_ax;
            this.y_axis=y_ax*-1;
            this.color=color;
            this.xpos=200;
            this.next=y_ax+280;

        }
        this.draw=function(){
            var rad=360/150;
            var color=0;
            this.ypos=coords.y_axis(this.y_axis);
            for(var i=0;i<150;i++){
                if(i<50){
                    color="lime";
                }else if(i>=50&&i<100){
                    color="orange";
                }
                else{
                    color="deepskyblue";
                }
                var xx=40*Math.cos((this.rot)*(Math.PI/180))+this.xpos;
                var yy=40*Math.sin((this.rot)*(Math.PI/180))+this.ypos;
                var rot=Math.atan2(yy-this.ypos,xx-this.xpos);
                var tx= (player.xpos+(player.w/2))-xx+1.5;
                var ty=(player.ypos+(player.h/2))-yy;
                var d=Math.sqrt(tx*tx+ty*ty);
                 if(d<=10){
                  if(player.color!=color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
                }
                game.draw.save();
                    game.draw.translate(xx+this.w,yy);
                    game.draw.rotate(rot);
                    game.draw.fillStyle=color;
                    game.draw.fillRect(this.w*-1,0,this.w,this.h);
                game.draw.restore();
                var xx=40*Math.cos((40-this.rot)*(Math.PI/180))+this.xpos;
                var yy=40*Math.sin((40-this.rot)*(Math.PI/180))+this.ypos;
                var rot=Math.atan2(yy-this.ypos,xx-this.xpos);
                //second circle
                var tx= (player.xpos+(player.w/2))-xx+1.5;
                var ty=(player.ypos+(player.h/2))-(yy-80);
                var d=Math.sqrt(tx*tx+ty*ty);
                 if(d<=10){
                  if(player.color!=color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
                }
                 game.draw.save();
                    game.draw.translate(xx+this.w,yy-80);
                    game.draw.rotate(rot);
                    game.draw.fillStyle=color;
                    game.draw.fillRect(this.w*-1,0,this.w,this.h);
                game.draw.restore();
                var xx=40*Math.cos((180-this.rot)*(Math.PI/180))+this.xpos;
                var yy=40*Math.sin((180-this.rot)*(Math.PI/180))+this.ypos;
                var rot=Math.atan2(yy-this.ypos,xx-this.xpos);
                //third circle
                var tx= (player.xpos+(player.w/2))-xx+1.5;
                var ty=(player.ypos+(player.h/2))-(yy-160);
                var d=Math.sqrt(tx*tx+ty*ty);
                 if(d<=10){
                  if(player.color!=color&&game.gameover==false){
                      game.gameover=true;
                      player_is_dead_();
                  }
                }
                 game.draw.save();
                    game.draw.translate(xx+this.w,yy-160);
                    game.draw.rotate(rot);
                    game.draw.fillStyle=color;
                    game.draw.fillRect(this.w*-1,0,this.w,this.h);
                game.draw.restore();
                this.rot+=rad+this.rotsped;

            }
             if(this.switched==false){
                game.draw.save();
                game.draw.translate(player.xpos+10,coords.y_axis(this.y_axis-80));
                game.draw.rotate(this.rott*(Math.PI/180));
                game.draw.fillStyle="#999999";
                game.draw.fillRect(-7,-7,14,14);
                game.draw.restore();
                if(coords.y_axis(this.y_axis-80)>=player.ypos){
                   this.switched=true;
                    player.color=colorz[Math.floor(Math.random()*colorz.length)];
                    score++;
                }
                this.rott+=2;
                if(this.rott>=360){
                    this.rott=0;
                }
            } 
        }
        this.check=function(i){
            if(this.ypos-160>game.h){
                _obs.splice(i,1);
            }
        }
    }
    
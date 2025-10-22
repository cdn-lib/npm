 // <footer class="footer"></footer> (TEMPEL CODE INI UNTUK MENAMPILKAN IKAN)
// dan 
// <script src="......." data="" defer></script> Jangan lupa kasih "defer" biar gak berat -_<


/*                              CDN BY YUMEIRO                           */



"use strict";!function(){let t=document.currentScript,i=t.getAttribute("data"),e=i&&i.trim().toLowerCase()||"auto";"auto"===e&&(e=function t(){let i=document.documentElement.innerHTML,e=/class\s*=\s*["'][^"']*(btn|container|row|col|navbar|alert)[^"']*["']/.test(i),s=/class\s*=\s*["'][^"']*(flex|grid|bg-|text-|rounded|p-|m-)[^"']*["']/.test(i);return e&&!s?"bootstrap":s&&!e?"tailwind":e&&s?"bootstrap":e&&!s?"b":s&&!e?"t":e&&s?"b":"tailwind"}());let s={tailwind:"",bootstrap:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",t:"",b:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"},n=document.createElement("link");if(n.rel="stylesheet",n.href=({tailwind:"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",bootstrap:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",t:"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",b:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"})[e],document.head.appendChild(n),s[e]){let h=document.createElement("script");h.src=s[e],document.head.appendChild(h)}let r=`
  body {
      padding-top: 70px; /* tinggi navbar */
    }
    .navbar {
  border-bottom: 1px solid #eeeeee;
  
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
.navbar-brand {
  font-weight: 700;
  color: #fff !important;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-link {
  color: white !important;
  margin: 0 8px;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: rgba(0,173,181,1) !important;
  transform: translateY(-2px);
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background: rgba(0,173,181,1);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.navbar-toggler {
  border-color: rgba(0,173,181,1);
}

.navbar-toggler-icon {
  background-image: url("");
}

/* ===== CARD STYLE ===== */
.card {
  display: flex; 
  flex-direction: column; 
  width: 272px;
  border-radius: 10px;
  box-shadow: 2px 7px 13px 0px rgba(0,0,0,0.2);
  overflow: hidden; 
  background: ; 
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  border-style: dashed;
  box-shadow: 3px 10px 20px rgba(0,0,0,0.3);
  border-color: rgba(0,173,181,1); 
}

.card-body {
  background-color: #222831;
  flex-grow: 1;
  padding: 24px; 
  color: #000;
}

.card-title {
  color: #000000;
  font-weight: bold;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif; 
  margin: 0; 
  padding: 0; 
}

.card-text {
  line-height: 1.4;
  margin-top: 10px; 
  font-size: 17px;
  color: white;
}
.slide-menu {
  position: fixed;
  top: 56px;
  left: 0;
  width: 250px;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.4s ease;
  z-index: 1040;
  border-right: 2px solid #eeeeee;
}

.collapse.show .slide-menu {
  transform: translateX(0);
}
  `,o=document.createElement("style");o.innerHTML=r,document.head.appendChild(o)}(),(()=>{var t={dark:"rgb(255 255 255 / 10%)",light:"rgba(0 173 181 )"},i={POINT_INTERVAL:5,FISH_COUNT:3,MAX_INTERVAL_COUNT:50,INIT_HEIGHT_RATE:.5,THRESHOLD:20,init:function(){this.setParameters(),this.setStyle(),this.reconstructMethods(),this.setup(),this.bindEvent(),this.render()},setParameters:function(){this.window=window,this.container=document.createElement("div"),this.container.id="flyfish",this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.points=[],this.fishes=[],this.watchIds=[],document.querySelector(".footer").appendChild(this.container)},setStyle:function(){let t=document.createElement("style");t.innerHTML=`
    .footer {
      position: flex;
    }
    #flyfish {
      position: absolute;
      width: 100%;
      height: 230px;
      overflow: hidden;
      left: 0;
      bottom: 0;
      z-index: -1;
      pointer-events: none;
    }`,document.querySelector("head").appendChild(t)},createSurfacePoints:function(){let t=Math.round(this.width/this.POINT_INTERVAL);this.pointInterval=this.width/(t-1),this.points.push(new e(this,0));for(let i=1;i<t;i++){let s=new e(this,i*this.pointInterval),n=this.points[i-1];s.setPreviousPoint(n),n.setNextPoint(s),this.points.push(s)}},reconstructMethods:function(){this.watchWindowSize=this.watchWindowSize.bind(this),this.jdugeToStopResize=this.jdugeToStopResize.bind(this),this.startEpicenter=this.startEpicenter.bind(this),this.moveEpicenter=this.moveEpicenter.bind(this),this.render=this.render.bind(this)},setup:function(){this.points.length=0,this.fishes.length=0,this.watchIds.length=0,this.intervalCount=this.MAX_INTERVAL_COUNT,this.containerWidth=this.container.offsetWidth,this.containerHeight=this.container.offsetHeight,this.width=this.containerWidth,this.height=this.containerHeight,this.fishCount=this.FISH_COUNT*this.width/500*this.height/500,this.canvas.width=this.width,this.canvas.height=this.height,this.reverse=!1,this.container.appendChild(this.canvas),this.fishes.push(new s(this)),this.createSurfacePoints()},watchWindowSize:function(){this.clearTimer(),this.tmpWidth=this.window.innerWidth,this.tmpHeight=this.window.innerHeight,this.watchIds.push(setTimeout(this.jdugeToStopResize,this.WATCH_INTERVAL))},clearTimer:function(){for(;this.watchIds.length>0;)clearTimeout(this.watchIds.pop())},jdugeToStopResize:function(){let t=this.window.innerWidth,i=this.window.innerHeight,e=t==this.tmpWidth&&i==this.tmpHeight;this.tmpWidth=t,this.tmpHeight=i,e&&this.setup()},bindEvent:function(){let t=this;this.window.addEventListener("resize",function(){t.watchWindowSize()}),this.container.addEventListener("mouseenter",function(i){t.startEpicenter(i)}),this.container.addEventListener("mousemove",function(i){t.moveEpicenter(i)})},getAxis:function(t){let i=this.container.getBoundingClientRect();return{x:t.clientX-i.left+this.window.scrollX,y:t.clientY-i.top+this.window.scrollY}},startEpicenter:function(t){this.axis=this.getAxis(t)},moveEpicenter:function(t){let i=this.getAxis(t);this.axis||(this.axis=i),this.generateEpicenter(i.x,i.y,i.y-this.axis.y),this.axis=i},generateEpicenter:function(t,i,e){if(i<this.height/2-this.THRESHOLD||i>this.height/2+this.THRESHOLD)return;let s=Math.round(t/this.pointInterval);s<0||s>=this.points.length||this.points[s].interfere(i,e)},controlStatus:function(){for(let t=0,i=this.points.length;t<i;t++)this.points[t].updateSelf();for(let e=0,n=this.points.length;e<n;e++)this.points[e].updateNeighbors();this.fishes.length<this.fishCount&&0==--this.intervalCount&&(this.intervalCount=this.MAX_INTERVAL_COUNT,this.fishes.push(new s(this)))},render:function(){let i=this;!function e(){i.controlStatus(),i.context.clearRect(0,0,i.width,i.height),fixit.isDark?i.context.fillStyle=t.dark||"rgb(255 255 255 / 10%)":i.context.fillStyle=t.light||"rgb(0 119 190 / 10%)";for(let s=0,n=i.fishes.length;s<n;s++)i.fishes[s].render(i.context);i.context.save(),i.context.globalCompositeOperation="xor",i.context.beginPath(),i.context.moveTo(0,i.reverse?0:i.height);for(let h=0,r=i.points.length;h<r;h++)i.points[h].render(i.context);i.context.lineTo(i.width,i.reverse?0:i.height),i.context.closePath(),i.context.fill(),i.context.restore(),requestAnimationFrame(e)}()}};function e(t,i){this.renderer=t,this.x=i,this.init()}function s(t){this.renderer=t,this.init()}e.prototype={SPRING_CONSTANT:.03,SPRING_FRICTION:.9,WAVE_SPREAD:.3,ACCELARATION_RATE:.01,init:function(){this.initHeight=this.renderer.height*this.renderer.INIT_HEIGHT_RATE,this.height=this.initHeight,this.fy=0,this.force={previous:0,next:0}},setPreviousPoint:function(t){this.previous=t},setNextPoint:function(t){this.next=t},interfere:function(t,i){this.fy=this.renderer.height*this.ACCELARATION_RATE*(this.renderer.height-this.height-t>=0?-1:1)*Math.abs(i)},updateSelf:function(){this.fy+=this.SPRING_CONSTANT*(this.initHeight-this.height),this.fy*=this.SPRING_FRICTION,this.height+=this.fy},updateNeighbors:function(){this.previous&&(this.force.previous=this.WAVE_SPREAD*(this.height-this.previous.height)),this.next&&(this.force.next=this.WAVE_SPREAD*(this.height-this.next.height))},render:function(t){this.previous&&(this.previous.height+=this.force.previous,this.previous.fy+=this.force.previous),this.next&&(this.next.height+=this.force.next,this.next.fy+=this.force.next),t.lineTo(this.x,this.renderer.height-this.height)}},s.prototype={GRAVITY:.4,init:function(){this.direction=.5>Math.random(),this.x=this.direction?this.renderer.width+this.renderer.THRESHOLD:-this.renderer.THRESHOLD,this.previousY=this.y,this.vx=this.getRandomValue(4,10)*(this.direction?-1:1),this.renderer.reverse?(this.y=this.getRandomValue(1*this.renderer.height/10,4*this.renderer.height/10),this.vy=this.getRandomValue(2,5),this.ay=this.getRandomValue(.05,.2)):(this.y=this.getRandomValue(6*this.renderer.height/10,9*this.renderer.height/10),this.vy=this.getRandomValue(-5,-2),this.ay=this.getRandomValue(-.2,-.05)),this.isOut=!1,this.theta=0,this.phi=0},getRandomValue:function(t,i){return t+(i-t)*Math.random()},controlStatus:function(t){this.previousY=this.y,this.x+=this.vx,this.y+=this.vy,this.vy+=this.ay,this.renderer.reverse?this.y>this.renderer.height*this.renderer.INIT_HEIGHT_RATE?(this.vy-=this.GRAVITY,this.isOut=!0):(this.isOut&&(this.ay=this.getRandomValue(.05,.2)),this.isOut=!1):this.y<this.renderer.height*this.renderer.INIT_HEIGHT_RATE?(this.vy+=this.GRAVITY,this.isOut=!0):(this.isOut&&(this.ay=this.getRandomValue(-.2,-.05)),this.isOut=!1),this.isOut||(this.theta+=Math.PI/20,this.theta%=2*Math.PI,this.phi+=Math.PI/30,this.phi%=2*Math.PI),this.renderer.generateEpicenter(this.x+(this.direction?-1:1)*this.renderer.THRESHOLD,this.y,this.y-this.previousY),(this.vx>0&&this.x>this.renderer.width+this.renderer.THRESHOLD||this.vx<0&&this.x<-this.renderer.THRESHOLD)&&this.init()},render:function(t){t.save(),t.translate(this.x,this.y),t.rotate(Math.PI+Math.atan2(this.vy,this.vx)),t.scale(1,this.direction?1:-1),t.beginPath(),t.moveTo(-30,0),t.bezierCurveTo(-20,15,15,10,40,0),t.bezierCurveTo(15,-10,-20,-15,-30,0),t.fill(),t.save(),t.translate(40,0),t.scale(.9+.2*Math.sin(this.theta),1),t.beginPath(),t.moveTo(0,0),t.quadraticCurveTo(5,10,20,8),t.quadraticCurveTo(12,5,10,0),t.quadraticCurveTo(12,-5,20,-8),t.quadraticCurveTo(5,-10,0,0),t.fill(),t.restore(),t.save(),t.translate(-3,0),t.rotate((Math.PI/3+Math.PI/10*Math.sin(this.phi))*(this.renderer.reverse?-1:1)),t.beginPath(),this.renderer.reverse?(t.moveTo(5,0),t.bezierCurveTo(10,10,10,30,0,40),t.bezierCurveTo(-12,25,-8,10,0,0)):(t.moveTo(-5,0),t.bezierCurveTo(-10,-10,-10,-30,0,-40),t.bezierCurveTo(12,-25,8,-10,0,0)),t.closePath(),t.fill(),t.restore(),t.restore(),this.controlStatus(t)}},window.onload=function(){i.init()}})(),window.fixit={isDark:!1};

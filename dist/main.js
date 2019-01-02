!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=document.getElementById("seconds"),i=document.getElementById("minutes"),a=document.getElementById("hours");let l=null;function o(){let e=0;r.innerHTML=0;let t=0;i.innerHTML=0;let n=0;a.innerHTML=0,l=setInterval(()=>{isTimerPaused||(60===(e+=1)&&(t+=1,e=0,i.innerHTML=t),60===t&&(n+=1,t=0,a.innerHTML=n),r.innerHTML=e)},1e3)}function d(){loop.stop(),isTimerPaused=!0}window.isTimerPaused=!1,window.togglePause=function(){loop.isStopped?loop.start():loop.stop(),isTimerPaused=!isTimerPaused},kontra.init();let s=[],u=1;const h=document.getElementById("spriteCount"),c=document.getElementById("errorText"),f=document.getElementById("selectedSpriteInfo");function g(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function p(e){c.removeAttribute("style"),c.innerHTML=e}function m(e){f.innerHTML="",clearInterval(e.interval)}function y(e){f.innerHTML="";let t=document.createElement("ul");const n=["height","width","color","speed","isFertile","fertilityRate","fertilityProgress","hunger","totalHunger","health","totalHealth","damage","defence","sight"];Object.entries(e).map(e=>{for(let r=0;r<n.length-1;r++)if(e[0]===n[r]){let n=document.createElement("li"),r=document.createTextNode(e[0]+": "+e[1]);n.appendChild(r),t.appendChild(n);break}}),f.appendChild(t)}function v(e,t,n,r,i,a,l,o,d){u+=1;let h=kontra.sprite({id:u,selected:!1,interval:null,x:e,y:t,color:"red",width:n,height:n,ttl:1/0,speed:r,dx:Math.random()*r-2,dy:Math.random()*r-2,isFertile:!1,fertilityRate:i,fertilityProgress:0,hunger:a,totalHunger:a,health:l,totalHealth:l,damage:o,defence:d,sight:0,diseased:{diseased:!1,damage:0},isColliding:!1,onUp:function(){var e;e=this,s.forEach(t=>{e!==t&&(t.selected="false",clearInterval(t.interval),t.color="red")}),e.color="green",e.selected="true",y(e),e.interval=setInterval(()=>{isTimerPaused||y(e)},100)}});s.push(h),kontra.pointer.track(h)}function M(e,t){let n={};(n=1===g(1,2)?Object.assign({},e):Object.assign({},t)).size=1===g(1,2)?e.width:t.width,n.speed=1===g(1,2)?e.speed:t.speed,n.fertilityRate=1===g(1,2)?e.fertilityRate:t.fertilityRate,n.totalHunger=1===g(1,2)?e.totalHunger:t.totalHunger,n.health=1===g(1,2)?e.health:t.health,n.damage=1===g(1,2)?e.damage:t.damage,n.defence=1===g(1,2)?e.defence:t.defence;const r=g(1,7);1===r?1===g(1,2)?n.size+=5:n.size>5&&(n.size-=5):2===r?1===g(1,2)?n.speed+=1:n.speed>4&&(n.speed-=1):3===r?1===g(1,2)?n.fertilityRate+=1:n.fertilityRate>0&&(n.fertilityRate-=1):4===r?1===g(1,2)?n.totalHunger+=100:n.totalHunger>100&&(n.totalHunger-=100):5===r?1===g(1,2)?n.health+=10:n.health>10&&(n.health-=10):6===r?1===g(1,2)?n.damage+=5:n.damage>0&&(n.damage-=5):7===r&&(1===g(1,2)?n.defence+=5:n.defence>0&&(n.defence-=5)),v(n.position._x,n.position._y,n.size,n.speed,n.fertilityRate,n.totalHunger,n.health,n.damage,n.defence),e.isFertile=!1,t.isFertile=!1}window.restart=function(){s.forEach(e=>{m(e)}),loop.isStopped||loop.stop(),s=[],c.setAttribute("style","display:none;"),isTimerPaused=!1;const e=800,t=600;for(let n=0;n<50;n++)v(Math.floor(Math.random()*e),Math.floor(Math.random()*t),25,4,1,2e3,2e3,10,5);l?(clearInterval(l),o()):o(),loop.start()},window.loop=kontra.gameLoop({update(){s.map(e=>{e.update(),e.x<0?e.x=kontra.canvas.width:e.x>kontra.canvas.width&&(e.x=0),e.y<0?e.y=kontra.canvas.height:e.y>kontra.canvas.height&&(e.y=0),e.health<=0&&(e.interval&&m(e),e.ttl=0),e.hunger<=0&&e.health>0&&(e.health-=1),e.hunger>0&&(e.hunger-=1),e.isFertile||(e.fertilityProgress<1e3&&(e.fertilityProgress+=e.fertilityRate),1e3===e.fertilityProgress&&(e.isFertile=!0,e.fertilityProgress=0))}),s.forEach((e,t)=>{e.isColliding=!1}),function(){for(let i=0;i<s.length-1;i++)for(let a=i+1;a<s.length;a++)n=s[i],r=s[a],n.y+n.height<r.y||n.y>r.y+r.height||n.x+n.width<r.x||n.x>r.x+r.width||s[i]===s[a]||(s[i].isColliding=!0,s[a].isColliding=!0,s[i].isFertile&&s[a].isFertile?M(s[i],s[a]):(e=s[i],t=s[a],e.health>0&&(e.health-=t.damage-e.defence),e.hunger<e.totalHunger-10&&(e.hunger+=10),t.health>0&&(t.health-=e.damage-t.defence),t.hunger<t.totalHunger&&(t.hunger+=1)));var e,t,n,r}(),s=s.filter(e=>e.isAlive()),h.innerHTML=s.length,s.length>=400?(d(),p("Exponential growth detected... Sim over; please restart.")):s.length<=0&&(d(),p("All sprites are dead... Sim over; please restart."))},render(){s.map(e=>e.render())}})}]);
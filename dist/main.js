!function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);const i=document.getElementById("seconds"),n=document.getElementById("minutes"),s=document.getElementById("hours");let o=null;function a(){let e=0;i.innerHTML=0;let t=0;n.innerHTML=0;let r=0;s.innerHTML=0,o=setInterval(()=>{isTimerPaused||(60===(e+=1)&&(t+=1,e=0,n.innerHTML=t),60===t&&(r+=1,t=0,s.innerHTML=r),i.innerHTML=e)},1e3)}function l(){loop.stop(),isTimerPaused=!0}function d(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function u(e){errorText.removeAttribute("style"),errorText.innerHTML=e}window.isTimerPaused=!1,window.togglePause=function(){loop.isStopped?loop.start():loop.stop(),isTimerPaused=!isTimerPaused};const h=document.getElementById("selectedSpriteInfo");function p(e){h.innerHTML="",clearInterval(e.interval)}function c(e){h.innerHTML="";let t=document.createElement("ul");const r=["height","width","color","speed","isFertile","fertilityRate","fertilityProgress","hunger","totalHunger","health","totalHealth","damage","defence","sight"];Object.entries(e).map(e=>{for(let i=0;i<r.length-1;i++)if(e[0]===r[i]){let r=document.createElement("li"),i=document.createTextNode(e[0]+": "+e[1]);r.appendChild(i),t.appendChild(r);break}}),h.appendChild(t)}let f=1;function g(e,t,r,i,n,s,o,a,l,d){f+=1;let u=kontra.sprite({id:f,selected:!1,interval:null,x:e,y:t,color:"red",width:r,height:r,ttl:1/0,speed:i,dx:Math.random()*i-2,dy:Math.random()*i-2,isFertile:!1,fertilityRate:n,fertilityProgress:s,hunger:o,totalHunger:o,health:a,totalHealth:a,damage:l,defence:d,sight:0,diseased:{diseased:!1,damage:0},isColliding:!1,onUp:function(){var e;e=this,sprites.forEach(t=>{e!==t&&(t.selected="false",clearInterval(t.interval),t.color="red")}),e.color="green",e.selected="true",c(e),e.interval=setInterval(()=>{isTimerPaused||c(e)},100)}});sprites.push(u),kontra.pointer.track(u)}function m(e,t){let r={};(r=1===d(1,2)?Object.assign({},e):Object.assign({},t)).size=1===d(1,2)?e.width:t.width,r.speed=1===d(1,2)?e.speed:t.speed,r.fertilityRate=1===d(1,2)?e.fertilityRate:t.fertilityRate,r.totalHunger=1===d(1,2)?e.totalHunger:t.totalHunger,r.health=1===d(1,2)?e.health:t.health,r.damage=1===d(1,2)?e.damage:t.damage,r.defence=1===d(1,2)?e.defence:t.defence;const i=d(1,7);1===i?1===d(1,2)?r.size+=5:r.size>5&&(r.size-=5):2===i?1===d(1,2)?r.speed+=1:r.speed>4&&(r.speed-=1):3===i?1===d(1,2)?r.fertilityRate+=1:r.fertilityRate>0&&(r.fertilityRate-=1):4===i?1===d(1,2)?r.totalHunger+=100:r.totalHunger>100&&(r.totalHunger-=100):5===i?1===d(1,2)?r.health+=10:r.health>10&&(r.health-=10):6===i?1===d(1,2)?r.damage+=5:r.damage>0&&(r.damage-=5):7===i&&(1===d(1,2)?r.defence+=5:r.defence>0&&(r.defence-=5)),g(r.position._x,r.position._y,r.size,r.speed,r.fertilityRate,0,r.totalHunger,r.health,r.damage,r.defence),e.isFertile=!1,t.isFertile=!1}kontra.init(),window.sprites=[];const y=document.getElementById("spriteCount");window.restart=function(){sprites.forEach(e=>{p(e)}),loop.isStopped||loop.stop(),sprites=[],errorText.setAttribute("style","display:none;"),isTimerPaused=!1;const e=800,t=600;for(let r=0;r<50;r++)g(Math.floor(Math.random()*e),Math.floor(Math.random()*t),25,4,1,d(1,1e3),2e3,2e3,10,5);o?(clearInterval(o),a()):a(),loop.start()},window.loop=kontra.gameLoop({update(){sprites.map(e=>{e.update(),function(e){e.x<0?e.x=kontra.canvas.width:e.x>kontra.canvas.width&&(e.x=0),e.y<0?e.y=kontra.canvas.height:e.y>kontra.canvas.height&&(e.y=0)}(e),function(e){e.health<=0&&(e.interval&&p(e),e.ttl=0),e.hunger<=0&&e.health>0&&(e.health-=1),e.hunger>0&&(e.hunger-=1),e.isFertile||(e.fertilityProgress<1e3&&(e.fertilityProgress+=e.fertilityRate),1e3===e.fertilityProgress&&(e.isFertile=!0,e.fertilityProgress=0))}(e)}),sprites.forEach((e,t)=>{e.isColliding=!1}),function(){for(let n=0;n<sprites.length-1;n++)for(let s=n+1;s<sprites.length;s++)r=sprites[n],i=sprites[s],r.y+r.height<i.y||r.y>i.y+i.height||r.x+r.width<i.x||r.x>i.x+i.width||sprites[n]===sprites[s]||(sprites[n].isColliding=!0,sprites[s].isColliding=!0,sprites[n].isFertile&&sprites[s].isFertile?m(sprites[n],sprites[s]):(e=sprites[n],t=sprites[s],e.health>0&&(e.health-=t.damage-e.defence),e.hunger<e.totalHunger-10&&(e.hunger+=10),t.health>0&&(t.health-=e.damage-t.defence),t.hunger<t.totalHunger&&(t.hunger+=1)));var e,t;var r,i}(),sprites=sprites.filter(e=>e.isAlive()),y.innerHTML=sprites.length,sprites.length>=400?(l(),u("Exponential growth detected... Sim over; please restart.")):sprites.length<=0&&(l(),u("All sprites are dead... Sim over; please restart."))},render(){sprites.map(e=>e.render())}})}]);
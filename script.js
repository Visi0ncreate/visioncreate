(function(){
var $=function(s){return document.querySelector(s)};
var mb=$(".menu"),nv=$("#nav");
if(mb&&nv)mb.onclick=function(){var o=nv.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
var pg=$("#prog"),tick=false;
if(pg)addEventListener("scroll",function(){if(tick)return;tick=true;requestAnimationFrame(function(){var h=document.documentElement.scrollHeight-innerHeight;pg.style.width=(h>0?scrollY/h*100:0)+"%";tick=false})},{passive:true});
if(matchMedia("(hover:hover)").matches){var raf=0;document.addEventListener("pointermove",function(e){if(raf)return;var c=e.target.closest&&e.target.closest(".card,.pcard");if(!c)return;raf=requestAnimationFrame(function(){var r=c.getBoundingClientRect();c.style.setProperty("--mx",e.clientX-r.left+"px");c.style.setProperty("--my",e.clientY-r.top+"px");raf=0})},{passive:true})}
var rv=document.querySelectorAll(".rv");
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12});rv.forEach(function(el){io.observe(el)})}else rv.forEach(function(el){el.classList.add("in")});
var cta=$(".cta");
if(cta&&"IntersectionObserver" in window){var lo=new IntersectionObserver(function(es){if(es[0].isIntersecting){cta.classList.add("bgok");lo.disconnect()}},{rootMargin:"400px"});lo.observe(cta)}else if(cta)cta.classList.add("bgok");
document.querySelectorAll(".cb").forEach(function(b){b.onclick=function(){var t=b.dataset.copy,lbl=b.textContent;
 function done(){b.textContent="Skopiowano";setTimeout(function(){b.textContent=lbl},1600)}
 function fb(){var a=document.createElement("textarea");a.value=t;a.style.position="fixed";a.style.opacity="0";document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(e){}a.remove();done()}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,fb)}else fb()}});
if("serviceWorker" in navigator&&location.protocol==="https:")addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})});
})();

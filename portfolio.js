(function(){
var pf=document.getElementById("pf");
if(pf){
var PROJ=[
{n:"Vortex",t:"Strona wizytówka",url:"https://vortexdetail.github.io/",img:"projekt1.png"},
{n:"GRAD",t:"Strona + podstrony",url:"https://uslugiogrodniczegrad-design.github.io/Uslugi-Ogrodnicze-GRAD/",img:"projekt2.png"}
];
pf.innerHTML=PROJ.map(function(p){return '<a class="pcard rv" href="'+p.url+'" target="_blank" rel="noopener"><div class="thumb'+(p.img?' hasimg':'')+'">'+(p.img?'<img src="'+p.img+'" alt="'+p.n+'" loading="lazy">':'<div class="bw"><div class="bd"><i></i><i></i><i></i></div><div class="bl l1"></div><div class="bl l2"></div><div class="bt"><s></s><s></s><s></s></div></div>')+'</div><div class="pinfo"><h3>'+p.n+'</h3><p>'+p.t+'</p></div></a>'}).join("");
}

})();

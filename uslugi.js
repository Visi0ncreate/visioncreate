(function(){
var svc=document.getElementById("svc");
if(svc){
var SV=[
{t:"Landing Page",p:"449–899 zł",d:"Jednostronicowa strona nastawiona na jeden cel: zapytanie, zapis lub sprzedaż konkretnej oferty.",w:"Dla firm i osób, które promują jedną konkretną ofertę, produkt, wydarzenie lub kampanię reklamową.",g:"Jednostronicową stronę, która prowadzi odwiedzającego do jednego działania: zapytania, zapisu lub zakupu.",s:"Układ nastawiony na konwersję, sekcje oferty, przyciski wezwania do działania, formularz, wersja mobilna, szybkie ładowanie.",c:"4–7 dni roboczych"},
{t:"Strony wizytówki",p:"499–999 zł",d:"Prosta, elegancka strona, która przedstawia Twoją firmę, ofertę i dane kontaktowe. Idealna na start w internecie.",w:"Dla małych firm, freelancerów i usługodawców, którzy chcą pojawić się w internecie i pokazać swoją ofertę oraz kontakt.",g:"Gotową, responsywną stronę z dopasowanym projektem graficznym, czytelną ofertą i formularzem kontaktowym.",s:"Projekt graficzny, wdrożenie, dopasowanie do telefonów, formularz kontaktowy, podstawowe SEO, uruchomienie na Twojej domenie.",c:"5–10 dni roboczych"},
{t:"Redesign stron",p:"499–1 999 zł",d:"Odświeżamy wygląd i działanie istniejącej strony, aby była nowoczesna, szybka i czytelna.",w:"Dla firm, które mają już stronę, ale wygląda przestarzało, działa wolno albo słabo pozyskuje klientów.",g:"Odświeżoną, nowoczesną i szybką stronę, która zachowuje Twoje treści i charakter marki.",s:"Analiza obecnej strony, nowy projekt graficzny, poprawa układu i nawigacji, optymalizacja szybkości, dostosowanie do telefonów, przeniesienie treści.",c:"1–2 tygodnie"},
{t:"Rozbudowane strony internetowe",p:"1 099–1 999 zł",d:"Nowoczesne strony składające się ze strony głównej i kilku podstron, dopasowane do charakteru Twojej firmy.",w:"Dla firm, które potrzebują więcej niż jednej strony: oferty, informacji o firmie, realizacji, kontaktu i innych podstron.",g:"Nowoczesną, wielostronicową stronę z przejrzystym układem, responsywnym designem i intuicyjną nawigacją, dzięki której klienci łatwo znajdą najważniejsze informacje.",s:"Projekt graficzny, strona główna i podstrony, menu i nawigacja, wersja mobilna, formularz kontaktowy, podstawowe SEO, publikacja.",c:"7–14 dni roboczych"}
];
svc.innerHTML=SV.map(function(s,i){return '<button type="button" class="card svc rv" data-i="'+i+'"><span class="soon ok">Dostępne</span><h3>'+s.t+'</h3><span class="pr grad">'+s.p+'</span><p>'+s.d+'</p><small>Zobacz szczegóły</small></button>'}).join("");
var showSv=function(i,sc){var s=SV[i],dt=document.getElementById("detail");document.getElementById("dt").textContent=s.t;
 document.getElementById("dg").innerHTML='<div><b>Dla kogo</b><p>'+s.w+'</p></div><div><b>Co otrzymasz</b><p>'+s.g+'</p></div><div><b>Zakres prac</b><p>'+s.s+'</p></div><div><b>Czas realizacji</b><p>'+s.c+'</p></div>';
 svc.querySelectorAll(".svc").forEach(function(b,j){b.classList.toggle("act",j===i)});
 dt.classList.remove("pop");void dt.offsetWidth;dt.classList.add("pop");if(sc)dt.scrollIntoView({behavior:"smooth",block:"center"})};
svc.onclick=function(e){var b=e.target.closest(".svc");if(b)showSv(+b.dataset.i,true)};
showSv(0,false);
}

})();

(function(){
var form=document.getElementById("f");
var cl=function(v,max,nl){v=String(v==null?"":v).replace(nl?/[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f]/g:/[\u0000-\u001f\u007f]/g," ").replace(/[<>]/g,"").trim();return v.slice(0,max)};
if(form){
var W3F_KEY=""; /* opcjonalnie: klucz z web3forms.com; gdy pusty, używany jest FormSubmit */
form.onsubmit=function(e){e.preventDefault();var f=e.target,ok=document.getElementById("ok");
 if(f._honey&&f._honey.value)return;
 var last=0;try{last=+localStorage.getItem("vc_last")||0}catch(x){}
 if(Date.now()-last<30000){ok.style.display="block";ok.textContent="Wiadomość została przed chwilą wysłana. Poczekaj chwilę przed kolejną próbą.";return}
 var v={imie:cl(f.imie.value,80),email:cl(f.email.value,120),tel:cl(f.tel.value,30),typ:cl(f.typ.value,60),budzet:cl(f.budzet.value,60),msg:cl(f.msg.value,2000,1)};
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)){ok.style.display="block";ok.textContent="Podaj poprawny adres e-mail.";return}
 if(!v.imie||!v.email||!v.msg||!f.querySelector('[type=checkbox]').checked){ok.style.display="block";ok.textContent="Uzupełnij imię, e-mail, wiadomość i zaznacz zgodę.";return}
 var body="Imię: "+v.imie+"\nE-mail: "+v.email+"\nTelefon: "+v.tel+"\nTyp projektu: "+v.typ+"\nBudżet: "+v.budzet+"\n\n"+v.msg;
 var mail="mailto:visioncreate.kontakt@gmail.com?subject="+encodeURIComponent("Zapytanie ze strony VisionCreate")+"&body="+encodeURIComponent(body);
 var btn=f.querySelector("button[type=submit]"),old=btn.textContent;btn.disabled=true;btn.textContent="Wysyłanie… (może potrwać kilka minut)";ok.style.display="block";ok.textContent="";
 var data={name:v.imie,email:v.email,phone:v.tel,"typ projektu":v.typ,"budżet":v.budzet,message:v.msg,_subject:"Nowe zapytanie ze strony VisionCreate",_template:"table",_captcha:"false",_honey:""};
 fetch(W3F_KEY?"https://api.web3forms.com/submit":"https://formsubmit.co/ajax/visioncreate.kontakt@gmail.com",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(W3F_KEY?{access_key:W3F_KEY,subject:data._subject,name:data.name,email:data.email,phone:data.phone,"typ projektu":data["typ projektu"],"budżet":data["budżet"],message:data.message}:data)})
 .then(function(r){return r.json()})
 .then(function(j){if(j.success==="true"||j.success===true){f.reset();try{localStorage.setItem("vc_last",Date.now())}catch(x){}ok.textContent="Dziękujemy! Wiadomość została wysłana. Odpowiemy do 24 godzin."}else{var er=new Error(j.message||"");er.server=1;throw er}})
 .catch(function(er){
  var hint=location.protocol==="file:"?" Strona jest otwarta z dysku, a formularz działa dopiero po wgraniu na hosting.":"";
  var msg=er&&er.server?(/activat/i.test(er.message)?"Formularz czeka na jednorazową aktywację: kliknij link w e-mailu od FormSubmit wysłanym na visioncreate.kontakt@gmail.com (sprawdź też spam), potem wyślij ponownie.":"Serwis wysyłki zgłosił problem. Spróbuj ponownie za chwilę."):"Nie udało się wysłać wiadomości."+hint;
  ok.innerHTML=msg+' <a href="'+mail+'" style="color:var(--b)">Wyślij z programu pocztowego</a>.'})
 .finally(function(){btn.disabled=false;btn.textContent=old})};
}

})();

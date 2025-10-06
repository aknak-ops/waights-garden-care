(function(){
  document.querySelectorAll('.js-year').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });
})();
(function(){
  function smoothToQuote(e){
    try{
      var target = document.querySelector('#quote');
      if(target){
        e && e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }catch(_){}
  }
  var cta = document.querySelector('.cta-bar .cta-btn');
  if(cta){
    if (location.pathname.endsWith('contact.html')){
      cta.setAttribute('href','#quote');
      cta.addEventListener('click', smoothToQuote);
    }
  }
})();
(function(){
  var btn=document.getElementById('copyBtn');
  if(!btn) return;
  btn.addEventListener('click',function(){
    var inp=document.getElementById('copyTarget');
    if(!inp) return;
    inp.select(); inp.setSelectionRange(0,99999);
    try{ document.execCommand('copy'); btn.textContent='Copied!'; setTimeout(()=>btn.textContent='Copy email',1500);}catch(e){}
  });
})();

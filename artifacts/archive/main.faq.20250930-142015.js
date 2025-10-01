(function(){
  // Smooth anchor scroll + active nav
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.nav a[href^="#"], .skip').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href'); if(!id||id.length<2) return;
      const el=document.querySelector(id); if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior: prefersReduced ? 'auto' : 'smooth'});
    });
  });
  const sections=[...document.querySelectorAll('main .section[id]')];
  const links=[...document.querySelectorAll('.nav a')];
  function onScroll(){
    const y=window.scrollY+80;
    let current=null;
    for(const s of sections){ if(s.offsetTop<=y) current=s.id; }
    links.forEach(l=>{
      const active=l.getAttribute('href')==='#'+current;
      l.classList.toggle('active', active);
      if(active) l.setAttribute('aria-current','page'); else l.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // Mobile menu
  const btn=document.querySelector('.nav-toggle');
  const nav=document.getElementById('primary-nav');
  if(btn && nav){
    const close=()=>{nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); btn.setAttribute('aria-label','Open menu');};
    const open =()=>{nav.classList.add('open'); btn.setAttribute('aria-expanded','true');  btn.setAttribute('aria-label','Close menu');};
    btn.addEventListener('click',()=> btn.getAttribute('aria-expanded')==='true'?close():open());
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    window.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
  }

  // Back to top
  const topBtn=document.getElementById('toTop');
  function toggleTop(){ topBtn?.classList.toggle('show', (window.scrollY||document.documentElement.scrollTop)>400); }
  window.addEventListener('scroll', toggleTop, {passive:true}); toggleTop();

  // Mailto form
  window.sendMailto = function(e){
    e.preventDefault();
    const f=e.target, get=n=>(f.querySelector('[name="'+n+'"]')?.value||'').trim();
    const subject=encodeURIComponent('Booking request — '+get('bundle'));
    const body=encodeURIComponent([
      'Name: '+get('name'),
      'Address: '+get('address'),
      'Contact: '+get('contact'),
      'Preferred: '+get('times'),
      '', 'Notes:', get('notes')
    ].join('\\n'));
    window.location.href='mailto:waightsgardencare@gmail.com?subject='+subject+'&body='+body;
    return false;
  }
})();

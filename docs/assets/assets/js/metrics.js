(function(){
  function send(eventName, props){
    try{
      if (window.plausible) { window.plausible(eventName, { props: props||{} }); }
    } catch(_) {}
  }

  // Track tel: and mailto: clicks
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a');
    if(!a) return;
    var href = a.getAttribute('href')||'';
    if (href.startsWith('tel:'))   send('Click: Phone',  {href: href});
    if (href.startsWith('mailto:'))send('Click: Email',  {href: href});
    if (/^https?:\/\//i.test(href) && !href.includes(location.host)) send('Click: Outbound', {href: href});
  }, {passive:true});

  // Track CTA + form submits
  var cta = document.querySelector('.cta-bar .cta-btn');
  if (cta) cta.addEventListener('click', function(){ send('Click: CTA Book Now'); }, {passive:true});
  var form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', function(){ send('Submit: Contact Form'); });

  // First visit vs returning (local only)
  try{
    var k='wgc_first_seen';
    if (!localStorage.getItem(k)) { localStorage.setItem(k, Date.now()); send('Visit: First'); }
    else { send('Visit: Returning'); }
  }catch(_){}
})();

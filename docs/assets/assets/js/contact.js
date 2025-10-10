(function(){
  var form = document.getElementById('contactForm');
  if(!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();

    var data = new FormData(form);
    if (data.get('website')) return; // honeypot

    var required = ['name','email','service'];
    for (var i=0;i<required.length;i++) {
      if(!(data.get(required[i])||'').trim()){
        show('Please fill in your name, email and choose a service.'); return;
      }
    }

    var body = [
      'New enquiry from Waights Garden Care website:',
      '',
      'Name: ' + (data.get('name')||''),
      'Phone: ' + (data.get('phone')||''),
      'Email: ' + (data.get('email')||''),
      'Postcode: ' + (data.get('postcode')||''),
      'Service: ' + (data.get('service')||''),
      'Preferred day: ' + (data.get('day')||'Any'),
      'Preferred time: ' + (data.get('time')||'Any'),
      '',
      'Message:',
      (data.get('message')||'')
    ].join('%0D%0A');

    var subject = encodeURIComponent('New enquiry — Waights Garden Care');
    var mail = 'mailto:waightsgardencare@proton.me?subject=' + subject + '&body=' + body;

    window.location.href = mail;
    show('Thanks! Your email draft has opened — just press send.');
    form.reset();
  });

  function show(msg){
    var el = document.getElementById('formStatus');
    if(el){ el.textContent = msg; }
  }
})();

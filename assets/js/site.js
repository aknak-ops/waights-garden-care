(() => {
  const btn=document.querySelector('.nav-toggle');
  const list=document.querySelector('.site-header .nav ul');
  if(!btn||!list) return;
  btn.addEventListener('click',()=>{
    const open = btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded', String(!open));
    list.classList.toggle('open');
  });
})();


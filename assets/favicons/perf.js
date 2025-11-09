(function(){
  var hero = document.querySelector('.hero img');
  if (hero){
    hero.setAttribute('loading','eager');
    hero.setAttribute('fetchpriority','high');
    hero.setAttribute('decoding','async');
  }
})();

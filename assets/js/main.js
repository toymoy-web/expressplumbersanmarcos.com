(function(){
  /* Mobile drawer */
  var t=document.getElementById('mob-toggle'),d=document.getElementById('mob-drawer'),o=document.getElementById('mob-overlay'),c=document.getElementById('drawer-close');
  function openDrawer(){d.removeAttribute('hidden');o.classList.add('visible');t.setAttribute('aria-expanded','true');t.setAttribute('aria-label','Close navigation menu');document.documentElement.style.overflow='hidden';}
  function closeDrawer(){d.setAttribute('hidden','');o.classList.remove('visible');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open navigation menu');document.documentElement.style.overflow='';}
  if(t&&d&&o){
    t.addEventListener('click',function(){t.getAttribute('aria-expanded')==='true'?closeDrawer():openDrawer();});
    if(c)c.addEventListener('click',closeDrawer);
    o.addEventListener('click',closeDrawer);
    d.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeDrawer);});
    window.addEventListener('resize',function(){if(window.innerWidth>768&&t.getAttribute('aria-expanded')==='true')closeDrawer();});
  }

  /* Desktop dropdowns: hover, focus, keyboard, and first-tap-opens on touch */
  var items=Array.prototype.slice.call(document.querySelectorAll('.has-dropdown'));
  function closeAll(except){items.forEach(function(li){if(li!==except){li.classList.remove('open');var a=li.querySelector(':scope > a');if(a)a.setAttribute('aria-expanded','false');}});}
  items.forEach(function(li){
    var a=li.querySelector(':scope > a');
    if(!a)return;
    li.addEventListener('mouseenter',function(){a.setAttribute('aria-expanded','true');});
    li.addEventListener('mouseleave',function(){if(!li.classList.contains('open'))a.setAttribute('aria-expanded','false');});
    li.addEventListener('focusin',function(){a.setAttribute('aria-expanded','true');});
    li.addEventListener('focusout',function(e){if(!li.contains(e.relatedTarget))a.setAttribute('aria-expanded','false');});
    a.addEventListener('click',function(e){
      if(window.matchMedia('(hover:none)').matches&&!li.classList.contains('open')){
        e.preventDefault();closeAll(li);li.classList.add('open');a.setAttribute('aria-expanded','true');
      }
    });
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.has-dropdown'))closeAll();});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){closeAll();if(t&&t.getAttribute('aria-expanded')==='true')closeDrawer();if(document.activeElement&&document.activeElement.blur&&document.activeElement.closest&&document.activeElement.closest('.has-dropdown'))document.activeElement.blur();}
  });

  /* FAQ accordion (mouse + keyboard) */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q=item.querySelector('.faq-q');
    if(!q)return;
    q.setAttribute('role','button');q.setAttribute('tabindex','0');q.setAttribute('aria-expanded','false');
    function toggle(){var o=item.classList.toggle('open');q.setAttribute('aria-expanded',o?'true':'false');}
    q.addEventListener('click',toggle);
    q.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
  });
})();

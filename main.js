(()=>{
const B={good:{name:'Good · 2 products',tier:'Good',price:14,list:17.94,items:'2 Frosted Cranberry Everyday Cleaners',ship:4.95,img:'good'},
better:{name:'Better · 4 products',tier:'Better',price:24,list:35.88,items:'2 Everyday Cleaners + 2 Aloe Hand Soaps',ship:4.95,img:'better'},
best:{name:'Best · 10 products',tier:'Best',price:39,list:89.70,items:'2 Everyday Cleaners + 2 Aloe Hand Soaps + 6 FREE (3 Cleaners + 3 Hand Soaps)',ship:0,img:'best'}};
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const money=n=>'$'+(Number.isInteger(n)?n:n.toFixed(2));
let sel='best';
function update(){const b=B[sel],img=$('#bundleImg');
 img.style.opacity=.3;const src=`assets/${b.img}-480.webp`;
 const n=new Image();n.onload=()=>{img.src=src;img.srcset=`assets/${b.img}-480.webp 480w, assets/${b.img}-800.webp 800w`;img.alt=b.tier+' bundle: '+b.items;img.style.opacity=1};n.src=src;
 $('#bundleCaption').textContent=b.tier.toUpperCase()+' · '+b.items;
 $$('[data-sel-price]').forEach(e=>e.textContent=money(b.price));
 $$('[data-sel-list]').forEach(e=>e.textContent=money(b.list));
 $$('[data-sel-name]').forEach(e=>e.textContent=b.name);}
$$('input[name=bundle]').forEach(r=>r.addEventListener('change',()=>{sel=r.value;update()}));
$$('[data-scroll]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();$('#bundles').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});setTimeout(()=>$('input[name=bundle]:checked').focus({preventScroll:true}),600)}));
// sticky bar: hide while hero CTA or selector visible
const sticky=$('#stickyCta'),vis=new Set();
const io=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?vis.add(e.target):vis.delete(e.target));const h=vis.size>0;sticky.classList.toggle('hide',h);sticky.setAttribute('aria-hidden',h);sticky.querySelector('a').tabIndex=h?-1:0},{threshold:0.15});
['.hero .btn-lg','#bundles','.final'].forEach(s=>io.observe($(s)));
// modal
const dlg=$('#orderModal');
$('#checkoutBtn').addEventListener('click',()=>{const b=B[sel];
 $('#mName').textContent=b.tier;$('#mItems').textContent=b.items;$('#mShip').textContent=b.ship?money(b.ship):'FREE';
 $('#mTotal').textContent=money(b.price+b.ship);$('#mSave').textContent=`You save ${money(+(b.list-b.price).toFixed(2))} (${Math.round((1-b.price/b.list)*100)}% off)`;
 $('#modalImg').src=`assets/${b.img}-480.webp`;
 dlg.showModal?dlg.showModal():dlg.setAttribute('open','')});
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
})();
document.querySelectorAll('.ba').forEach(f=>{const r=f.querySelector('input');r.addEventListener('input',()=>f.style.setProperty('--pos',r.value+'%'))});

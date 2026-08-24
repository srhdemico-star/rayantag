const menu=document.getElementById('mobileMenu'),overlay=document.getElementById('menuOverlay'),openBtn=document.querySelector('.mobile-menu-btn'),closeBtn=document.getElementById('closeMenu');
function setMenu(open){menu?.classList.toggle('open',open);overlay?.classList.toggle('open',open);menu?.setAttribute('aria-hidden',String(!open));openBtn?.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''}
openBtn?.addEventListener('click',()=>setMenu(true));closeBtn?.addEventListener('click',()=>setMenu(false));overlay?.addEventListener('click',()=>setMenu(false));
const searchInput=document.getElementById('searchInput'),searchBtn=document.getElementById('searchBtn');
function doSearch(){const q=searchInput?.value.trim();if(q) location.href='products.html?search='+encodeURIComponent(q)}
searchBtn?.addEventListener('click',doSearch);searchInput?.addEventListener('keydown',e=>{if(e.key==='Enter')doSearch()});
document.querySelectorAll('.product-card').forEach(card=>card.addEventListener('click',e=>{if(!e.target.closest('a')) card.style.transform='translateY(-2px)'}));

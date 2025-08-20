document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year'); 
  if (y) y.textContent = new Date().getFullYear();

  // Enable tap-to-toggle for touch devices on .touchable
  document.querySelectorAll('.touchable').forEach(el => {
    el.addEventListener('click', (e) => {
      // Avoid toggling when clicking buttons or links
      if (e.target && (e.target.closest('button') || e.target.closest('a'))) return;
      el.classList.toggle('tapped');
    });
  });
});

// Featured (uses localStorage)
function renderFeatured(filter='all'){
  const mount = document.getElementById('featured-list');
  if(!mount) return;
  const list = JSON.parse(localStorage.getItem('featured')||'[]');
  const filtered = filter==='all' ? list : list.filter(x=>x.type===filter);
  mount.innerHTML = '';
  if(filtered.length===0){
    mount.innerHTML = '<p class="muted">No featured items yet. Go to Projects/Skills/Certifications/etc. and click “Add to Featured”.</p>';
    return;
  }
  filtered.forEach(item=>{
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
      <div class="overlay" style="opacity:1; background:transparent;">
        <h3 style="margin:14px 0;">${item.title}</h3>
        <p class="muted" style="margin:0 0 10px;">Type: ${item.type}</p>
        <div style="display:flex; gap:8px; justify-content:center;">
          <button class="btn mini" onclick="unfeature(${item.id})">Remove</button>
        </div>
      </div>`;
    mount.appendChild(card);
  });
}

function unfeature(id){
  const list = JSON.parse(localStorage.getItem('featured')||'[]');
  const next = list.filter(x=>x.id!==id);
  localStorage.setItem('featured', JSON.stringify(next));
  renderFeatured('all');
}

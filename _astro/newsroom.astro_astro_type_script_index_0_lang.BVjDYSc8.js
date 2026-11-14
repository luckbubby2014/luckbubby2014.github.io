import{v as w,w as f}from"./supabase.BNIIj4In.js";const u=document.querySelectorAll("[data-news-filter]"),l=document.querySelector(".news-feed"),d=document.querySelector("[data-news-empty]"),p={game:"游戏更新",site:"网站",release:"首航发布"};function r(e){return e.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]??n)}function h(e){const n=new Date(e.created_at),c=`${n.getFullYear()}.${String(n.getMonth()+1).padStart(2,"0")}.${String(n.getDate()).padStart(2,"0")}`,a=f(e.cover_path),t=(e.sections??[]).map(s=>`<section class="news-section">
            ${s.heading?`<h3>${r(s.heading)}</h3>`:""}
            ${(s.paragraphs??[]).map(i=>`<p>${r(i)}</p>`).join("")}
            ${s.items?.length?`<ul>${s.items.map(i=>`<li>${r(i)}</li>`).join("")}</ul>`:""}
          </section>`).join("");return`<article class="news-item" data-news-category="${r(e.category)}" data-news-date="${c.replaceAll(".","-")}" id="post-${e.id}">
        <header class="news-head">
          <div class="news-date">
            <span class="mono">POSTED</span>
            <b>${c}</b>
            <em>00</em>
          </div>
          <div class="news-title">
            <div class="news-tags">
              <span class="news-cat">${p[e.category]??"动态"}</span>
              ${e.version?`<span class="news-version">${r(e.version)}</span>`:""}
            </div>
            <h2>${r(e.title)}</h2>
            ${e.lede?`<p class="news-lede">${r(e.lede)}</p>`:""}
          </div>
        </header>
        ${a?`<figure class="news-figure"><img src="${r(a)}" alt="${r(e.cover_caption??e.title)}" loading="lazy" decoding="async" />${e.cover_caption?`<figcaption>${r(e.cover_caption)}</figcaption>`:""}</figure>`:""}
        ${t?`<div class="news-body">${t}</div>`:""}
      </article>`}function $(){const e=[...document.querySelectorAll(".news-item")].sort((t,s)=>(s.dataset.newsDate??"").localeCompare(t.dataset.newsDate??""));e.forEach((t,s)=>{const i=t.querySelector(".news-date em");i&&(i.textContent=String(s+1).padStart(2,"0")),t.classList.toggle("is-featured",s===0)});const n=document.querySelector("#news-count"),c=document.querySelector("#news-rail-count");n&&(n.textContent=String(e.length)),c&&(c.textContent=String(e.length));const a=document.querySelector("#news-latest");if(a){const t=e[0]?.dataset.newsDate;t&&(a.textContent=t.replaceAll("-","."))}}function m(e){const n=document.querySelectorAll("[data-news-category]");let c=0;n.forEach(a=>{const t=e==="all"||a.dataset.newsCategory===e;a.hidden=!t,t&&(c+=1)}),d&&(d.hidden=c>0),u.forEach(a=>{const t=a.dataset.newsFilter===e;a.classList.toggle("is-active",t),a.setAttribute("aria-pressed",t?"true":"false")})}u.forEach(e=>{e.addEventListener("click",()=>m(e.dataset.newsFilter??"all"))});async function v(){if(l)try{(await w()).forEach(c=>{const a=new Date(c.created_at).toISOString().slice(0,10),s=[...l.querySelectorAll(".news-item")].find(g=>(g.dataset.newsDate??"")<a),i=document.createElement("div");i.innerHTML=h(c);const o=i.firstElementChild;o&&(s?l.insertBefore(o,s):l.appendChild(o))}),$();const n=document.querySelector("[data-news-filter].is-active");m(n?.dataset.newsFilter??"all")}catch{}}v();

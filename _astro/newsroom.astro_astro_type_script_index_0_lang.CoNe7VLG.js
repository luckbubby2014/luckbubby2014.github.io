import{G as w,H as p}from"./supabase.DgWUCb1c.js";const u=document.querySelectorAll("[data-news-filter]"),l=document.querySelector(".news-feed"),d=document.querySelector("[data-news-empty]"),h={game:"游戏更新",site:"网站",release:"首航发布"};function r(e){return e.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]??c)}function m(e){return`${e.getFullYear()}.${String(e.getMonth()+1).padStart(2,"0")}.${String(e.getDate()).padStart(2,"0")}`}function $(e){const c=new Date(e.created_at),s=m(c),n=p(e.cover_path),t=(e.sections??[]).map(a=>`<section class="news-section">
            ${a.heading?`<h3>${r(a.heading)}</h3>`:""}
            ${(a.paragraphs??[]).map(i=>`<p>${r(i)}</p>`).join("")}
            ${a.items?.length?`<ul>${a.items.map(i=>`<li>${r(i)}</li>`).join("")}</ul>`:""}
          </section>`).join("");return`<article class="news-item" data-news-category="${r(e.category)}" data-news-date="${s.replaceAll(".","-")}" id="post-${e.id}">
        <header class="news-head">
          <div class="news-date">
            <span class="mono">POSTED</span>
            <b>${s}</b>
            <em>00</em>
          </div>
          <div class="news-title">
            <div class="news-tags">
              <span class="news-cat">${h[e.category]??"动态"}</span>
              ${e.version?`<span class="news-version">${r(e.version)}</span>`:""}
            </div>
            <h2>${r(e.title)}</h2>
            ${e.lede?`<p class="news-lede">${r(e.lede)}</p>`:""}
          </div>
        </header>
        ${n?`<figure class="news-figure"><img src="${r(n)}" alt="${r(e.cover_caption??e.title)}" loading="lazy" decoding="async" />${e.cover_caption?`<figcaption>${r(e.cover_caption)}</figcaption>`:""}</figure>`:""}
        ${t?`<div class="news-body">${t}</div>`:""}
      </article>`}function v(){const e=[...document.querySelectorAll(".news-item")].sort((t,a)=>(a.dataset.newsDate??"").localeCompare(t.dataset.newsDate??""));e.forEach((t,a)=>{const i=t.querySelector(".news-date em");i&&(i.textContent=String(a+1).padStart(2,"0")),t.classList.toggle("is-featured",a===0)});const c=document.querySelector("#news-count"),s=document.querySelector("#news-rail-count");c&&(c.textContent=String(e.length)),s&&(s.textContent=String(e.length));const n=document.querySelector("#news-latest");if(n){const t=e[0]?.dataset.newsDate;t&&(n.textContent=t.replaceAll("-","."))}}function f(e){const c=document.querySelectorAll("[data-news-category]");let s=0;c.forEach(n=>{const t=e==="all"||n.dataset.newsCategory===e;n.hidden=!t,t&&(s+=1)}),d&&(d.hidden=s>0),u.forEach(n=>{const t=n.dataset.newsFilter===e;n.classList.toggle("is-active",t),n.setAttribute("aria-pressed",t?"true":"false")})}u.forEach(e=>{e.addEventListener("click",()=>f(e.dataset.newsFilter??"all"))});async function y(){if(l)try{(await w()).forEach(s=>{const n=m(new Date(s.created_at)),a=[...l.querySelectorAll(".news-item")].find(g=>(g.dataset.newsDate??"")<n.replaceAll(".","-")),i=document.createElement("div");i.innerHTML=$(s);const o=i.firstElementChild;o&&(a?l.insertBefore(o,a):l.appendChild(o))}),v();const c=document.querySelector("[data-news-filter].is-active");f(c?.dataset.newsFilter??"all")}catch{}}y();

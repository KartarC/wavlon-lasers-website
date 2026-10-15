(function () {
  'use strict';
  function normalize(value) {
    return value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
      .replace(/fibre/g,'fiber').replace(/([0-9])\s+(kw|mm)\b/g,'$1$2').replace(/[^a-z0-9]+/g,' ').trim();
  }
  function search(pages, query) {
    var words = normalize(query).split(/\s+/).filter(Boolean).slice(0,12);
    if (!words.length) return [];
    return pages.map(function(p) {
      var title=normalize(p.title), description=normalize(p.description), body=normalize(p.text);
      var score=0;
      for(var word of words) {
        if (!(title+' '+description+' '+body).includes(word)) return null;
        score += title.includes(word) ? 20 : description.includes(word) ? 6 : 1;
      }
      return {page:p,score:score};
    }).filter(Boolean).sort(function(a,b){return b.score-a.score || a.page.title.localeCompare(b.page.title);}).map(function(x){return x.page;});
  }
  if (typeof module !== 'undefined' && module.exports) {module.exports={search:search,normalize:normalize};return;}
  var form=document.getElementById('site-search-form');
  if (!form) return;
  var input=document.getElementById('site-search-query'), results=document.getElementById('site-search-results'), status=document.getElementById('site-search-status');
  var corpus;
  function run() {
    results.replaceChildren();
    var query=input.value.trim().slice(0,160);
    if(!query){status.textContent='Enter a machine, material, question or keyword to search all public pages.';return;}
    if(!corpus){status.textContent='Search is loading. Please try again shortly.';return;}
    var matches=search(corpus,query);
    status.textContent=matches.length ? matches.length+' matching pages' : 'No matches. Try fewer words, a machine name, or contact us for help.';
    matches.forEach(function(p){
      var item=document.createElement('li'), heading=document.createElement('h2'), link=document.createElement('a'), description=document.createElement('p');
      link.href=p.url;link.textContent=p.title;heading.appendChild(link);
      description.textContent=p.description;item.append(heading,description);results.appendChild(item);
    });
  }
  input.value=new URLSearchParams(location.search).get('q')?.slice(0,160) || '';
  form.addEventListener('submit',function(e){e.preventDefault();run();});
  fetch('/assets/search-index.json').then(function(r){if(!r.ok)throw new Error('Search unavailable');return r.json();}).then(function(data){corpus=data;run();}).catch(function(){status.textContent='Search is temporarily unavailable. Browse the Education Center or machine catalogue below.';});
}());

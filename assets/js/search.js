(function(){
  var q=document.getElementById('q'),out=document.getElementById('results'),data=null;
  function load(cb){ if(data) return cb(); fetch(window.SEARCH_URL).then(function(r){return r.json()}).then(function(d){data=d;cb()}); }
  q.addEventListener('input',function(){
    var v=q.value.trim().toLowerCase();
    if(v.length<2){out.style.display='none';return;}
    load(function(){
      var hits=data.filter(function(p){return (p.title+' '+p.text).toLowerCase().indexOf(v)>-1}).slice(0,6);
      out.innerHTML=hits.length?hits.map(function(p){return '<a href="'+p.url+'"><b>'+p.title+'</b><small>'+p.category+'</small></a>'}).join(''):'<span>No posts match your search.</span>';
      out.style.display='block';
    });
  });
  document.addEventListener('click',function(e){ if(!e.target.closest('.search')) out.style.display='none'; });
})();

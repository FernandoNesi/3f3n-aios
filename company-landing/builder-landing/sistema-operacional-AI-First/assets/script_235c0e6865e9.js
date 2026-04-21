/* ============================================
   A NOVA ECONOMIA DA IA — v6
   Particles · Counters · Word reveal · Bars
   ============================================ */
;(function(){
  'use strict';

  /* --- PARTICLES (canvas with connections + blur) --- */
  function initParticles(){
    const c = document.getElementById('particles');
    if(!c) return;
    const ctx = c.getContext('2d');
    let w, h, pts = [];

    function resize(){
      w = c.width = c.offsetWidth;
      h = c.height = c.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const isMobile = w < 768;
    const n = Math.min(isMobile ? 20 : 40, Math.floor(w*h/18000));
    for(let i=0;i<n;i++){
      pts.push({
        x:Math.random()*w, y:Math.random()*h,
        r:Math.random()*1.5+.5,
        vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25,
        a:Math.random()*.25+.08
      });
    }

    function draw(){
      ctx.clearRect(0,0,w,h);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=w; if(p.x>w)p.x=0;
        if(p.y<0)p.y=h; if(p.y>h)p.y=0;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(16,101,227,${p.a})`;
        ctx.fill();
      });
      for(let i=0;i<pts.length;i++){
        for(let j=i+1;j<pts.length;j++){
          const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
          const d=Math.sqrt(dx*dx+dy*dy);
          if(d<130){
            ctx.beginPath();
            ctx.moveTo(pts[i].x,pts[i].y);
            ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle=`rgba(16,101,227,${.05*(1-d/130)})`;
            ctx.lineWidth=.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* --- SCROLL REVEAL --- */
  function initReveal(){
    const sel = [
      '.section-badge','.sect-h2','.sect-sub','.compare','.shift-list',
      '.impact','.vs-grid','.data-trio','.thesis-bar',
      '.mega-case','.small-label','.cases-row','.center-note','.big-quote',
      '.timeline-step','.who-item','.not-for','.instr',
      '.price-box','.guarantee-box','.faq','.wa-link',
      '.hero-quote','.pills-row',
      '.word-reveal','.break-h2','.break-sect .btn-cta',
      '.final-p','.final-sub','.final-h2','.final-sect .hero-meta','.final-sect .btn-cta',
      '.constellation-wrap','.pricing-sub',
      '.terminal',
      '.fobo-events','.fobo-reveal','.fobo-data-card',
      '.mirror','.mirror-body','.diagnosis','.diagnosis-word',
      '.workshop-extras','.bento-item','.extras-label'
    ].join(',');

    document.querySelectorAll(sel).forEach(el=>el.classList.add('reveal'));

    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}
      });
    },{threshold:.06,rootMargin:'0px 0px -30px 0px'});

    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  }

  /* --- WORD REVEAL --- */
  function initWords(){
    const box = document.getElementById('wordReveal');
    if(!box) return;
    const words = box.querySelectorAll('span');
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          words.forEach((w,i)=>setTimeout(()=>w.classList.add('lit'),i*55));
          // Após todas as palavras aparecerem, desenhar grifado
          var totalTime = words.length * 55 + 600;
          setTimeout(function(){
            var mark = box.querySelector('.wr-mark');
            if(mark) mark.classList.add('drawn');
          }, totalTime);
          obs.unobserve(e.target);
        }
      });
    },{threshold:.4});
    obs.observe(box);
  }

  /* --- COUNTERS --- */
  function initCounters(){
    document.querySelectorAll('[data-count]').forEach(el=>{
      const obs = new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(e.isIntersecting){countUp(e.target);obs.unobserve(e.target)}
        });
      },{threshold:.5});
      obs.observe(el);
    });
  }

  function fmt(n,isF){
    if(isF) return n.toFixed(1);
    return Math.round(n).toLocaleString('pt-BR');
  }

  function countUp(el){
    const t=parseFloat(el.dataset.count), pre=el.dataset.prefix||'', suf=el.dataset.suffix||'';
    const dur=1800, start=performance.now(), isF=t%1!==0 && t<100;
    function tick(now){
      const p=Math.min((now-start)/dur,1), e=1-Math.pow(1-p,3), v=t*e;
      el.textContent=pre+fmt(v,isF)+suf;
      if(p<1)requestAnimationFrame(tick);
      else el.textContent=pre+fmt(t,isF)+suf;
    }
    requestAnimationFrame(tick);
  }

  /* --- BAR FILLS --- */
  function initBars(){
    document.querySelectorAll('.cn-fill').forEach(b=>{
      const obs=new IntersectionObserver(entries=>{
        entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('animated');obs.unobserve(e.target)}});
      },{threshold:.3});
      obs.observe(b);
    });
  }

  /* --- SMOOTH SCROLL --- */
  function initSmooth(){
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        const id=a.getAttribute('href');
        if(id==='#')return;
        const el=document.querySelector(id);
        if(el){e.preventDefault();window.scrollTo({top:el.getBoundingClientRect().top+window.pageYOffset-20,behavior:'smooth'})}
      });
    });
  }

  /* --- CONSTELLATION PULSE WAVE --- */
  function initConstellation(){
    const nodes = document.querySelectorAll('.hex-node');
    const center = document.querySelector('.center-float');
    const spokes = document.querySelectorAll('.spoke');
    if(!nodes.length) return;
    const delay = 600;
    const holdTime = 900;
    const pauseAfter = 1500;

    function fireWave(){
      nodes.forEach((node, i) => {
        setTimeout(() => {
          node.classList.add('processing');
          // Speed up corresponding spoke
          if(spokes[i]) spokes[i].classList.add('spoke-fast');
          const ripple = node.querySelector('.ripple-ring');
          if(ripple){ ripple.classList.remove('fire'); void ripple.offsetWidth; ripple.classList.add('fire'); }
          if(center){ center.classList.remove('center-pulse'); void center.offsetWidth; center.classList.add('center-pulse'); }
          setTimeout(() => {
            node.classList.remove('processing');
            if(spokes[i]) spokes[i].classList.remove('spoke-fast');
            if(center) center.classList.remove('center-pulse');
          }, holdTime);
        }, i * delay);
      });

      const seqEnd = nodes.length * delay + holdTime;
      setTimeout(() => {
        // Flash 1
        nodes.forEach(n => n.classList.add('processing'));
        spokes.forEach(s => s.classList.add('spoke-burst'));
        if(center){ center.classList.remove('center-burst'); void center.offsetWidth; center.classList.add('center-burst'); }
        setTimeout(() => {
          nodes.forEach(n => n.classList.remove('processing'));
          spokes.forEach(s => s.classList.remove('spoke-burst'));
          if(center) center.classList.remove('center-burst');
          // Flash 2
          setTimeout(() => {
            nodes.forEach(n => n.classList.add('processing'));
            spokes.forEach(s => s.classList.add('spoke-burst'));
            if(center){ center.classList.remove('center-burst'); void center.offsetWidth; center.classList.add('center-burst'); }
            setTimeout(() => {
              nodes.forEach(n => n.classList.remove('processing'));
              spokes.forEach(s => s.classList.remove('spoke-burst'));
              if(center) center.classList.remove('center-burst');
            }, 500);
          }, 400);
        }, 500);
      }, seqEnd + 400);
    }

    fireWave();
    const totalCycle = nodes.length * delay + holdTime + 400 + 500 + 400 + 500 + pauseAfter;
    setInterval(fireWave, totalCycle);
  }

  // Forçar scroll pro topo ao carregar
  if('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0,0);

  document.addEventListener('DOMContentLoaded',()=>{
    window.scrollTo(0,0);
    initParticles();
    initReveal();
    initWords();
    initCounters();
    initBars();
    initSmooth();
    // Chart draw animation
    const chartEl = document.querySelector('.term-chart');
    if(chartEl){
      const chartObs = new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            document.querySelectorAll('.chart-line,.chart-area-fill,.chart-dot,.chart-dot-glow').forEach(el=>el.classList.add('drawn'));
            chartObs.unobserve(e.target);
          }
        });
      },{threshold:.3});
      chartObs.observe(chartEl);
    }

    // Terminal clock
    const termClock = document.getElementById('termTime');
    if(termClock){
      function updateClock(){
        const now = new Date();
        termClock.textContent = now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
      }
      updateClock();
      setInterval(updateClock, 1000);
    }

    // Highlight draw animation
    document.querySelectorAll('.hl-draw').forEach(function(el){
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ e.target.classList.add('drawn'); obs.unobserve(e.target); }
        });
      }, {threshold:0});
      obs.observe(el);
    });

    // Strikethrough: strike + fade together
    const strike = document.querySelector('.strike-anim');
    if(strike){
      setTimeout(() => { strike.classList.add('striking'); strike.classList.add('faded'); }, 1500);
    }
    // Machine Dashboard — modelo em funcionamento
    var machineCard = document.getElementById('machineCard');
    if(machineCard){
      var dashFat = document.getElementById('dashFat');
      var dashEmpresas = document.getElementById('dashEmpresas');
      var dashRec = document.getElementById('dashRec');
      var dotsGrid = document.getElementById('dashDotsGrid');
      var machineRunning = false;

      // Fase 1: primeiras 7 (mais lento, tá começando)
      // Fase 2: acelerando (2-3 por "mês", mais rápido)
      var upfronts = [15000, 25000, 25000, 38000, 45000, 35000, 22000, 30000, 42000, 28000, 35000, 48000, 32000, 40000, 36000, 28000, 45000, 38000];
      var recorrencia = [4200, 4800, 5500, 6200, 7000, 5800, 9800, 5200, 6800, 4600, 10500, 7200, 5000, 6500, 5800, 9200, 6000, 5400];
      var maxClients = upfronts.length;
      var fase1Count = 4; // primeiras 4 mais lentas, depois acelera

      function formatMoney(v){ return v.toLocaleString('pt-BR'); }

      // Grid de bolinhas (30 = 3 rows x 10 cols)
      var totalDots = 30;
      function createDots(){
        dotsGrid.innerHTML = '';
        for(var i = 0; i < totalDots; i++){
          var dot = document.createElement('div');
          dot.className = 'dash-dot';
          dotsGrid.appendChild(dot);
        }
      }
      createDots();

      function activateDot(idx){
        var dots = dotsGrid.querySelectorAll('.dash-dot');
        if(idx < dots.length){
          // Flash ciano — instalando (2.5s de glow expansivo)
          dots[idx].classList.add('dot-flash');
          setTimeout(function(){
            // Transição suave pra ativo pulsante (em operação)
            dots[idx].classList.remove('dot-flash');
            dots[idx].classList.add('dot-active');
            // Pulse começa com delay pra não ser instantâneo
            setTimeout(function(){
              dots[idx].classList.add('dot-pulse');
            }, 800);
          }, 2500);
        }
      }

      // Feed de atividade
      function addFeedItem(text, isFlash){
        var item = document.createElement('div');
        item.className = 'dash-feed-item' + (isFlash ? ' dash-feed-item--flash' : ' dash-feed-item--active');
        item.innerHTML = '<span class="dash-feed-dot"></span><span class="dash-feed-text">' + text + '</span>';
        // Manter max 4 items
        while(dashFeed.children.length >= 4){ dashFeed.removeChild(dashFeed.firstChild); }
        dashFeed.appendChild(item);
        // Fade in
        requestAnimationFrame(function(){ item.classList.add('dash-feed-item--active'); });
      }

      function resetMachine(){
        dashFat.textContent = 'R$ 0';
        dashEmpresas.textContent = '0';
        dashRec.innerHTML = 'R$ 0<span class="dash-stat-suffix">/mês</span>';
        createDots();
        machineCard.classList.remove('machine-live');
      }

      function runMachine(){
        resetMachine();
        var installed = 0;
        var activeCount = 0;
        var totalRevenue = 0;
        var totalRecorrencia = 0;
        var totalSetup = 0;
        var recTimers = [];

        function installNext(){
          if(installed >= maxClients){
            startLivePhase();
            return;
          }

          var idx = installed;
          if(idx === 0) machineCard.classList.add('machine-live');

          // Bolinha começa flash (instalando)
          activateDot(idx);

          setTimeout(function(){
            totalSetup += upfronts[idx];
            totalRevenue += upfronts[idx];
            dashFat.textContent = 'R$ ' + formatMoney(totalRevenue);
            // Popup de setup — grande e impactante
            var dots = dotsGrid.querySelectorAll('.dash-dot');
            if(idx < dots.length) showSetupMoney(dots[idx], upfronts[idx]);
          }, 1200);

          setTimeout(function(){
            activeCount++;
            totalRecorrencia += recorrencia[idx];
            dashEmpresas.textContent = activeCount;
            dashRec.innerHTML = 'R$ ' + formatMoney(totalRecorrencia) + '<span class="dash-stat-suffix">/mês</span>';
            // Inicia timer de recorrência dessa empresa
            startRecorrencia(idx);
          }, 2500);

          installed++;
          // Acelera progressivamente: 1-4 = 6s, 5-8 = 4s, 9+ = 2.5s
          var nextDelay;
          if(installed <= 4) nextDelay = 6000;
          else if(installed <= 8) nextDelay = 4000;
          else nextDelay = 2500;
          setTimeout(installNext, nextDelay);
        }

        function startLivePhase(){
          // Todas operando — recorrências rodando sozinhas
          // Pausa 3s e reseta
          setTimeout(function(){
            recTimers.forEach(function(t){ clearTimeout(t); clearInterval(t); });
            recTimers = [];
            machineCard.style.transition = 'opacity 1.2s';
            machineCard.style.opacity = '0.15';
            setTimeout(function(){
              machineCard.style.opacity = '1';
              runMachine();
            }, 1500);
          }, 3000);
        }

        // Recorrência — popup discreto verde
        function showRecMoney(dotEl, amount){
          var pop = document.createElement('span');
          pop.className = 'dot-money';
          pop.textContent = '+R$' + formatMoney(amount);
          dotEl.appendChild(pop);
          dotEl.classList.add('dot-earning');
          setTimeout(function(){ dotEl.classList.remove('dot-earning'); }, 800);
          setTimeout(function(){ if(pop.parentNode) pop.parentNode.removeChild(pop); }, 2600);
        }

        // Setup — popup grande ciano impactante
        function showSetupMoney(dotEl, amount){
          var pop = document.createElement('span');
          pop.className = 'dot-setup';
          pop.textContent = '+R$' + formatMoney(amount);
          dotEl.appendChild(pop);
          dotEl.classList.add('dot-installing');
          setTimeout(function(){ dotEl.classList.remove('dot-installing'); }, 2500);
          setTimeout(function(){ if(pop.parentNode) pop.parentNode.removeChild(pop); }, 3100);
        }

        // Cada empresa tem seu próprio timer de recorrência
        var recTimers = [];

        function startRecorrencia(empresaIdx){
          // Primeiro pagamento 5s depois da instalação (simula mês seguinte)
          // Depois repete a cada 8s (simula meses passando)
          var timer = setTimeout(function(){
            function cobrar(){
              var dots = dotsGrid.querySelectorAll('.dot-pulse');
              if(empresaIdx < dots.length && dots[empresaIdx]){
                totalRevenue += recorrencia[empresaIdx];
                dashFat.textContent = 'R$ ' + formatMoney(totalRevenue);
                showRecMoney(dots[empresaIdx], recorrencia[empresaIdx]);
              }
            }
            cobrar();
            var interval = setInterval(cobrar, 8000);
            recTimers.push(interval);
          }, 5000);
          recTimers.push(timer);
        }

        setTimeout(installNext, 800);
      }

      // Start when visible
      var machineObs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting && !machineRunning){
            machineRunning = true;
            runMachine();
          }
        });
      }, {threshold:0.2});
      machineObs.observe(machineCard);
    }

    initConstellation();

    // Sticky CTA: appears after hero, hides when pricing is visible
    var stickyCta = document.getElementById('stickyCta');
    if(stickyCta){
      var heroEl = document.querySelector('.hero');
      var pricingEl = document.getElementById('pricing');

      if(heroEl){
        new IntersectionObserver(function(entries){
          entries.forEach(function(e){
            if(!e.isIntersecting) stickyCta.classList.add('visible');
            else stickyCta.classList.remove('visible');
          });
        }, {threshold:0}).observe(heroEl);
      }

      if(pricingEl){
        new IntersectionObserver(function(entries){
          entries.forEach(function(e){
            if(e.isIntersecting) stickyCta.classList.add('hidden');
            else stickyCta.classList.remove('hidden');
          });
        }, {threshold:0.2}).observe(pricingEl);
      }
    }
  });


  // ===== PHONE MASK =====
  var whatsInput = document.getElementById('whatsappInput');
  if(whatsInput){
    whatsInput.addEventListener('input', function(e){
      var cursorPos = e.target.selectionStart;
      var oldLen = e.target.value.length;
      var digits = e.target.value.replace(/\D/g, '');
      if(digits.length > 11) digits = digits.slice(0,11);
      var formatted = '';
      if(digits.length > 0) formatted = '(' + digits.slice(0,2);
      if(digits.length >= 2) formatted += ') ';
      if(digits.length > 2) formatted += digits.slice(2,7);
      if(digits.length > 7) formatted += '-' + digits.slice(7);
      e.target.value = formatted;
      var newLen = e.target.value.length;
      var newPos = cursorPos + (newLen - oldLen);
      if(newPos < 0) newPos = 0;
      e.target.setSelectionRange(newPos, newPos);
    });
  }

  // ===== CAPTURE MODAL =====
  var KIWIFY_URL = 'https://pay.kiwify.com.br/EzC9ATm';
  var WEBHOOK_URL = 'https://accelera360.app.n8n.cloud/webhook/nova-economia-lead';

  var modal = document.getElementById('captureModal');
  var modalClose = document.getElementById('modalClose');
  var captureForm = document.getElementById('captureForm');

  window.openCapture = function(e){
    if(e) e.preventDefault();
    if(modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if(modalClose){
    modalClose.addEventListener('click', function(){
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if(modal){
    modal.addEventListener('click', function(e){
      if(e.target === modal){
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if(captureForm){
    captureForm.addEventListener('submit', function(e){
      e.preventDefault();
      var nome = captureForm.nome.value.trim();
      var email = captureForm.email.value.trim();
      var whatsapp = captureForm.whatsapp.value.trim();

      if(!nome || !email || !whatsapp) return;

      // Desabilita botão durante envio
      var btn = captureForm.querySelector('.modal-submit');
      btn.disabled = true;
      btn.querySelector('span').textContent = 'Redirecionando...';

      // Meta Pixel - evento Lead
      if(typeof fbq !== 'undefined') fbq('track', 'Lead');

      // Envia pro webhook (fire and forget)
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nome: nome,
          email: email,
          whatsapp: whatsapp,
          timestamp: new Date().toISOString(),
          source: 'lp-nova-economia'
        })
      }).catch(function(){});

      // Redireciona pro Kiwify após 500ms (dá tempo do fetch sair)
      setTimeout(function(){
        window.open(KIWIFY_URL, '_top');
      }, 500);
    });
  }
})();

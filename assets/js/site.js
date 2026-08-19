/* ============================================================
   Maple Dealership — site behaviour
   Vanilla JS only. No build step, no dependencies.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Vehicle stock ---------- */
  var STOCK = [
    { id:'MD-4471', year:2023, make:'Toyota',    model:'RAV4 XLE AWD',        body:'SUV',       price:38995, km:31400, fuel:'Hybrid',   drive:'AWD', trans:'CVT',       colour:'Blue Flame',    condition:'Used',      badge:'Certified',   feat:['Heated seats','Adaptive cruise','Apple CarPlay','Blind-spot monitor'] },
    { id:'MD-4482', year:2024, make:'Honda',     model:'Civic Sport Touring', body:'Hatchback', price:33450, km:12280, fuel:'Gas',      drive:'FWD', trans:'CVT',       colour:'Boost Blue',    condition:'Used',      badge:'Low km',      feat:['Bose audio','Wireless charging','Lane keep','Remote start'] },
    { id:'MD-4490', year:2025, make:'Ford',      model:'F-150 XLT SuperCrew', body:'Truck',     price:61900, km:8,     fuel:'Gas',      drive:'4x4', trans:'10-speed',  colour:'Agate Black',   condition:'New',       badge:'New',         feat:['Tow package','360 camera','Bed liner','Trailer brake'] },
    { id:'MD-4455', year:2022, make:'Subaru',    model:'Outback Wilderness',  body:'Wagon',     price:36700, km:47900, fuel:'Gas',      drive:'AWD', trans:'CVT',       colour:'Geyser Blue',   condition:'Used',      badge:'Certified',   feat:['Roof rails','X-Mode','Heated wheel','All-weather mats'] },
    { id:'MD-4501', year:2024, make:'Hyundai',   model:'IONIQ 5 Preferred',   body:'EV',        price:48900, km:9600,  fuel:'Electric', drive:'AWD', trans:'Single-speed', colour:'Cyber Grey',  condition:'Used',      badge:'EV rebate',   feat:['488 km range','800V fast charge','Heat pump','V2L outlet'] },
    { id:'MD-4462', year:2021, make:'Mazda',     model:'CX-5 GT Turbo',       body:'SUV',       price:31250, km:62100, fuel:'Gas',      drive:'AWD', trans:'6-speed',   colour:'Soul Red',      condition:'Used',      badge:'',            feat:['Leather','Sunroof','Head-up display','Power tailgate'] },
    { id:'MD-4509', year:2025, make:'Chevrolet', model:'Equinox LT',          body:'SUV',       price:39880, km:14,    fuel:'Gas',      drive:'AWD', trans:'8-speed',   colour:'Sterling Grey', condition:'New',       badge:'New',         feat:['Wireless CarPlay','Remote start','Rear cross-traffic','Roof rails'] },
    { id:'MD-4433', year:2020, make:'Volkswagen',model:'Golf GTI Autobahn',   body:'Hatchback', price:27400, km:88300, fuel:'Gas',      drive:'FWD', trans:'6-speed MT',colour:'Pure White',    condition:'Used',      badge:'Manual',      feat:['Plaid cloth','Limited-slip diff','DCC dampers','Fender audio'] },
    { id:'MD-4517', year:2023, make:'Tesla',     model:'Model 3 Long Range',  body:'Sedan',     price:44900, km:38200, fuel:'Electric', drive:'AWD', trans:'Single-speed', colour:'Pearl White',condition:'Used',      badge:'EV rebate',   feat:['602 km range','Autopilot','Glass roof','Premium audio'] },
    { id:'MD-4468', year:2022, make:'Ram',       model:'1500 Big Horn',       body:'Truck',     price:52300, km:54600, fuel:'Gas',      drive:'4x4', trans:'8-speed',   colour:'Diamond Black', condition:'Used',      badge:'Certified',   feat:['Tow mirrors','Bed cover','Heated seats','Air suspension'] },
    { id:'MD-4524', year:2024, make:'Kia',       model:'Carnival LX+',        body:'Van',       price:45600, km:19800, fuel:'Gas',      drive:'FWD', trans:'8-speed',   colour:'Astra Blue',    condition:'Used',      badge:'8 seats',     feat:['Power sliding doors','Rear climate','Sunshades','Tri-zone A/C'] },
    { id:'MD-4441', year:2021, make:'Nissan',    model:'Kicks SV',            body:'SUV',       price:22900, km:71500, fuel:'Gas',      drive:'FWD', trans:'CVT',       colour:'Monarch Orange',condition:'Used',      badge:'Under $25k',  feat:['Around-view monitor','Heated seats','CarPlay','Auto emergency braking'] }
  ];
  window.MAPLE_STOCK = STOCK;

  /* ---------- 2. Car artwork ---------- */
  var SHAPES = {
    Sedan:     { body:'M28 130 L34 108 C50 101 80 97 106 95 L146 69 C172 61 238 59 268 67 L306 95 C344 99 372 105 386 113 C394 118 394 130 388 130 Z', glass:'M120 94 L152 74 C176 68 232 67 258 73 L288 94 Z', wheels:[122,312] },
    Coupe:     { body:'M28 130 L34 108 C50 101 80 97 106 95 L146 69 C172 61 238 59 268 67 L306 95 C344 99 372 105 386 113 C394 118 394 130 388 130 Z', glass:'M120 94 L152 74 C176 68 232 67 258 73 L288 94 Z', wheels:[122,312] },
    Hatchback: { body:'M28 130 L34 106 C48 99 76 95 100 93 L136 65 C162 57 226 57 252 64 L300 93 C332 97 356 102 366 110 C374 116 372 130 366 130 Z', glass:'M114 92 L142 70 C166 64 220 64 242 70 L272 92 Z', wheels:[116,300] },
    Wagon:     { body:'M26 130 L32 104 C46 97 74 93 98 91 L134 63 C160 55 262 55 286 62 L304 91 C344 95 374 100 386 109 C394 115 394 130 388 130 Z', glass:'M112 90 L140 68 C164 62 254 62 272 68 L286 90 Z', wheels:[116,312] },
    SUV:       { body:'M26 130 L30 100 C44 93 70 89 96 87 L120 57 C148 49 252 49 280 57 L306 87 C346 91 378 97 390 107 C396 113 396 130 390 130 Z', glass:'M108 86 L128 62 C154 56 246 56 270 62 L288 86 Z', wheels:[116,314] },
    EV:        { body:'M26 130 L30 102 C44 94 70 90 96 88 L124 58 C154 50 250 50 278 58 L308 88 C348 92 378 98 390 108 C396 114 396 130 390 130 Z', glass:'M110 87 L132 63 C158 57 244 57 268 63 L288 87 Z', wheels:[116,314] },
    Van:       { body:'M26 130 L28 82 C34 66 56 54 92 50 L268 50 C302 52 330 62 356 82 L386 104 C394 110 396 130 390 130 Z', glass:'M108 80 L112 60 L268 60 L286 80 Z', wheels:[110,318] },
    Truck:     { body:'M26 130 L30 100 C44 93 68 89 92 87 L114 57 C138 51 200 51 218 57 L238 87 L392 87 L392 130 Z', glass:'M104 86 L122 62 C142 57 194 57 210 62 L224 86 Z', wheels:[110,326] }
  };

  function carSVG(type, tone) {
    var s = SHAPES[type] || SHAPES.Sedan;
    var paint = tone === 'dark' ? '#0C1A16' : '#14382E';
    var glass = tone === 'dark' ? '#3E6357' : '#8FA79E';
    var w = s.wheels.map(function (x) {
      return '<circle cx="' + x + '" cy="130" r="25" fill="#0C1A16"/>' +
             '<circle cx="' + x + '" cy="130" r="11" fill="#A6AFA9"/>';
    }).join('');
    return '<svg class="car" viewBox="0 0 420 170" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">' +
      '<ellipse cx="210" cy="152" rx="180" ry="8" fill="#0C1A16" opacity=".13"/>' +
      '<path d="' + s.body + '" fill="' + paint + '"/>' +
      '<path d="' + s.glass + '" fill="' + glass + '"/>' + w +
      '<rect x="26" y="152" width="368" height="1" fill="#0C1A16" opacity=".2"/>' +
    '</svg>';
  }

  function leafSVG() {
    return '<svg class="carart__leaf" viewBox="0 0 100 100" aria-hidden="true">' +
      '<path fill="#0C1A16" d="M50 90 L47.5 62 L26 66 L29 57 L7 41 L13 38 L9 21 L28 25 L32 17 L46 31 L39 7 L50 12 L61 7 L54 31 L68 17 L72 25 L91 21 L87 38 L93 41 L71 57 L74 66 L52.5 62 L50 90 Z"/></svg>';
  }
  window.MAPLE_ART = { car: carSVG, leaf: leafSVG };

  /* ---------- 3. Helpers ---------- */
  function money(n) { return '$' + n.toLocaleString('en-CA'); }
  function km(n) { return n.toLocaleString('en-CA') + ' km'; }
  window.MAPLE_FMT = { money: money, km: km };

  function cardHTML(v) {
    var badge = v.badge ? '<b>' + v.badge + '</b>' : '<b>' + v.condition + '</b>';
    return '<article class="card">' +
      '<a class="card__link" href="vehicle.html?stock=' + v.id + '">' +
        '<div class="card__band"><span>' + v.id + '</span>' + badge + '</div>' +
        '<div class="carart">' + carSVG(v.body) + leafSVG() + '</div>' +
        '<div class="card__body">' +
          '<h3 class="card__title">' + v.year + ' ' + v.make + '<br>' + v.model + '</h3>' +
          '<p class="card__meta">' + v.body + ' &middot; ' + km(v.km) + ' &middot; ' + v.fuel + ' &middot; ' + v.drive + '</p>' +
          '<div class="card__price"><b>' + money(v.price) + '</b><span>Plus HST &amp; licensing</span></div>' +
        '</div>' +
      '</a></article>';
  }
  window.MAPLE_CARD = cardHTML;

  /* ---------- 4. Mobile navigation ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.navtoggle');
    var nav = document.getElementById('primary-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    /* year stamp */
    Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
      el.textContent = new Date().getFullYear();
    });

    /* fill any featured grid */
    var featured = document.getElementById('featured-grid');
    if (featured) {
      var ids = (featured.getAttribute('data-stock') || '').split(',');
      featured.innerHTML = ids.map(function (id) {
        var v = STOCK.filter(function (s) { return s.id === id.trim(); })[0];
        return v ? cardHTML(v) : '';
      }).join('');
    }

    /* forms: confirm without a server */
    Array.prototype.forEach.call(document.querySelectorAll('form[data-confirm]'), function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.reportValidity()) return;
        var note = form.querySelector('.formnote');
        if (note) {
          note.classList.add('show');
          note.setAttribute('role', 'status');
          note.scrollIntoView({ block: 'center' });
        }
        form.reset();
      });
    });
  });
})();

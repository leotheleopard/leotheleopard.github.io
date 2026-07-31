(function(){
  const $ = id => document.getElementById(id);

  /* =========================================================
     PART 1 — CALCULATOR (Your numbers / The plan / tips / shop)
     ========================================================= */
  let unit = 'metric';
  let lastDailyTarget = null;
  let lastTdee = null;

  $('unit-metric').addEventListener('click', () => setUnit('metric'));
  $('unit-imperial').addEventListener('click', () => setUnit('imperial'));

  function setUnit(u){
    if(u === unit) return;
    if(u === 'imperial' && unit === 'metric'){
      const heightCm = parseFloat($('height-cm').value);
      const weightKg = parseFloat($('weight-kg').value);
      const goalKg = parseFloat($('goal-kg').value);
      if(!isNaN(heightCm)){
        const totalIn = heightCm / 2.54;
        $('height-ft').value = Math.floor(totalIn / 12);
        $('height-in').value = Math.round(totalIn % 12);
      }
      if(!isNaN(weightKg)) $('weight-lb').value = Math.round(weightKg * 2.20462);
      if(!isNaN(goalKg)) $('goal-lb').value = Math.round(goalKg * 2.20462);
    } else if(u === 'metric' && unit === 'imperial'){
      const ft = parseFloat($('height-ft').value) || 0;
      const inch = parseFloat($('height-in').value) || 0;
      const weightLb = parseFloat($('weight-lb').value);
      const goalLb = parseFloat($('goal-lb').value);
      if(ft || inch) $('height-cm').value = Math.round((ft*12 + inch) * 2.54);
      if(!isNaN(weightLb)) $('weight-kg').value = Math.round(weightLb / 2.20462);
      if(!isNaN(goalLb)) $('goal-kg').value = Math.round(goalLb / 2.20462);
    }
    unit = u;
    $('unit-metric').classList.toggle('active', u==='metric');
    $('unit-imperial').classList.toggle('active', u==='imperial');
    $('height-metric-field').style.display = u==='metric' ? 'flex' : 'none';
    $('height-imperial-field').style.display = u==='imperial' ? 'flex' : 'none';
    $('weight-metric-field').style.display = u==='metric' ? 'flex' : 'none';
    $('weight-imperial-field').style.display = u==='imperial' ? 'flex' : 'none';
    $('goal-metric-field').style.display = u==='metric' ? 'flex' : 'none';
    $('goal-imperial-field').style.display = u==='imperial' ? 'flex' : 'none';
  }

  const dDefault = new Date();
  dDefault.setDate(dDefault.getDate() + 84);
  $('target-date').value = dDefault.toISOString().split('T')[0];

  function bmiCategory(bmi){
    if(bmi < 18.5) return 'Underweight';
    if(bmi < 25) return 'Healthy range';
    if(bmi < 30) return 'Above range';
    return 'Well above range';
  }

  $('calc-btn').addEventListener('click', () => {
    const err = $('error-msg');
    err.style.display = 'none';

    const sex = $('sex').value;
    const age = parseFloat($('age').value);

    let heightCm, weightKg, goalKg;
    if(unit === 'metric'){
      heightCm = parseFloat($('height-cm').value);
      weightKg = parseFloat($('weight-kg').value);
      goalKg = parseFloat($('goal-kg').value);
    } else {
      const ft = parseFloat($('height-ft').value) || 0;
      const inch = parseFloat($('height-in').value) || 0;
      heightCm = (ft*12 + inch) * 2.54;
      weightKg = parseFloat($('weight-lb').value) / 2.20462;
      goalKg = parseFloat($('goal-lb').value) / 2.20462;
    }

    const activity = parseFloat($('activity').value);
    const targetDate = new Date($('target-date').value + 'T00:00:00');
    const today = new Date(); today.setHours(0,0,0,0);
    const days = Math.round((targetDate - today) / 86400000);

    if(!heightCm || !weightKg || !goalKg || !age || isNaN(days)){
      err.textContent = 'Fill in every field to run the numbers.';
      err.style.display = 'block';
      return;
    }
    if(days <= 0){
      err.textContent = 'Pick a goal date that\'s in the future.';
      err.style.display = 'block';
      return;
    }
    if(goalKg <= weightKg){
      err.textContent = 'Goal weight should be higher than your current weight — this calculator is built for gaining.';
      err.style.display = 'block';
      return;
    }

    let bmr;
    if(sex === 'male') bmr = 10*weightKg + 6.25*heightCm - 5*age + 5;
    else if(sex === 'female') bmr = 10*weightKg + 6.25*heightCm - 5*age - 161;
    else bmr = 10*weightKg + 6.25*heightCm - 5*age - 78;

    const tdee = bmr * activity;
    const kgToGain = goalKg - weightKg;
    const totalKcalNeeded = kgToGain * 7700;
    const dailySurplus = totalKcalNeeded / days;
    const dailyTarget = tdee + dailySurplus;

    const heightM = heightCm / 100;
    const bmiStart = weightKg / (heightM*heightM);
    const bmiEnd = goalKg / (heightM*heightM);

    const weeklyGainKg = kgToGain / (days/7);
    const weeklyPctBodyweight = (weeklyGainKg / weightKg) * 100;

    $('daily-cal').textContent = Math.round(dailyTarget).toLocaleString();
    $('surplus-amt').textContent = Math.round(dailySurplus).toLocaleString();
    $('tdee-val').textContent = Math.round(tdee).toLocaleString() + ' kcal';
    $('days-val').textContent = days + ' days';
    $('gain-val').textContent = unit === 'metric'
      ? kgToGain.toFixed(1) + ' kg'
      : (kgToGain*2.20462).toFixed(1) + ' lb';
    $('weekly-val').textContent = unit === 'metric'
      ? weeklyGainKg.toFixed(2) + ' kg/wk'
      : (weeklyGainKg*2.20462).toFixed(2) + ' lb/wk';

    $('bmi-start').textContent = bmiStart.toFixed(1);
    $('bmi-start-cat').textContent = bmiCategory(bmiStart);
    $('bmi-end').textContent = bmiEnd.toFixed(1);
    $('bmi-end-cat').textContent = bmiCategory(bmiEnd);

    const paceClamped = Math.max(0, Math.min(weeklyPctBodyweight, 1.2));
    const pacePct = (paceClamped / 1.2) * 100;
    $('pace-fill').style.width = pacePct + '%';
    $('pace-fill').style.background = weeklyPctBodyweight > 0.7 ? 'var(--rust)' : (weeklyPctBodyweight > 0.4 ? 'var(--brass)' : 'var(--green)');

    let paceNote;
    if(weeklyPctBodyweight <= 0.25){
      paceNote = `A gentle, easy-to-sustain pace (~${weeklyPctBodyweight.toFixed(2)}% bodyweight/week).`;
    } else if(weeklyPctBodyweight <= 0.5){
      paceNote = `A steady, comfortable pace for putting on weight (~${weeklyPctBodyweight.toFixed(2)}% bodyweight/week).`;
    } else if(weeklyPctBodyweight <= 1){
      paceNote = `A fast pace (~${weeklyPctBodyweight.toFixed(2)}% bodyweight/week). That's a big daily surplus to eat consistently — doable, but it'll take real appetite.`;
    } else {
      paceNote = `A very aggressive pace (~${weeklyPctBodyweight.toFixed(2)}% bodyweight/week) — this is a large surplus. Worth a quick check-in with a doctor, since gaining this fast can strain things like blood pressure and joints along the way.`;
    }
    $('pace-note').textContent = paceNote;

    lastDailyTarget = dailyTarget;
    lastTdee = tdee;

    $('results').style.display = 'block';
    $('results').scrollIntoView({behavior:'smooth', block:'start'});
  });

  function mapsSearch(query, lat, lng){
    if(lat && lng) return `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},13z`;
    return `https://www.google.com/maps/search/${encodeURIComponent(query + ' near me')}`;
  }
  function setupShopLink(id, query){
    const elLink = $(id);
    elLink.href = mapsSearch(query);
    elLink.addEventListener('click', (e) => {
      if(elLink.dataset.located) return;
      e.preventDefault();
      if(!navigator.geolocation){
        window.open(mapsSearch(query), '_blank');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => {
          const url = mapsSearch(query, pos.coords.latitude, pos.coords.longitude);
          document.querySelectorAll('.shop-btn').forEach(b => b.dataset.located = '1');
          $('link-grocery').href = mapsSearch('grocery store', pos.coords.latitude, pos.coords.longitude);
          $('link-bulk').href = mapsSearch('bulk warehouse grocery store', pos.coords.latitude, pos.coords.longitude);
          $('link-supplement').href = mapsSearch('bakery dessert shop', pos.coords.latitude, pos.coords.longitude);
          $('geo-note').textContent = 'Using your location — click again to open the map.';
          window.open(url, '_blank');
        },
        () => {
          window.open(mapsSearch(query), '_blank');
          $('geo-note').textContent = 'Location wasn\'t available, so these open a general search instead.';
        }
      );
    });
  }
  setupShopLink('link-grocery', 'grocery store');
  setupShopLink('link-bulk', 'bulk warehouse grocery store');
  setupShopLink('link-supplement', 'bakery dessert shop');

  /* =========================================================
     PART 2 — TRACKER (Today / Log food / Projection / History)
     ========================================================= */
  const KCAL_PER_LB = 3500;
  const KJ_PER_KCAL = 4.184;
  const SEGMENTS = 10;
  const STORAGE_PREFIX = 'stackTracker_';
  let currentUnit = 'kcal';

  const INGREDIENTS = [
    { name: 'Chicken breast, cooked', kcal100: 165 },
    { name: 'Chicken thigh, cooked', kcal100: 209 },
    { name: 'Chicken, roasted with skin', kcal100: 239 },
    { name: 'Turkey breast, cooked', kcal100: 135 },
    { name: 'Ground beef 80/20, cooked', kcal100: 254 },
    { name: 'Ground beef 90/10, cooked', kcal100: 176 },
    { name: 'Beef steak (sirloin), cooked', kcal100: 206 },
    { name: 'Pork chop, cooked', kcal100: 231 },
    { name: 'Bacon, cooked', kcal100: 541 },
    { name: 'Ham', kcal100: 145 },
    { name: 'Sausage, pork', kcal100: 301 },
    { name: 'Salmon, cooked', kcal100: 208 },
    { name: 'Tuna, canned in water', kcal100: 116 },
    { name: 'Tuna, canned in oil', kcal100: 189 },
    { name: 'Shrimp, cooked', kcal100: 99 },
    { name: 'Cod, cooked', kcal100: 105 },
    { name: 'Tilapia, cooked', kcal100: 128 },
    { name: 'Sardines, canned in oil', kcal100: 208 },
    { name: 'Egg, whole', kcal100: 155 },
    { name: 'Egg white', kcal100: 52 },
    { name: 'Egg yolk', kcal100: 322 },
    { name: 'Whole milk', kcal100: 61 },
    { name: 'Skim milk', kcal100: 34 },
    { name: '2% milk', kcal100: 50 },
    { name: 'Greek yogurt, whole milk', kcal100: 97 },
    { name: 'Greek yogurt, nonfat', kcal100: 59 },
    { name: 'Yogurt, plain regular', kcal100: 61 },
    { name: 'Cottage cheese', kcal100: 98 },
    { name: 'Cheddar cheese', kcal100: 403 },
    { name: 'Mozzarella cheese', kcal100: 280 },
    { name: 'Parmesan cheese', kcal100: 431 },
    { name: 'Cream cheese', kcal100: 342 },
    { name: 'Butter', kcal100: 717 },
    { name: 'Sour cream', kcal100: 198 },
    { name: 'Heavy cream', kcal100: 340 },
    { name: 'Ice cream', kcal100: 207 },
    { name: 'Tofu, firm', kcal100: 144 },
    { name: 'Tempeh', kcal100: 192 },
    { name: 'Black beans, cooked', kcal100: 132 },
    { name: 'Kidney beans, cooked', kcal100: 127 },
    { name: 'Chickpeas, cooked', kcal100: 164 },
    { name: 'Lentils, cooked', kcal100: 116 },
    { name: 'Edamame', kcal100: 121 },
    { name: 'Whey protein powder', kcal100: 400 },
    { name: 'Peanut butter', kcal100: 588 },
    { name: 'Almond butter', kcal100: 614 },
    { name: 'Hummus', kcal100: 166 },
    { name: 'White rice, cooked', kcal100: 130 },
    { name: 'Brown rice, cooked', kcal100: 123 },
    { name: 'Quinoa, cooked', kcal100: 120 },
    { name: 'Pasta, cooked', kcal100: 131 },
    { name: 'White bread', kcal100: 265 },
    { name: 'Whole wheat bread', kcal100: 247 },
    { name: 'Bagel', kcal100: 250 },
    { name: 'Flour tortilla', kcal100: 310 },
    { name: 'Corn tortilla', kcal100: 218 },
    { name: 'Rolled oats, dry', kcal100: 389 },
    { name: 'Cornflakes', kcal100: 357 },
    { name: 'Granola', kcal100: 471 },
    { name: 'Couscous, cooked', kcal100: 112 },
    { name: 'Potato, boiled', kcal100: 87 },
    { name: 'Sweet potato, cooked', kcal100: 90 },
    { name: 'Corn, cooked', kcal100: 96 },
    { name: 'Broccoli', kcal100: 35 },
    { name: 'Spinach', kcal100: 23 },
    { name: 'Carrots', kcal100: 41 },
    { name: 'Bell pepper', kcal100: 31 },
    { name: 'Tomato', kcal100: 18 },
    { name: 'Cucumber', kcal100: 15 },
    { name: 'Lettuce', kcal100: 15 },
    { name: 'Onion', kcal100: 40 },
    { name: 'Zucchini', kcal100: 17 },
    { name: 'Mushrooms', kcal100: 22 },
    { name: 'Cauliflower', kcal100: 25 },
    { name: 'Green beans', kcal100: 31 },
    { name: 'Asparagus', kcal100: 20 },
    { name: 'Kale', kcal100: 49 },
    { name: 'Banana', kcal100: 89 },
    { name: 'Apple', kcal100: 52 },
    { name: 'Orange', kcal100: 47 },
    { name: 'Grapes', kcal100: 69 },
    { name: 'Strawberries', kcal100: 32 },
    { name: 'Blueberries', kcal100: 57 },
    { name: 'Pineapple', kcal100: 50 },
    { name: 'Mango', kcal100: 60 },
    { name: 'Watermelon', kcal100: 30 },
    { name: 'Avocado', kcal100: 160 },
    { name: 'Dried fruit (raisins etc.)', kcal100: 299 },
    { name: 'Dates, dried', kcal100: 282 },
    { name: 'Almonds', kcal100: 579 },
    { name: 'Walnuts', kcal100: 654 },
    { name: 'Cashews', kcal100: 553 },
    { name: 'Peanuts', kcal100: 567 },
    { name: 'Mixed nuts', kcal100: 607 },
    { name: 'Chia seeds', kcal100: 486 },
    { name: 'Flaxseed', kcal100: 534 },
    { name: 'Olive oil', kcal100: 884 },
    { name: 'Vegetable oil', kcal100: 884 },
    { name: 'Coconut oil', kcal100: 862 },
    { name: 'Honey', kcal100: 304 },
    { name: 'Maple syrup', kcal100: 260 },
    { name: 'White sugar', kcal100: 387 },
    { name: 'Dark chocolate', kcal100: 546 },
    { name: 'Milk chocolate', kcal100: 535 },
    { name: 'Croissant / pastry', kcal100: 406 },
    { name: 'Doughnut', kcal100: 452 },
    { name: 'Chocolate chip cookie', kcal100: 488 },
    { name: 'Muffin', kcal100: 377 },
    { name: 'Potato chips', kcal100: 536 },
    { name: 'Tortilla chips', kcal100: 490 },
    { name: 'Pretzels', kcal100: 380 },
    { name: 'Popcorn, air-popped', kcal100: 387 },
    { name: 'Crackers', kcal100: 421 },
    { name: 'French fries', kcal100: 312 },
    { name: 'Fried chicken', kcal100: 260 },
    { name: 'Pizza, cheese', kcal100: 266 },
    { name: 'Cheeseburger, fast food generic', kcal100: 295 },
    { name: 'Hot dog with bun', kcal100: 290 },
    { name: 'Fish and chips', kcal100: 230 },
    { name: 'Mac and cheese', kcal100: 164 },
    { name: 'Fried rice', kcal100: 163 },
    { name: 'Ramen noodles, cooked', kcal100: 188 },
    { name: 'Sushi, mixed rolls', kcal100: 145 },
    { name: 'Burrito, meat and rice', kcal100: 210 },
    { name: 'Taco, beef', kcal100: 226 },
    { name: 'Falafel', kcal100: 333 },
    { name: 'Spring roll, fried', kcal100: 230 },
    { name: 'Orange juice', kcal100: 45 },
    { name: 'Apple juice', kcal100: 46 },
    { name: 'Soda (cola)', kcal100: 42 },
    { name: 'Beer', kcal100: 43 },
    { name: 'Wine, red', kcal100: 85 },
    { name: 'Whole milk latte', kcal100: 55 },
    { name: 'Protein shake, ready-to-drink', kcal100: 60 },
    { name: 'Energy drink', kcal100: 45 },
    { name: 'Ketchup', kcal100: 101 },
    { name: 'Mayonnaise', kcal100: 680 },
    { name: 'Mustard', kcal100: 66 },
    { name: 'Ranch dressing', kcal100: 460 },
    { name: 'BBQ sauce', kcal100: 172 },
    { name: 'Soy sauce', kcal100: 53 },
    { name: 'Salsa', kcal100: 36 },
    { name: 'Guacamole', kcal100: 150 },
    { name: 'Tomato sauce / marinara', kcal100: 45 },
    { name: 'Alfredo sauce', kcal100: 200 },
    { name: 'Coconut milk, canned', kcal100: 230 },
    { name: 'Almond milk, unsweetened', kcal100: 15 },
    { name: 'Soy milk', kcal100: 33 },
    { name: 'Protein bar', kcal100: 380 },
    { name: 'Trail mix', kcal100: 462 }
  ];

  const REFERENCE_WEIGHTS = {
    'egg, whole': '1 egg ≈ 50g',
    'banana': '1 medium ≈ 120g',
    'apple': '1 medium ≈ 180g',
    'orange': '1 medium ≈ 130g',
    'avocado': '1 medium ≈ 200g',
    'potato, boiled': '1 medium ≈ 170g',
    'sweet potato, cooked': '1 medium ≈ 150g',
    'tomato': '1 medium ≈ 120g',
    'onion': '1 medium ≈ 110g',
    'bagel': '1 bagel ≈ 100g'
  };

  function todayKey(d){ d = d || new Date(); return d.toISOString().slice(0,10); }
  function fmtDate(d){ return d.toLocaleDateString(undefined, { weekday:'short', month:'short', day:'numeric' }); }
  function dayLabel(d){ return d.toLocaleDateString(undefined, { weekday:'short' }).slice(0,3); }
  function escapeHtml(str){ const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }

  let settings = { targetCalories: null, maintenanceCalories: null };
  let entries = [];
  let historyTotals = {};
  let historyHasData = {};
  let builderItems = [];

  const el = {
    settingsBtn: $('settingsBtn'),
    settingsModal: $('settingsModal'),
    transferNote: $('transferNote'),
    targetInput: $('targetInput'),
    maintInput: $('maintInput'),
    saveSettings: $('saveSettings'),
    cancelSettings: $('cancelSettings'),
    remainingValue: $('remainingValue'),
    remainingLabel: $('remainingLabel'),
    eatenStat: $('eatenStat'),
    goalStat: $('goalStat'),
    goalCaption: $('goalCaption'),
    gauge: $('gauge'),
    entryCountTag: $('entryCountTag'),
    foodName: $('foodName'),
    foodCals: $('foodCals'),
    foodQty: $('foodQty'),
    unitToggle: $('unitToggle'),
    kjHint: $('kjHint'),
    addFoodBtn: $('addFoodBtn'),
    foodList: $('foodList'),
    tabManualBtn: $('tabManualBtn'),
    tabIngredientsBtn: $('tabIngredientsBtn'),
    panelManual: $('panelManual'),
    panelIngredients: $('panelIngredients'),
    ingredientInput: $('ingredientInput'),
    ingredientList: $('ingredientList'),
    ingredientGrams: $('ingredientGrams'),
    addIngredientBtn: $('addIngredientBtn'),
    ingredientError: $('ingredientError'),
    builderList: $('builderList'),
    builderTotal: $('builderTotal'),
    builderTotalNum: $('builderTotalNum'),
    logMealRow: $('logMealRow'),
    mealNameInput: $('mealNameInput'),
    logMealBtn: $('logMealBtn'),
    weekProj: $('weekProj'),
    monthProj: $('monthProj'),
    projNote: $('projNote'),
    historyRow: $('historyRow'),
    weekTotalStat: $('weekTotalStat'),
    weekAvgStat: $('weekAvgStat'),
    weekAvgProjWeek: $('weekAvgProjWeek'),
    weekAvgProjMonth: $('weekAvgProjMonth'),
    weekAvgNote: $('weekAvgNote'),
  };

  async function loadSettings(){
    try{
      const raw = localStorage.getItem(STORAGE_PREFIX + 'settings');
      if(raw){ settings = JSON.parse(raw); }
    }catch(e){ /* no settings saved yet, or storage unavailable */ }
  }
  async function saveSettingsToStorage(){
    try{ localStorage.setItem(STORAGE_PREFIX + 'settings', JSON.stringify(settings)); }
    catch(e){ console.error('Failed to save settings', e); }
  }
  async function loadEntries(){
    const key = STORAGE_PREFIX + 'entries:' + todayKey();
    try{
      const raw = localStorage.getItem(key);
      entries = raw ? JSON.parse(raw) : [];
    }catch(e){ entries = []; }
  }
  async function saveEntries(){
    const key = STORAGE_PREFIX + 'entries:' + todayKey();
    try{ localStorage.setItem(key, JSON.stringify(entries)); }
    catch(e){ console.error('Failed to save entries', e); }
  }
  async function loadHistory(){
    historyTotals = {};
    historyHasData = {};
    const days = [];
    for(let i=0;i<7;i++){
      const d = new Date();
      d.setDate(d.getDate()-i);
      days.push(d);
    }
    for(const d of days){
      const key = STORAGE_PREFIX + 'entries:' + todayKey(d);
      try{
        const raw = localStorage.getItem(key);
        const list = raw ? JSON.parse(raw) : [];
        historyTotals[todayKey(d)] = list.reduce(function(s,i){ return s+Number(i.calories||0); },0);
        historyHasData[todayKey(d)] = list.length > 0;
      }catch(e){
        historyTotals[todayKey(d)] = 0;
        historyHasData[todayKey(d)] = false;
      }
    }
    renderHistory(days);
    renderWeekStats(days);
  }

  function renderWeekStats(days){
    const weekTotal = Object.values(historyTotals).reduce(function(a,b){ return a+b; }, 0);
    const daysWithData = days.filter(function(d){ return historyHasData[todayKey(d)]; }).length;
    const weekAvg = daysWithData > 0 ? Math.round(weekTotal / daysWithData) : 0;

    el.weekTotalStat.textContent = weekTotal + ' kcal';
    el.weekAvgStat.textContent = daysWithData > 0
      ? (weekAvg + ' kcal/day (' + daysWithData + ' day' + (daysWithData===1?'':'s') + ' logged)')
      : 'No days logged yet this week';

    const target = settings.targetCalories;
    const maintenance = settings.maintenanceCalories;
    const usingMaintenance = (maintenance !== null && maintenance !== undefined && maintenance !== '');
    const baseline = usingMaintenance ? Number(maintenance) : target;

    if(daysWithData === 0 || !baseline){
      el.weekAvgProjWeek.innerHTML = '—';
      el.weekAvgProjMonth.innerHTML = '—';
      el.weekAvgNote.textContent = daysWithData === 0
        ? 'Log at least one day this week to see your average and a projection based on it.'
        : 'Set your daily calorie goal to see a projection based on your weekly average.';
      return;
    }

    const surplus = weekAvg - baseline;
    const weekLb = (surplus * 7) / KCAL_PER_LB;
    const monthLb = (surplus * 30) / KCAL_PER_LB;
    function sign(v){ return v >= 0 ? '+' : '\u2212'; }
    el.weekAvgProjWeek.innerHTML = sign(weekLb) + Math.abs(weekLb).toFixed(1) + '<span> lb</span>';
    el.weekAvgProjMonth.innerHTML = sign(monthLb) + Math.abs(monthLb).toFixed(1) + '<span> lb</span>';

    let note = 'Based on averaging ' + weekAvg + ' kcal/day over the ' + daysWithData + ' day' + (daysWithData===1?'':'s') + ' you\'ve logged this week, against a baseline of ' + baseline + ' kcal';
    note += usingMaintenance ? ' (your maintenance calories).' : ' (your daily goal).';
    el.weekAvgNote.textContent = note;
  }

  function renderHistory(days){
    el.historyRow.innerHTML = '';
    const target = settings.targetCalories || 1;
    const vals = Object.values(historyTotals);
    const maxVal = Math.max(target, vals.length ? Math.max.apply(null, vals) : 0, 1);
    days.slice().reverse().forEach(function(d){
      const key = todayKey(d);
      const total = historyTotals[key] || 0;
      const pct = Math.min(100, (total/maxVal)*100);
      const over = settings.targetCalories && total > settings.targetCalories;
      const col = document.createElement('div');
      col.className = 'hist-col';
      col.innerHTML =
        '<div class="hist-bar-track"><div class="hist-bar-fill ' + (over?'over':'') + '" style="height:' + pct + '%"></div></div>' +
        '<div class="hist-label">' + dayLabel(d) + '</div>';
      el.historyRow.appendChild(col);
    });
  }

  function totalEaten(){
    return entries.reduce(function(s,i){ return s+Number(i.calories||0); }, 0);
  }

  function renderGauge(eaten, target){
    el.gauge.innerHTML = '';
    if(!target){ return; }
    const filledSegs = Math.min(SEGMENTS, Math.round((eaten/target)*SEGMENTS));
    const overflowSegs = eaten > target ? Math.min(SEGMENTS, Math.round(((eaten-target)/target)*SEGMENTS)) : 0;
    for(let i=0;i<SEGMENTS;i++){
      const seg = document.createElement('div');
      let cls = 'seg';
      if(overflowSegs > 0 && i >= SEGMENTS-overflowSegs){ cls += ' over'; }
      else if(i < filledSegs){ cls += ' filled'; }
      if(i === SEGMENTS-1){ cls += ' goal-line'; }
      seg.className = cls;
      el.gauge.appendChild(seg);
    }
  }

  function renderFoodList(){
    if(entries.length === 0){
      el.foodList.innerHTML = '<div class="empty-note">Nothing logged yet today — add your first item above.</div>';
      el.entryCountTag.textContent = '0 items';
      return;
    }
    el.entryCountTag.textContent = entries.length + (entries.length===1 ? ' item' : ' items');
    el.foodList.innerHTML = '';
    entries.forEach(function(item){
      const row = document.createElement('div');
      row.className = 'log-item';
      row.innerHTML =
        '<div class="log-name">' + escapeHtml(item.name) + '</div>' +
        '<div class="log-right"><div class="log-cal">' + item.calories + ' kcal</div>' +
        '<button class="del-btn" data-id="' + item.id + '" aria-label="Remove ' + escapeHtml(item.name) + '">\u2715</button></div>';
      el.foodList.appendChild(row);
    });
    el.foodList.querySelectorAll('.del-btn').forEach(function(btn){
      btn.addEventListener('click', async function(){
        entries = entries.filter(function(e){ return e.id !== btn.dataset.id; });
        await saveEntries();
        renderAll();
        loadHistory();
      });
    });
  }

  function renderProjection(eaten){
    const target = settings.targetCalories;
    const maintenance = settings.maintenanceCalories;
    const baseline = (maintenance !== null && maintenance !== undefined && maintenance !== '') ? Number(maintenance) : target;
    if(!baseline){
      el.weekProj.innerHTML = '—';
      el.monthProj.innerHTML = '—';
      el.projNote.textContent = 'Set your daily calorie goal to see projections.';
      return;
    }
    const surplus = eaten - baseline;
    const weekLb = (surplus * 7) / KCAL_PER_LB;
    const monthLb = (surplus * 30) / KCAL_PER_LB;
    function sign(v){ return v >= 0 ? '+' : '\u2212'; }
    el.weekProj.innerHTML = sign(weekLb) + Math.abs(weekLb).toFixed(1) + '<span> lb</span>';
    el.monthProj.innerHTML = sign(monthLb) + Math.abs(monthLb).toFixed(1) + '<span> lb</span>';

    const usingMaintenance = (maintenance !== null && maintenance !== undefined && maintenance !== '');
    let note = 'Estimate based on eating ' + eaten + ' kcal every day, against a baseline of ' + baseline + ' kcal';
    note += usingMaintenance ? ' (your maintenance calories).' : ' (your daily goal — set maintenance calories for a more precise projection).';
    note += ' Uses the common approximation that ~3,500 kcal surplus \u2248 1 lb gained; actual results vary by person.';
    el.projNote.innerHTML = note + (usingMaintenance ? '' : ' <button id="openSettingsFromNote">Set maintenance calories</button>');
    const noteBtn = document.getElementById('openSettingsFromNote');
    if(noteBtn){ noteBtn.addEventListener('click', openSettings); }
  }

  function renderAll(){
    const eaten = totalEaten();
    const target = settings.targetCalories || 0;
    const remaining = target - eaten;
    el.eatenStat.textContent = eaten;
    el.goalStat.textContent = target || '—';
    el.goalCaption.textContent = 'Goal: ' + (target || '—');
    if(remaining >= 0){
      el.remainingValue.innerHTML = remaining + '<span class="unit">kcal</span>';
      el.remainingValue.classList.remove('over');
      el.remainingLabel.textContent = 'Calories remaining';
    } else {
      el.remainingValue.innerHTML = Math.abs(remaining) + '<span class="unit">kcal over</span>';
      el.remainingValue.classList.add('over');
      el.remainingLabel.textContent = 'Past your goal by';
    }
    renderGauge(eaten, target);
    renderFoodList();
    renderProjection(eaten);
  }

  function openSettings(){
    el.targetInput.value = settings.targetCalories || '';
    el.maintInput.value = settings.maintenanceCalories || '';
    el.settingsModal.classList.add('open');
    el.targetInput.focus();
  }
  function closeSettings(){ el.settingsModal.classList.remove('open'); }

  el.settingsBtn.addEventListener('click', openSettings);
  el.cancelSettings.addEventListener('click', closeSettings);
  el.settingsModal.addEventListener('click', function(e){ if(e.target === el.settingsModal) closeSettings(); });

  el.saveSettings.addEventListener('click', async function(){
    const t = Number(el.targetInput.value);
    const m = el.maintInput.value === '' ? null : Number(el.maintInput.value);
    settings.targetCalories = t > 0 ? t : null;
    settings.maintenanceCalories = m;
    await saveSettingsToStorage();
    closeSettings();
    renderAll();
    loadHistory();
  });

  // --- Direct hand-off from the Calculator above (same page, no navigation needed) ---
  async function applyCalculatorNumbers(goal, maint){
    settings.targetCalories = goal;
    settings.maintenanceCalories = maint;
    await saveSettingsToStorage();
    renderAll();
    loadHistory();
    el.transferNote.textContent = 'Loaded from your calculator — goal set to ' + goal + ' kcal/day, maintenance ' + maint + ' kcal/day.';
    el.transferNote.style.display = '';
  }
  $('send-to-tracker-btn').addEventListener('click', function(){
    if(lastDailyTarget == null) return;
    applyCalculatorNumbers(Math.round(lastDailyTarget), Math.round(lastTdee));
  });

  // --- Tabs ---
  function setTab(tab){
    el.tabManualBtn.classList.toggle('active', tab === 'manual');
    el.tabIngredientsBtn.classList.toggle('active', tab === 'ingredients');
    el.panelManual.style.display = tab === 'manual' ? '' : 'none';
    el.panelIngredients.style.display = tab === 'ingredients' ? '' : 'none';
  }
  el.tabManualBtn.addEventListener('click', function(){ setTab('manual'); });
  el.tabIngredientsBtn.addEventListener('click', function(){ setTab('ingredients'); });

  // --- Manual entry (kcal/kJ + qty) ---
  el.unitToggle.querySelectorAll('.unit-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      currentUnit = btn.dataset.unit;
      el.unitToggle.querySelectorAll('.unit-btn').forEach(function(b){ b.classList.toggle('active', b === btn); });
      el.foodCals.placeholder = currentUnit;
      el.kjHint.style.display = currentUnit === 'kJ' ? '' : 'none';
    });
  });

  el.addFoodBtn.addEventListener('click', addFood);
  el.foodCals.addEventListener('keydown', function(e){ if(e.key === 'Enter') addFood(); });
  el.foodName.addEventListener('keydown', function(e){ if(e.key === 'Enter') addFood(); });

  async function addFood(){
    const name = el.foodName.value.trim();
    const rawAmount = Number(el.foodCals.value);
    const qty = Math.max(1, Math.round(Number(el.foodQty.value)) || 1);
    if(!name || !rawAmount || rawAmount <= 0){
      if(!name){ el.foodName.focus(); } else { el.foodCals.focus(); }
      return;
    }
    const perServingKcal = currentUnit === 'kJ' ? rawAmount / KJ_PER_KCAL : rawAmount;
    const totalKcal = Math.round(perServingKcal * qty);
    const displayName = qty > 1 ? (name + ' (\u00d7' + qty + ')') : name;
    entries.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,6), name: displayName, calories: totalKcal });
    el.foodName.value = '';
    el.foodCals.value = '';
    el.foodQty.value = '1';
    el.foodName.focus();
    await saveEntries();
    renderAll();
    loadHistory();
  }

  // --- Ingredient builder ---
  function populateIngredientList(){
    el.ingredientList.innerHTML = INGREDIENTS.map(function(i){
      return '<option value="' + escapeHtml(i.name) + '">';
    }).join('');
  }
  populateIngredientList();

  el.ingredientInput.addEventListener('input', function(){
    const key = el.ingredientInput.value.trim().toLowerCase();
    const ref = REFERENCE_WEIGHTS[key];
    el.ingredientHint.textContent = ref
      ? ('Typical: ' + ref + '. Values are per-100g averages — real products vary.')
      : '150 built-in ingredients, typical per-100g averages — real products vary, so treat totals as a solid ballpark.';
  });

  function findIngredient(text){
    const key = text.trim().toLowerCase();
    return INGREDIENTS.find(function(i){ return i.name.toLowerCase() === key; });
  }

  el.addIngredientBtn.addEventListener('click', addIngredientToBuilder);
  el.ingredientGrams.addEventListener('keydown', function(e){ if(e.key === 'Enter') addIngredientToBuilder(); });
  el.ingredientInput.addEventListener('keydown', function(e){ if(e.key === 'Enter'){ e.preventDefault(); el.ingredientGrams.focus(); } });

  function addIngredientToBuilder(){
    const ing = findIngredient(el.ingredientInput.value);
    const grams = Number(el.ingredientGrams.value);
    if(!ing){
      el.ingredientError.style.display = '';
      el.ingredientInput.focus();
      return;
    }
    el.ingredientError.style.display = 'none';
    if(!grams || grams <= 0){ el.ingredientGrams.focus(); return; }
    const kcal = Math.round(ing.kcal100 * grams / 100);
    builderItems.push({ name: ing.name, grams: grams, kcal: kcal });
    el.ingredientInput.value = '';
    el.ingredientGrams.value = '';
    el.ingredientInput.focus();
    renderBuilder();
  }

  function renderBuilder(){
    if(builderItems.length === 0){
      el.builderList.innerHTML = '';
      el.builderTotal.style.display = 'none';
      el.logMealRow.style.display = 'none';
      return;
    }
    el.builderList.innerHTML = '';
    let total = 0;
    builderItems.forEach(function(item, idx){
      total += item.kcal;
      const row = document.createElement('div');
      row.className = 'builder-row';
      row.innerHTML =
        '<div><span class="bname">' + escapeHtml(item.name) + '</span><span class="bgrams">' + item.grams + 'g</span></div>' +
        '<div class="bright"><span class="bcal">' + item.kcal + ' kcal</span>' +
        '<button class="del-btn" data-idx="' + idx + '" aria-label="Remove">\u2715</button></div>';
      el.builderList.appendChild(row);
    });
    el.builderList.querySelectorAll('.del-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        builderItems.splice(Number(btn.dataset.idx), 1);
        renderBuilder();
      });
    });
    el.builderTotalNum.textContent = total + ' kcal';
    el.builderTotal.style.display = '';
    el.logMealRow.style.display = '';
  }

  el.logMealBtn.addEventListener('click', async function(){
    if(builderItems.length === 0) return;
    const total = builderItems.reduce(function(s,i){ return s + i.kcal; }, 0);
    const customName = el.mealNameInput.value.trim();
    const name = customName || ('Custom meal (' + builderItems.length + (builderItems.length===1?' ingredient)':' ingredients)'));
    entries.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,6), name: name, calories: Math.round(total) });
    await saveEntries();
    renderAll();
    loadHistory();
    builderItems = [];
    el.mealNameInput.value = '';
    renderBuilder();
  });

  async function initTracker(){
    await loadSettings();
    await loadEntries();
    renderAll();
    await loadHistory();
  }

  initTracker();
})();

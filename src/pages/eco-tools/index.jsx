import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const DAILY_MISSION_POOL = [
  { id: 'walk-3k', label: 'Walk 3,000+ steps instead of driving', points: 15 },
  { id: 'plant-meal', label: 'Choose one plant-based meal', points: 20 },
  { id: 'reusable-bag', label: 'Use a reusable bag while shopping', points: 10 },
  { id: 'cold-wash', label: 'Wash clothes in cold water', points: 10 },
  { id: 'water-refill', label: 'Refill bottle instead of buying plastic', points: 15 },
  { id: 'power-down', label: 'Keep electronics unplugged for 2 hours', points: 10 },
  { id: 'local-food', label: 'Buy one local or seasonal item', points: 20 },
];

const ECO_SCORE_COLOR = {
  a: 'var(--color-success)',
  b: '#86efac',
  c: '#fbbf24',
  d: '#f97316',
  e: 'var(--color-error)',
};

const fetchProductFromOpenFoodFacts = async (barcode) => {
  const fields = [
    'product_name',
    'brands',
    'quantity',
    'image_front_small_url',
    'ecoscore_grade',
    'ecoscore_score',
    'nutriscore_grade',
    'carbon_footprint_from_known_ingredients_100g',
    'carbon_footprint_percent_of_known_ingredients',
    'categories_tags',
  ].join(',');

  const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json?fields=${fields}`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'EcoLife-App/1.0 (rangesh@ecolife.app)' },
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== 1 || !data.product) {
    throw new Error('Product not found in the Open Food Facts database.');
  }

  const p = data.product;
  const ecoGrade = (p.ecoscore_grade || 'unknown').toLowerCase();
  const nutriGrade = (p.nutriscore_grade || 'unknown').toLowerCase();
  const carbon = p.carbon_footprint_from_known_ingredients_100g
    ? parseFloat(p.carbon_footprint_from_known_ingredients_100g).toFixed(2)
    : null;

  return {
    name: p.product_name || 'Unknown Product',
    brand: p.brands || '',
    quantity: p.quantity || '',
    imageUrl: p.image_front_small_url || null,
    ecoScore: ecoGrade !== 'unknown' ? ecoGrade.toUpperCase() : 'N/A',
    ecoScoreRaw: ecoGrade,
    healthScore: nutriGrade !== 'unknown' ? nutriGrade.toUpperCase() : 'N/A',
    healthScoreRaw: nutriGrade,
    carbonPer100g: carbon,
    ecoScoreNum: p.ecoscore_score || null,
  };
};

const formatTodayKey = () => new Date().toISOString().slice(0, 10);

const buildDailyMissions = (dateKey) => {
  const seed = dateKey.split('-').reduce((acc, value) => acc + Number(value), 0);
  const selected = [];
  let index = seed % DAILY_MISSION_POOL.length;

  while (selected.length < 3) {
    const mission = DAILY_MISSION_POOL[index % DAILY_MISSION_POOL.length];
    if (!selected.find((item) => item.id === mission.id)) {
      selected.push(mission);
    }
    index += 2;
  }

  return selected;
};

const parseReceiptText = (rawText) => {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const items = lines.map((line) => {
    const matchedAmount = line.match(/(\d+(?:\.\d{1,2})?)$/);
    const amount = matchedAmount ? Number(matchedAmount[1]) : 0;
    const name = matchedAmount ? line.replace(matchedAmount[0], '').trim() : line;

    const lower = name.toLowerCase();
    const isPlantBased = /(lentil|beans|tofu|vegetable|fruit|oats|millet|quinoa|rice)/.test(lower);
    const isPackaged = /(chips|soda|snack|pack|bottle|processed|bar)/.test(lower);

    let carbonKg = 1.2;
    if (isPlantBased) carbonKg = 0.6;
    if (isPackaged) carbonKg = 2.0;

    return {
      name: name || 'Unknown item',
      amount,
      carbonKg,
      isPlantBased,
      isPackaged,
    };
  });

  const totalSpend = items.reduce((sum, item) => sum + item.amount, 0);
  const totalCarbon = items.reduce((sum, item) => sum + item.carbonKg, 0);
  const plantBasedCount = items.filter((item) => item.isPlantBased).length;
  const packagedCount = items.filter((item) => item.isPackaged).length;

  return {
    items,
    totalSpend,
    totalCarbon,
    sustainabilityScore: Math.max(1, Math.min(100, Math.round(100 - totalCarbon * 4 - packagedCount * 3 + plantBasedCount * 4))),
  };
};

const EcoTools = () => {
  const [todayKey, setTodayKey] = useState(formatTodayKey());
  const [completedMissions, setCompletedMissions] = useState([]);
  const [streakDays, setStreakDays] = useState(0);
  const [totalMissionPoints, setTotalMissionPoints] = useState(0);

  const [receiptInput, setReceiptInput] = useState('Spinach 4.50\nTofu Pack 3.20\nSnack Chips 2.30\nOats 3.10');
  const [receiptSummary, setReceiptSummary] = useState(null);

  const [barcodeInput, setBarcodeInput] = useState('');
  const [barcodeResult, setBarcodeResult] = useState(null);
  const [barcodeError, setBarcodeError] = useState('');
  const [barcodeLoading, setBarcodeLoading] = useState(false);

  const dailyMissions = useMemo(() => buildDailyMissions(todayKey), [todayKey]);

  useEffect(() => {
    const nowKey = formatTodayKey();
    setTodayKey(nowKey);

    const saved = localStorage.getItem('eco-tools-missions');
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (parsed.dateKey === nowKey) {
        setCompletedMissions(parsed.completedMissions || []);
      }
      setStreakDays(parsed.streakDays || 0);
      setTotalMissionPoints(parsed.totalMissionPoints || 0);
    } catch {
      // Ignore corrupted local data and keep defaults.
    }
  }, []);

  useEffect(() => {
    const payload = {
      dateKey: todayKey,
      completedMissions,
      streakDays,
      totalMissionPoints,
    };
    localStorage.setItem('eco-tools-missions', JSON.stringify(payload));
  }, [todayKey, completedMissions, streakDays, totalMissionPoints]);

  const completedAllToday = completedMissions.length === dailyMissions.length;

  const toggleMission = (missionId) => {
    const isCompleted = completedMissions.includes(missionId);
    if (isCompleted) {
      setCompletedMissions(completedMissions.filter((id) => id !== missionId));
      return;
    }

    const mission = dailyMissions.find((item) => item.id === missionId);
    if (!mission) return;

    const updated = [...completedMissions, missionId];
    setCompletedMissions(updated);
    setTotalMissionPoints((value) => value + mission.points);

    if (updated.length === dailyMissions.length) {
      setStreakDays((value) => value + 1);
    }
  };

  const analyzeReceipt = () => {
    const summary = parseReceiptText(receiptInput);
    setReceiptSummary(summary);
  };

  const lookupBarcode = async () => {
    const trimmed = barcodeInput.trim();
    if (!trimmed) {
      setBarcodeError('Please enter a barcode number.');
      return;
    }

    setBarcodeLoading(true);
    setBarcodeResult(null);
    setBarcodeError('');

    try {
      const result = await fetchProductFromOpenFoodFacts(trimmed);
      setBarcodeResult(result);
    } catch (err) {
      setBarcodeError(err.message || 'Failed to fetch product. Please try again.');
    } finally {
      setBarcodeLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Eco Tools - EcoLife</title>
        <meta
          name="description"
          content="Use EcoLife daily missions, receipt analyzer, and barcode lookup to improve sustainability habits."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 lg:px-6 py-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Eco Tools</h1>
              <p className="text-muted-foreground mt-1">
                Priority rollout: Daily Missions, Receipt Analyzer, and Barcode Lookup.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded-lg bg-success/10 border border-success/20">
                <div className="text-xs text-muted-foreground">Streak</div>
                <div className="text-lg font-bold text-success">{streakDays} days</div>
              </div>
              <div className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-xs text-muted-foreground">Eco Points</div>
                <div className="text-lg font-bold text-primary">{totalMissionPoints}</div>
              </div>
            </div>
          </div>

          <section className="bg-card border border-border rounded-xl p-6 shadow-organic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/15 flex items-center justify-center">
                <Icon name="Target" size={20} color="var(--color-success)" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold text-card-foreground">1) Personalized Daily Missions</h2>
                <p className="text-sm text-muted-foreground">Complete all three missions today to grow your streak.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {dailyMissions.map((mission) => {
                const checked = completedMissions.includes(mission.id);
                return (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() => toggleMission(mission.id)}
                    className={`text-left p-4 rounded-lg border transition-organic ${
                      checked
                        ? 'border-success bg-success/10'
                        : 'border-border bg-background hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-foreground">{mission.label}</div>
                        <div className="text-xs text-muted-foreground mt-2">+{mission.points} points</div>
                      </div>
                      <Icon
                        name={checked ? 'CheckCircle2' : 'Circle'}
                        size={20}
                        color={checked ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-sm font-medium text-foreground">
              Progress: {completedMissions.length}/{dailyMissions.length} completed
              <span className={`ml-2 ${completedAllToday ? 'text-success' : 'text-muted-foreground'}`}>
                {completedAllToday ? 'Full mission complete. Streak updated.' : 'Finish all missions to extend your streak.'}
              </span>
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-organic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Icon name="Receipt" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold text-card-foreground">2) Smart Receipt Analyzer</h2>
                <p className="text-sm text-muted-foreground">Paste receipt lines with prices. The app estimates spend and footprint instantly.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Receipt text</label>
                <textarea
                  value={receiptInput}
                  onChange={(event) => setReceiptInput(event.target.value)}
                  className="w-full min-h-40 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Example: Spinach 4.50"
                />
                <button
                  type="button"
                  onClick={analyzeReceipt}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-organic"
                >
                  <Icon name="Sparkles" size={16} />
                  Analyze receipt
                </button>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                {!receiptSummary ? (
                  <p className="text-sm text-muted-foreground">Run analysis to view summary.</p>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="p-3 rounded-md bg-muted">
                        <div className="text-muted-foreground">Items</div>
                        <div className="font-semibold text-foreground">{receiptSummary.items.length}</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted">
                        <div className="text-muted-foreground">Spend</div>
                        <div className="font-semibold text-foreground">${receiptSummary.totalSpend.toFixed(2)}</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted">
                        <div className="text-muted-foreground">CO2e</div>
                        <div className="font-semibold text-foreground">{receiptSummary.totalCarbon.toFixed(1)} kg</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-md border border-border">
                      <div className="text-sm text-muted-foreground">Sustainability score</div>
                      <div className="text-xl font-bold text-success">{receiptSummary.sustainabilityScore}/100</div>
                    </div>

                    <div className="max-h-36 overflow-auto border border-border rounded-md">
                      {receiptSummary.items.map((item, idx) => (
                        <div key={`${item.name}-${idx}`} className="px-3 py-2 border-b border-border last:border-b-0 text-sm">
                          <div className="font-medium text-foreground">{item.name}</div>
                          <div className="text-muted-foreground">
                            ${item.amount.toFixed(2)} • {item.carbonKg.toFixed(1)} kg CO2e
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 shadow-organic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Icon name="ScanLine" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold text-card-foreground">3) Barcode Product Lookup</h2>
                <p className="text-sm text-muted-foreground">
                  Enter a real barcode (EAN-13 / UPC) to fetch live data from the{' '}
                  <a
                    href="https://world.openfoodfacts.org"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-primary"
                  >
                    Open Food Facts
                  </a>{' '}
                  database.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <input
                id="barcode-input"
                value={barcodeInput}
                onChange={(event) => setBarcodeInput(event.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !barcodeLoading && lookupBarcode()}
                className="flex-1 h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. 737628064502, 5449000000996"
              />
              <button
                type="button"
                onClick={lookupBarcode}
                disabled={barcodeLoading}
                className="inline-flex items-center justify-center gap-2 px-4 h-10 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-organic disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {barcodeLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Fetching…
                  </>
                ) : (
                  <>
                    <Icon name="Search" size={16} />
                    Check product
                  </>
                )}
              </button>
            </div>

            {barcodeError && (
              <div className="mb-3 p-3 rounded-lg bg-error/10 border border-error/30 text-sm text-error flex items-start gap-2">
                <Icon name="AlertCircle" size={15} color="var(--color-error)" />
                {barcodeError}
              </div>
            )}

            {barcodeResult && (
              <div className="rounded-xl border border-border bg-background p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Product image + name */}
                <div className="flex flex-col items-center md:items-start gap-3">
                  {barcodeResult.imageUrl ? (
                    <img
                      src={barcodeResult.imageUrl}
                      alt={barcodeResult.name}
                      className="w-28 h-28 object-contain rounded-lg border border-border bg-muted"
                    />
                  ) : (
                    <div className="w-28 h-28 flex items-center justify-center rounded-lg border border-border bg-muted">
                      <Icon name="Package" size={36} color="var(--color-muted-foreground)" />
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {barcodeResult.brand || 'Unknown brand'}
                    </div>
                    <div className="text-base font-semibold text-foreground leading-tight">{barcodeResult.name}</div>
                    {barcodeResult.quantity && (
                      <div className="text-xs text-muted-foreground mt-0.5">{barcodeResult.quantity}</div>
                    )}
                  </div>
                </div>

                {/* Scores */}
                <div className="space-y-3">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Scores (live data)</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-3 rounded-lg bg-muted flex flex-col gap-1">
                      <div className="text-muted-foreground text-xs">Eco-Score</div>
                      <div
                        className="text-2xl font-bold uppercase"
                        style={{ color: ECO_SCORE_COLOR[barcodeResult.ecoScoreRaw] || 'var(--color-foreground)' }}
                      >
                        {barcodeResult.ecoScore}
                      </div>
                      {barcodeResult.ecoScoreNum !== null && (
                        <div className="text-xs text-muted-foreground">{barcodeResult.ecoScoreNum}/100</div>
                      )}
                    </div>
                    <div className="p-3 rounded-lg bg-muted flex flex-col gap-1">
                      <div className="text-muted-foreground text-xs">Nutri-Score</div>
                      <div
                        className="text-2xl font-bold uppercase"
                        style={{ color: ECO_SCORE_COLOR[barcodeResult.healthScoreRaw] || 'var(--color-foreground)' }}
                      >
                        {barcodeResult.healthScore}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted text-sm">
                    <div className="text-muted-foreground text-xs mb-1">Carbon (per 100g)</div>
                    <div className="font-semibold text-foreground">
                      {barcodeResult.carbonPer100g ? (
                        <>{barcodeResult.carbonPer100g} g CO₂e</>
                      ) : (
                        <span className="text-muted-foreground text-xs">Not available for this product</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Eco Insight */}
                <div className="p-4 rounded-lg border border-success/30 bg-success/10 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Leaf" size={15} color="var(--color-success)" />
                    <div className="text-xs font-semibold text-success uppercase tracking-wide">Eco Insight</div>
                  </div>
                  {barcodeResult.ecoScoreRaw === 'a' || barcodeResult.ecoScoreRaw === 'b' ? (
                    <p className="text-sm text-foreground">Great choice! This product has a low environmental impact.</p>
                  ) : barcodeResult.ecoScoreRaw === 'c' ? (
                    <p className="text-sm text-foreground">Moderate impact. Consider products with an Eco-Score of A or B for a greener alternative.</p>
                  ) : barcodeResult.ecoScoreRaw === 'd' || barcodeResult.ecoScoreRaw === 'e' ? (
                    <p className="text-sm text-foreground">High environmental impact. Look for plant-based or locally sourced alternatives with better scores.</p>
                  ) : (
                    <p className="text-sm text-foreground">Eco-Score data not yet available for this product. Check the Open Food Facts page for more details.</p>
                  )}
                  <a
                    href={`https://world.openfoodfacts.org/product/${barcodeInput.trim()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-1 text-xs text-primary underline"
                  >
                    View full product page
                    <Icon name="ExternalLink" size={11} />
                  </a>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default EcoTools;

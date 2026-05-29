import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const GardeningAssistant = () => {
  const [goal, setGoal] = useState('compost'); // compost, herb, vegetable
  const [space, setSpace] = useState('balcony');
  const [climate, setClimate] = useState('temperate');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateGuide = () => {
    setLoading(true);
    setResult(null);

    // Simulate AI delay
    setTimeout(() => {
      let guide = {
        title: '',
        steps: [],
        ecoImpact: '',
        difficulty: 'Easy'
      };

      if (goal === 'compost') {
        guide.title = `How to Start Composting in a ${space.charAt(0).toUpperCase() + space.slice(1)}`;
        guide.steps = [
          "Choose a bin: Since you have a " + space + ", use a small sealed compost bin or worm bin (vermicomposting).",
          "Add browns: Shredded paper, cardboard, dried leaves (carbon-rich).",
          "Add greens: Vegetable scraps, coffee grounds, fruit peels (nitrogen-rich).",
          "Keep it moist and aerated: Turn or mix every few days so it gets oxygen."
        ];
        guide.ecoImpact = 'Reduces landfill waste and cuts methane emissions.';
        guide.difficulty = 'Medium';
      } else if (goal === 'herb') {
        guide.title = `Starting an Herb Garden for a ${climate.charAt(0).toUpperCase() + climate.slice(1)} Climate`;
        guide.steps = [
          "Select herbs: Basil, mint, and chives are great starting points.",
          "Prepare containers: Make sure your pots have drainage holes.",
          "Sunlight: Place them where they get at least 6 hours of sunlight daily.",
          "Watering: Keep soil moist but not waterlogged. Mint needs more water than basil."
        ];
        guide.ecoImpact = 'Reduces transportation emissions from grocery store herbs.';
        guide.difficulty = 'Easy';
      } else {
        guide.title = `Growing Vegetables in your ${space.charAt(0).toUpperCase() + space.slice(1)}`;
        guide.steps = [
          "Choose crops: Tomatoes and peppers do well if you have full sun.",
          "Prepare soil: Use a high-quality organic potting mix.",
          "Planting: Follow the spacing guidelines on your seed packets or seedling pots.",
          "Maintenance: Water daily in summer and use organic fertilizer every 2-3 weeks."
        ];
        guide.ecoImpact = 'Lowers your carbon footprint and provides fresh, local food.';
        guide.difficulty = 'Hard';
      }

      setResult(guide);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>AI Gardening Assistant - EcoLife</title>
        <meta name="description" content="Get personalized AI advice for your gardening and composting needs." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 lg:px-6 py-8 space-y-8">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-2">
              <Icon name="Leaf" size={32} color="var(--color-success)" />
              AI Gardening & Composting Assistant
            </h1>
            <p className="text-muted-foreground mt-2">
              Tell us what you want to grow or build, and our AI will generate a personalized guide based on your space and climate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 shadow-organic h-fit">
              <h2 className="text-xl font-heading font-semibold text-card-foreground mb-4">Your Setup</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">What do you want to do?</label>
                  <select 
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="compost">Start Composting</option>
                    <option value="herb">Grow an Herb Garden</option>
                    <option value="vegetable">Grow Vegetables</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Available Space</label>
                  <select 
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="window">Window Sill (Indoor)</option>
                    <option value="balcony">Balcony / Patio</option>
                    <option value="backyard">Backyard</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Local Climate</label>
                  <select 
                    value={climate}
                    onChange={(e) => setClimate(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="temperate">Temperate (Mild seasons)</option>
                    <option value="tropical">Tropical (Hot and humid)</option>
                    <option value="arid">Arid (Dry and hot)</option>
                    <option value="cold">Cold (Short summers, long winters)</option>
                  </select>
                </div>

                <button
                  onClick={generateGuide}
                  disabled={loading}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-organic disabled:opacity-50"
                >
                  <Icon name="WandSparkles" size={16} />
                  {loading ? 'Generating...' : 'Generate AI Guide'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-2">
              {loading ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl">
                  <Icon name="Loader2" size={32} className="animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">The AI is analyzing your setup...</p>
                </div>
              ) : result ? (
                <div className="bg-card border border-border rounded-xl p-6 shadow-organic animate-slide-in-from-top">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-success/15 flex items-center justify-center">
                      <Icon name="Sprout" size={24} color="var(--color-success)" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-heading font-semibold text-card-foreground">{result.title}</h2>
                      <div className="flex gap-2 mt-1 text-xs">
                        <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full">Difficulty: {result.difficulty}</span>
                        <span className="px-2 py-1 bg-success/10 text-success rounded-full flex items-center gap-1">
                           <Icon name="Leaf" size={10} /> Eco Impact
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Step-by-Step Guide</h3>
                      <ol className="space-y-4">
                        {result.steps.map((step, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                              {idx + 1}
                            </span>
                            <span className="text-muted-foreground pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <h4 className="font-semibold text-success flex items-center gap-2 mb-1">
                        <Icon name="Globe2" size={16} /> Why this matters
                      </h4>
                      <p className="text-sm text-foreground">{result.ecoImpact}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl text-center p-6">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Icon name="Bot" size={32} color="var(--color-muted-foreground)" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ready to grow?</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Fill out the form on the left and our AI will create a step-by-step guide tailored to your specific environment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GardeningAssistant;

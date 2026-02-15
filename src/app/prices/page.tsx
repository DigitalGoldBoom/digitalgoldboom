import { Metadata } from 'next';
import Link from 'next/link';
import PriceWidget from "@/components/PriceWidget";
import BookCTA from "@/components/BookCTA";
import JsonLd from "@/components/JsonLd";
import { generateFinancialProductSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Live Gold Price & PAXG Tracker — Real-Time Data | Digital Gold Boom',
  description: 'Real-time gold prices, tokenized gold assets (PAXG, XAUT), and exclusive Baseline Intrinsic Value (BIV) calculator. Updated every 60 seconds.',
  keywords: ['gold prices', 'PAXG price', 'XAUT price', 'gold spot price', 'BIV calculator', 'tokenized gold prices', 'live gold prices'],
  alternates: {
    canonical: 'https://digitalgoldboom.com/prices',
  },
  openGraph: {
    title: 'Live Gold Price & PAXG Tracker — Real-Time Data',
    description: 'Real-time gold prices, tokenized gold assets, and exclusive BIV calculator.',
    url: 'https://digitalgoldboom.com/prices',
    type: 'website',
  },
};

export default function PricesPage() {
  return (
    <>
      <JsonLd data={generateFinancialProductSchema()} />
      
      <div className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">
              Live Gold &amp; Digital Gold Prices
            </h1>
            <p className="text-[var(--text-secondary)] max-w-2xl">
              Real-time prices for physical gold and the major tokenized gold assets.
              Data updates every 60 seconds. Click any asset for historical charts and analysis.
            </p>
          </header>

          {/* Main Price Grid */}
          <section aria-labelledby="current-prices" className="mb-12">
            <h2 id="current-prices" className="sr-only">Current Gold Prices</h2>
            <PriceWidget />
          </section>

          {/* TradingView Chart Placeholder */}
          <section className="mb-12" aria-labelledby="chart-heading">
            <h2 id="chart-heading" className="text-xl font-bold text-[var(--text-primary)] mb-4">
              Gold Price Chart
            </h2>
            <div 
              className="card h-96 flex items-center justify-center"
              role="img"
              aria-label="Gold price chart - Coming soon"
            >
              <div className="text-center text-[var(--text-tertiary)]">
                <span className="text-5xl mb-4 block" aria-hidden="true">📈</span>
                <p className="font-medium">TradingView Chart Integration</p>
                <p className="text-sm text-[var(--text-disabled)] mt-2">Coming soon</p>
                {/* TODO: Embed TradingView widget here */}
              </div>
            </div>
          </section>

          {/* BIV Explainer */}
          <section id="biv" className="mb-12 scroll-mt-24" aria-labelledby="biv-heading">
            <div className="cta-card p-8">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-2xl" aria-hidden="true">💎</span>
                <h2 id="biv-heading" className="text-xl font-bold text-[var(--text-primary)]">
                  What is BIV?
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                    BIV stands for <strong className="text-[var(--gold-primary)]">Baseline Intrinsic Value</strong>. It&apos;s a simple calculation:
                  </p>
                  
                  {/* Formula */}
                  <div className="bg-[var(--bg-primary)]/50 rounded-lg p-4 font-mono text-sm mb-4">
                    <div className="text-[var(--text-tertiary)]">// BIV Formula</div>
                    <div className="text-[var(--text-primary)] mt-2">
                      <span className="text-[var(--gold-primary)] font-bold">BIV</span>
                      <span> = </span>
                      <span className="text-[var(--success)]">Gold Spot Price</span>
                      <span> − </span>
                      <span className="text-[var(--error)]">AISC</span>
                    </div>
                  </div>

                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    AISC (All-In Sustaining Cost) is what it costs miners to extract one ounce of gold from the ground. The global average AISC is around $1,400–$1,600/oz, depending on the operation. We use $1,450/oz as the industry benchmark (Q4 2025 average from World Gold Council data).
                  </p>
                </div>
                
                <div>
                  <h3 className="text-[var(--text-primary)] font-semibold mb-3">Why It Matters</h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                    BIV represents the net value of gold still in the ground. This matters because NatGold tokens represent claims on in-ground reserves—and BIV tells you the floor value of those claims.
                  </p>
                  
                  {/* Example calculation */}
                  <div className="bg-[var(--bg-primary)]/50 rounded-lg p-4 text-sm">
                    <div className="text-[var(--text-tertiary)] mb-2">Live Calculation:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">COMEX Gold Spot:</span>
                        <span className="text-[var(--text-primary)]">$2,847.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">AISC (Industry Avg):</span>
                        <span className="text-[var(--text-primary)]">−$1,450.00</span>
                      </div>
                      <div className="border-t border-[var(--border-subtle)] my-2" />
                      <div className="flex justify-between font-semibold">
                        <span className="text-[var(--gold-primary)]">BIV:</span>
                        <span className="gold-text">$1,397.50/oz</span>
                      </div>
                    </div>
                    <div className="text-[var(--text-tertiary)] text-xs mt-2">
                      = {((1397.50 / 2847.50) * 100).toFixed(1)}% profit margin locked in the ground
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border-subtle)]">
                <BookCTA variant="contextual" context="The S.P.I.R.A.L. thesis explains why BIV matters long-term. Read Chapter 6." />
              </div>
            </div>
          </section>

          {/* Educational Callouts */}
          <section className="mb-12 grid md:grid-cols-2 gap-6" aria-labelledby="callouts-heading">
            <h2 id="callouts-heading" className="sr-only">Price Insights</h2>
            
            <div className="card p-6">
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">
                Why PAXG Sometimes Trades Above Gold Spot
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                24/7 liquidity. You can trade at 3am on a Sunday. Physical gold markets close. Tokens don&apos;t. This convenience premium can push PAXG 0.1-0.5% above spot during off-hours.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">
                AISC Variability by Region
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Not all gold costs the same to mine. Nevada operations average ~$1,100/oz. South African deep mines can hit ~$1,800/oz. Our AISC Index averages the major global producers.
              </p>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-12" aria-labelledby="comparison-heading">
            <h2 id="comparison-heading" className="text-xl font-bold text-[var(--text-primary)] mb-4">
              Gold Asset Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full card" role="table">
                <caption className="sr-only">Comparison of different gold assets and their characteristics</caption>
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th scope="col" className="text-left py-4 px-5 text-[var(--text-tertiary)] font-medium text-sm">Asset</th>
                    <th scope="col" className="text-left py-4 px-5 text-[var(--text-tertiary)] font-medium text-sm">Type</th>
                    <th scope="col" className="text-left py-4 px-5 text-[var(--text-tertiary)] font-medium text-sm">Backing</th>
                    <th scope="col" className="text-left py-4 px-5 text-[var(--text-tertiary)] font-medium text-sm">Extraction</th>
                    <th scope="col" className="text-left py-4 px-5 text-[var(--text-tertiary)] font-medium text-sm">ESG Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  <tr className="hover:bg-[var(--bg-tertiary)]/50 transition-colors">
                    <td className="py-4 px-5 text-[var(--text-primary)] font-medium">Physical Gold</td>
                    <td className="py-4 px-5 text-[var(--text-secondary)]">Commodity</td>
                    <td className="py-4 px-5 text-[var(--text-secondary)]">100% Physical</td>
                    <td className="py-4 px-5 text-[var(--error)]">Required</td>
                    <td className="py-4 px-5 text-[var(--error)]">High</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-tertiary)]/50 transition-colors">
                    <td className="py-4 px-5 text-[var(--text-primary)] font-medium">PAXG</td>
                    <td className="py-4 px-5 text-[var(--text-secondary)]">Token</td>
                    <td className="py-4 px-5 text-[var(--text-secondary)]">London Vaults</td>
                    <td className="py-4 px-5 text-[var(--error)]">Required</td>
                    <td className="py-4 px-5 text-[var(--error)]">High</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-tertiary)]/50 transition-colors">
                    <td className="py-4 px-5 text-[var(--text-primary)] font-medium">XAUT</td>
                    <td className="py-4 px-5 text-[var(--text-secondary)]">Token</td>
                    <td className="py-4 px-5 text-[var(--text-secondary)]">Swiss Vaults</td>
                    <td className="py-4 px-5 text-[var(--error)]">Required</td>
                    <td className="py-4 px-5 text-[var(--error)]">High</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-tertiary)]/50 transition-colors bg-[var(--gold-glow)]">
                    <td className="py-4 px-5 text-[var(--gold-primary)] font-medium">NatGold</td>
                    <td className="py-4 px-5 text-[var(--text-secondary)]">Token</td>
                    <td className="py-4 px-5 text-[var(--text-secondary)]">In-Ground Reserves</td>
                    <td className="py-4 px-5 text-[var(--success)]">Not Required</td>
                    <td className="py-4 px-5 text-[var(--success)]">Zero</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Book CTA */}
          <BookCTA variant="inline" />
        </div>
      </div>
    </>
  );
}

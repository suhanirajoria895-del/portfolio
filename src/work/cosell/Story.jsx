/* Extra case-study building blocks: numbered citations, quick read, scope, sources. */
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const SOURCES = [
  ["Base", "How multi-channel sellers manage orders across marketplaces", "https://base.com/en-EN/blog/how-can-multi-channel-sellers-manage-orders-across-amazon-flipkart-myntra-and-more/"],
  ["Shipmozo", "E-commerce returns and reverse logistics", "https://www.shipmozo.com/blog/ecommerce-returns-and-reverse-logistics"],
  ["Mynd Solution", "Handling marketplace reconciliation for online sellers in India", "https://www.myndsolution.com/best-practices/handling-marketplace-reconciliation-for-online-sellers-in-india/"],
  ["About Amazon India", "Amazon Seller Assistant, an AI tool for sellers", "https://www.aboutamazon.in/news/small-business/amazon-seller-assistant-ai-tool-india"],
  ["The Wire (PTI)", "Flipkart Ads launches Saarthi with AI-powered tools", "https://m.thewire.in/article/ptiprnews/flipkart-ads-launches-saarthi-to-help-sellers-grow-with-ai-powered-tools-and-expert-advertising-support"],
  ["Inc42", "Marketplaces shift their AI focus to seller-side stacks", "https://inc42.com/features/amazon-flipkart-meeshos-ai-focus-shifts-to-seller-side-stacks/"],
  ["Retail Brew", "Shopify adds more AI power to its merchant assistant", "https://www.retailbrew.com/stories/2025/12/11/shopify-plugs-in-more-ai-power-to-merchant-assistant"],
  ["The Week (PTI)", "Unicommerce marketplace and reconciliation tools", "https://www.theweek.in/wire-updates/business/2025/06/19/dcm36-unicommerce.html"],
];

/** A numbered citation that jumps to the Sources list. `n` is 1-based. */
export function Cite({ n }) {
  const list = Array.isArray(n) ? n : [n];
  return (
    <sup className="cite">
      {list.map((k, i) => (
        <span key={k}>
          {i > 0 && ","}
          <a href={`#src-${k}`} aria-label={`Source ${k}: ${SOURCES[k - 1][0]}`}>[{k}]</a>
        </span>
      ))}
    </sup>
  );
}

/** Recruiter TL;DR, toggled against the full story. */
export function QuickRead({ demo }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="qr">
      <div className="qr__toggle" role="group" aria-label="Reading mode">
        <button type="button" aria-pressed={open} onClick={() => setOpen(true)}>Quick read</button>
        <button type="button" aria-pressed={!open} onClick={() => setOpen(false)}>Full story</button>
      </div>
      {open && (
        <dl className="qr__card">
          <div><dt>Problem</dt><dd>Small sellers on several marketplaces repeat the same jobs on every dashboard, and small, costly mistakes slip through unseen.</dd></div>
          <div><dt>Insight</dt><dd>Sellers already have data. What they lack is time to watch it, and the confidence to let software touch their prices.</dd></div>
          <div><dt>Solution</dt><dd>Co, an AI copilot that watches every shop, handles routine work, and brings the seller a short list of decisions.</dd></div>
          <div><dt>Key decisions</dt><dd>Ask before acting · Show the reasons, not a score · A freedom level per task, with undo on everything.</dd></div>
        </dl>
      )}
      {open && (
        <p className="qr__go"><a href={demo} target="_blank" rel="noreferrer">Open the live prototype <ArrowRight size={14} aria-hidden="true" /><span className="sr">(opens in a new tab)</span></a></p>
      )}
    </div>
  );
}

export function Scope() {
  return (
    <div className="scope" data-reveal>
      <div>
        <p className="cs-mono">In scope</p>
        <ul>
          <li>Watching stock, prices, returns and payouts across several marketplaces</li>
          <li>Recommendations the seller approves, edits or rejects</li>
          <li>How much the AI may do on its own, set per task</li>
          <li>A desktop app, plus a phone app for urgent approvals</li>
        </ul>
      </div>
      <div>
        <p className="cs-mono">Out of scope, on purpose</p>
        <ul>
          <li>Shipping and courier booking</li>
          <li>Accounting and tax filing</li>
          <li>Creating new listings or product photos</li>
          <li>Real marketplace integrations (the prototype uses sample data)</li>
        </ul>
      </div>
    </div>
  );
}

export function Sources() {
  return (
    <section id="sources" className="cs-sec srcs">
      <header className="cs-sec__head" data-reveal>
        <p className="cs-kicker"><span>10</span> Sources</p>
        <h2>Where the numbers come from</h2>
        <p className="cs-lede">All research was secondary: articles, seller guides and product announcements. Every number on this page links here.</p>
      </header>
      <ol className="srcs__list" data-reveal>
        {SOURCES.map(([pub, title, url], i) => (
          <li key={url} id={`src-${i + 1}`}>
            <span className="srcs__n">{i + 1}</span>
            <span><b>{pub}.</b> {title}. <a href={url} target="_blank" rel="noreferrer">{new URL(url).hostname.replace("www.", "")}<span className="sr"> (opens in a new tab)</span> ↗</a></span>
          </li>
        ))}
      </ol>
    </section>
  );
}

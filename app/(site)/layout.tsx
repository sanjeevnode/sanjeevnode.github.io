import './site.css';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Motion from '@/components/site/Motion';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="curtain" aria-hidden="true">
        <div className="curtain__panel"><span className="curtain__label" /><span className="curtain__wire" /></div>
      </div>
      <Header />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
      <Motion />
    </div>
  );
}

import { useEffect, useState } from "react";
import { ArrowRight, Menu, MessageCircle, X } from "lucide-react";

import { pageCopyByKey, pages, type PageKey, sharedCtaCopy } from "../../app-data";
import { WhatsAppLink } from "../WhatsAppLink";

const DESKTOP_NAV_MEDIA_QUERY = "(min-width: 1100px)";

type SiteHeaderProps = {
  currentPage: PageKey;
};

type NavLinksProps = {
  currentPage: PageKey;
  onNavigate?: () => void;
};

function BrandMark({ onNavigate }: Pick<NavLinksProps, "onNavigate">) {
  return (
    <a href="./" className="brand-mark" aria-label="rosfix inicio" onClick={onNavigate}>
      <img src="assets/rosfix-mark.svg" alt="" className="brand-mark__logo" />
      <span>
        <strong>rosfix</strong>
        <small>Diagnostico claro en Rosario</small>
      </span>
    </a>
  );
}

function DesktopNavLinks({ currentPage }: NavLinksProps) {
  return (
    <nav className="nav-desktop" aria-label="Principal">
      {pages.map((page) => {
        const Icon = page.icon;

        return (
          <a
            key={page.key}
            href={page.path}
            className={page.key === currentPage ? "is-active" : undefined}
            aria-current={page.key === currentPage ? "page" : undefined}
            title={`${page.title} · ${page.intro}`}
          >
            <span className="nav-desktop__icon" aria-hidden="true">
              <Icon size={16} />
            </span>
            <span className="nav-desktop__text">
              <strong>{page.title}</strong>
            </span>
          </a>
        );
      })}
    </nav>
  );
}

function MobileNavLinks({ currentPage, onNavigate }: NavLinksProps) {
  return (
    <nav className="mobile-nav__links" aria-label="Principal mobile">
      {pages.map((page) => (
        <a
          key={page.key}
          href={page.path}
          className={page.key === currentPage ? "is-active" : undefined}
          aria-current={page.key === currentPage ? "page" : undefined}
          onClick={onNavigate}
        >
          <strong>{page.title}</strong>
          <span>{page.intro}</span>
        </a>
      ))}
    </nav>
  );
}

export function SiteHeader({ currentPage }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(DESKTOP_NAV_MEDIA_QUERY);
    const syncMenuWithViewport = (event?: MediaQueryListEvent) => {
      if ((event?.matches ?? mediaQuery.matches) === true) {
        setOpen(false);
      }
    };

    syncMenuWithViewport();
    mediaQuery.addEventListener("change", syncMenuWithViewport);

    return () => mediaQuery.removeEventListener("change", syncMenuWithViewport);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const shouldLock = open && !window.matchMedia(DESKTOP_NAV_MEDIA_QUERY).matches;
    const previousOverflow = document.body.style.overflow;

    if (shouldLock) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [currentPage]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="site-header__inner">
        <div className="shell site-header__row">
          <BrandMark onNavigate={closeMenu} />

          <DesktopNavLinks currentPage={currentPage} />

          <div className="site-header__actions">
            <WhatsAppLink className="action-link site-header__cta" message={sharedCtaCopy.requestDiagnosisMessage}>
              <MessageCircle size={16} />
              <span className="site-header__cta-text">{sharedCtaCopy.requestDiagnosisLabel}</span>
            </WhatsAppLink>
          </div>

          <button
            type="button"
            className="menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav-wrap">
          <div
            id="mobile-nav-panel"
            className="shell mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
          >
            <div className="mobile-nav__intro">
              <span>Servicio tecnico</span>
              <p>Diagnostico real, trato directo y seguimiento por WhatsApp.</p>
            </div>

            <MobileNavLinks currentPage={currentPage} onNavigate={closeMenu} />

            <div className="mobile-nav__footer">
              <WhatsAppLink
                className="primary-action mobile-nav__cta"
                message={sharedCtaCopy.requestDiagnosisForDeviceMessage}
              >
                <MessageCircle size={16} />
                {sharedCtaCopy.requestDiagnosisLabel}
              </WhatsAppLink>
              <a href={pageCopyByKey.contact.path} className="secondary-action mobile-nav__contact" onClick={closeMenu}>
                {sharedCtaCopy.contactLabel}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

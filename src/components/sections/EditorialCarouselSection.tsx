import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { editorialCarouselSlides } from "../../app-data";

export function EditorialCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentIndex((value) => (value + 1) % editorialCarouselSlides.length);
    }, 5600);

    return () => window.clearInterval(intervalId);
  }, []);

  const goTo = (index: number) => setCurrentIndex(index);
  const goPrev = () => setCurrentIndex((value) => (value - 1 + editorialCarouselSlides.length) % editorialCarouselSlides.length);
  const goNext = () => setCurrentIndex((value) => (value + 1) % editorialCarouselSlides.length);

  return (
    <section className="editorial-carousel" aria-label="Casos frecuentes en rosfix">
      <div className="editorial-carousel__viewport">
        <div
          className="editorial-carousel__track"
          style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        >
          {editorialCarouselSlides.map((slide) => (
            <article key={slide.eyebrow} className="editorial-carousel__slide">
              <div className="editorial-carousel__frame">
                <div className="editorial-carousel__grid" aria-hidden="true" />
                <div className="editorial-carousel__media">
                  <img src={slide.image} alt={slide.eyebrow} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="shell editorial-carousel__controls">
        <div className="editorial-carousel__rail">
          {editorialCarouselSlides.map((slide, index) => (
            <button
              key={slide.eyebrow}
              type="button"
              className={`editorial-carousel__index${index === currentIndex ? " is-active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Ir a ${slide.eyebrow}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{slide.eyebrow}</strong>
            </button>
          ))}
        </div>

        <div className="editorial-carousel__actions">
          <button type="button" className="editorial-carousel__button" onClick={goPrev} aria-label="Slide anterior">
            <ChevronLeft size={16} />
          </button>
          <div className="editorial-carousel__progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${(currentIndex + 1) / editorialCarouselSlides.length})` }} />
          </div>
          <button type="button" className="editorial-carousel__button" onClick={goNext} aria-label="Slide siguiente">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="shell editorial-carousel__text-fallback">
        {editorialCarouselSlides.map((slide, index) => (
          <article key={slide.eyebrow} className="editorial-carousel__text-card">
            <span className="editorial-carousel__text-card__number">{String(index + 1).padStart(2, "0")}</span>
            <div className="editorial-carousel__text-card__content">
              <span className="editorial-carousel__text-card__label">{slide.label}</span>
              <strong>{slide.eyebrow}</strong>
              <p>{slide.statement}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

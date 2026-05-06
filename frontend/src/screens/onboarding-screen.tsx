import type { OnboardingSlide } from '@/types/auth-flow';

interface OnboardingScreenProps {
  slideIndex: number;
  slides: OnboardingSlide[];
  onNext: () => void;
  onSkip: () => void;
  onStart: () => void;
}

export function OnboardingScreen({ slideIndex, slides, onNext, onSkip, onStart }: OnboardingScreenProps) {
  const currentSlide = slides[slideIndex];

  return (
    <section className='panel wire-onboarding'>
      <p className='wire-title'>Onboarding screen</p>
      <div className='onboarding-body'>
        <p className='onboarding-text'>{currentSlide.description}</p>
      </div>
      <div className='onboarding-footer'>
        <div className='dots' aria-hidden='true'>
          {slides.map((slide, index) => (
            <span className={index === slideIndex ? 'dot active' : 'dot'} key={slide.title} />
          ))}
        </div>
        <div className='onboarding-buttons'>
          <button className='wire-button' onClick={onSkip} type='button'>
            Atla
          </button>
          {slideIndex < slides.length - 1 ? (
            <button className='wire-button' onClick={onNext} type='button'>
              Ileri
            </button>
          ) : (
            <button className='wire-button' onClick={onStart} type='button'>
              Ileri / Basla
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

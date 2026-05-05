import type { ViewState } from '@/lib/types';

interface ShelfStateViewProps {
  state: ViewState;
}

export function ShelfStateView({ state }: ShelfStateViewProps) {
  if (state === 'empty') return <section className='card'>Ilk kitabini tara ve rafini doldur.</section>;
  if (state === 'loading') return <section className='card shimmer'>Raf olusturuluyor...</section>;
  if (state === 'success') return <section className='card'>Kitap eklendi. Rafin guncellendi.</section>;
  return <section className='card error'>Baglanti yok. Degisiklik offline kaydedildi.</section>;
}

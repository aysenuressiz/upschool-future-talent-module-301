import React from 'react';

interface PostAddFormScreenProps {
  postType: 'inceleme' | 'alinti' | 'paylasim';
  postText: string;
  onPostTypeChange: (value: 'inceleme' | 'alinti' | 'paylasim') => void;
  onPostTextChange: (value: string) => void;
  onShare: () => void;
}

export function PostAddFormScreen({
  postType,
  postText,
  onPostTypeChange,
  onPostTextChange,
  onShare,
}: PostAddFormScreenProps) {
  return (
    <section className='add-form'>
      <div className='post-segmented'>
        <button className={postType === 'inceleme' ? 'active' : ''} onClick={() => onPostTypeChange('inceleme')} type='button'>Inceleme</button>
        <button className={postType === 'alinti' ? 'active' : ''} onClick={() => onPostTypeChange('alinti')} type='button'>Alinti</button>
        <button className={postType === 'paylasim' ? 'active' : ''} onClick={() => onPostTypeChange('paylasim')} type='button'>Gonderi</button>
      </div>
      <label className='add-label'>Ilgili kitap</label>
      <input placeholder='Ilgili kitap adi' />
      <label className='add-label'>Konu</label>
      <input placeholder='Konu basligi (Opsiyonel)' />
      <label className='add-label'>Icerik</label>
      <textarea
        onChange={(e) => onPostTextChange(e.target.value)}
        placeholder='Ne dusunuyorsunuz?'
        rows={5}
        value={postText}
      />
      <div className='toolbar-group toolbar-group--icons'>
        <button aria-label='Yazi bicimi' type='button'><span className='material-symbols-outlined'>format_size</span></button>
        <button aria-label='Emoji ekle' type='button'><span className='material-symbols-outlined'>sentiment_satisfied</span></button>
        <button aria-label='Fotograf ekle' type='button'><span className='material-symbols-outlined'>image</span></button>
      </div>
      <button className='scan-primary' onClick={onShare} type='button'>Paylas</button>
    </section>
  );
}


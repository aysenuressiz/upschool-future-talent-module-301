import React from 'react';

interface BookAddFormScreenProps {
  bookName: string;
  bookAuthor: string;
  bookPages: string;
  bookReadPages: string;
  bookStatus: string;
  onBookNameChange: (value: string) => void;
  onBookAuthorChange: (value: string) => void;
  onBookPagesChange: (value: string) => void;
  onBookReadPagesChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function BookAddFormScreen({
  bookName,
  bookAuthor,
  bookPages,
  bookReadPages,
  bookStatus,
  onBookNameChange,
  onBookAuthorChange,
  onBookPagesChange,
  onBookReadPagesChange,
  onSubmit,
}: BookAddFormScreenProps) {
  return (
    <form className='add-form' onSubmit={onSubmit}>
      <section className='book-top-section'>
        <div className='book-cover-uploader'>
          <span className='material-symbols-outlined'>add_photo_alternate</span>
          <p>Kapak Fotografi</p>
        </div>
        <div className='book-top-fields'>
          <label className='add-label'>Kitabin Adi</label>
          <input onChange={(e) => onBookNameChange(e.target.value)} placeholder='Orn: Suc ve Ceza' required value={bookName} />
          <div className='add-form-cols'>
            <div>
              <label className='add-label'>Sayfa Sayisi</label>
              <input onChange={(e) => onBookPagesChange(e.target.value)} placeholder='0' required type='number' value={bookPages} />
            </div>
            <div>
              <label className='add-label'>Okunan Sayfa</label>
              <input onChange={(e) => onBookReadPagesChange(e.target.value)} placeholder='0' required type='number' value={bookReadPages} />
            </div>
          </div>
        </div>
      </section>
      <label className='add-label'>Yazarin Adi</label>
      <input onChange={(e) => onBookAuthorChange(e.target.value)} placeholder='Yazar Adi' required value={bookAuthor} />
      <label className='add-label'>Yayinevi</label>
      <input placeholder='Yayinevi' />
      <label className='add-label'>ISBN</label>
      <div className='input-with-icon'>
        <input placeholder='ISBN Numarasi' />
        <span className='material-symbols-outlined'>qr_code_scanner</span>
      </div>
      <label className='add-label'>Kitap Turu</label>
      <select defaultValue=''>
        <option disabled value=''>Tur Secin</option>
        <option>Roman</option>
        <option>Kisisel Gelisim</option>
        <option>Tarih</option>
        <option>Bilim Kurgu</option>
        <option>Biyografi</option>
      </select>
      <label className='add-label'>Bulundugu Kitaplik</label>
      <select defaultValue=''>
        <option disabled value=''>Kitaplik Secin</option>
        <option>Okunanlar</option>
        <option>Okunacaklar</option>
        <option>Favoriler</option>
        <option>Odunc Verilenler</option>
      </select>
      <label className='add-label'>Ozet / Notlar</label>
      <textarea placeholder='Kitap hakkinda notlarinizi buraya ekleyebilirsiniz...' rows={4} />
      <button className='scan-primary' type='submit'>Ekle</button>
      {bookStatus && <p className='chip'>{bookStatus}</p>}
    </form>
  );
}


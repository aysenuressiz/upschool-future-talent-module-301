import React from 'react';

interface LoanAddFormScreenProps {
  loanBook: string;
  loanPerson: string;
  loanDate: string;
  returnDate: string;
  onLoanBookChange: (value: string) => void;
  onLoanPersonChange: (value: string) => void;
  onLoanDateChange: (value: string) => void;
  onReturnDateChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function LoanAddFormScreen({
  loanBook,
  loanPerson,
  loanDate,
  returnDate,
  onLoanBookChange,
  onLoanPersonChange,
  onLoanDateChange,
  onReturnDateChange,
  onSubmit,
}: LoanAddFormScreenProps) {
  return (
    <form className='add-form' onSubmit={onSubmit}>
      <label className='add-label'>Odunc Sekli</label>
      <select defaultValue='Verilen'>
        <option>Verilen</option>
        <option>Alinan</option>
      </select>
      <label className='add-label'>Kitap Adi</label>
      <input onChange={(e) => onLoanBookChange(e.target.value)} placeholder='Kitap adi' required value={loanBook} />
      <label className='add-label'>Yazar</label>
      <input placeholder='Yazar adini girin' />
      <label className='add-label'>Kisi</label>
      <input onChange={(e) => onLoanPersonChange(e.target.value)} placeholder='Odunc kisisi' required value={loanPerson} />
      <label className='add-label'>Verilen Tarih</label>
      <input onChange={(e) => onLoanDateChange(e.target.value)} placeholder='Verilis tarihi' required type='date' value={loanDate} />
      <label className='add-label'>Geri Verilecek Tarih</label>
      <input onChange={(e) => onReturnDateChange(e.target.value)} placeholder='Alinacak tarih' required type='date' value={returnDate} />
      <button className='scan-primary' type='submit'>Ekle</button>
    </form>
  );
}


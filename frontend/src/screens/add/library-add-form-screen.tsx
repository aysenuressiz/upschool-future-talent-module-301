import React from 'react';

interface LibraryAddFormScreenProps {
  shelfName: string;
  shelfRow: string;
  shelfCol: string;
  onShelfNameChange: (value: string) => void;
  onShelfRowChange: (value: string) => void;
  onShelfColChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function LibraryAddFormScreen({
  shelfName,
  shelfRow,
  shelfCol,
  onShelfNameChange,
  onShelfRowChange,
  onShelfColChange,
  onSubmit,
}: LibraryAddFormScreenProps) {
  return (
    <form className='add-form' onSubmit={onSubmit}>
      <label className='add-label'>Kitaplik adi</label>
      <div className='input-with-icon'>
        <input onChange={(e) => onShelfNameChange(e.target.value)} placeholder='library name' required value={shelfName} />
        <span className='material-symbols-outlined'>edit</span>
      </div>
      <div className='add-form-cols'>
        <div>
          <label className='add-label'>satir</label>
          <div className='input-with-icon'>
            <input onChange={(e) => onShelfRowChange(e.target.value)} placeholder='e.g. 5' required type='number' value={shelfRow} />
            <span className='material-symbols-outlined'>table_rows</span>
          </div>
        </div>
        <div>
          <label className='add-label'>sutun</label>
          <div className='input-with-icon'>
            <input onChange={(e) => onShelfColChange(e.target.value)} placeholder='e.g. 3' required type='number' value={shelfCol} />
            <span className='material-symbols-outlined'>view_column</span>
          </div>
        </div>
      </div>
      <button className='scan-primary' type='submit'>Ekle</button>
    </form>
  );
}


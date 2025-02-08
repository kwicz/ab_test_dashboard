'use client';
import { useState } from 'react';

export default function TestForm({
  onSubmit,
}: {
  onSubmit: (test: any) => void;
}) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ id: Date.now().toString(), name, status: 'Pending' });
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <input
        type='text'
        placeholder='Test Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='border p-2 rounded'
      />
      <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
        Add Test
      </button>
    </form>
  );
}

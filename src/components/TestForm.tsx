'use client';
import { useState, useEffect } from 'react';

export default function TestForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (test: {
    id: string;
    name: string;
    client: string;
    siteArea: string;
    status: string;
    dateCreated: string;
  }) => void;
  initialData?: {
    id: string;
    name: string;
    client: string;
    siteArea: string;
    status: string;
    dateCreated: string;
  };
}) {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    siteArea: '',
    status: 'Pending',
    dateCreated: new Date().toISOString().split('T')[0],
  });

  // Populate formData when initialData is available
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name.trim() &&
      formData.client.trim() &&
      formData.siteArea.trim()
    ) {
      onSubmit({ id: initialData?.id || Date.now().toString(), ...formData });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <input
        type='text'
        name='name'
        placeholder='Test Name'
        value={formData.name}
        onChange={handleChange}
        className='border p-2 rounded'
      />
      <input
        type='text'
        name='client'
        placeholder='Client'
        value={formData.client}
        onChange={handleChange}
        className='border p-2 rounded'
      />
      <input
        type='text'
        name='siteArea'
        placeholder='Site Area'
        value={formData.siteArea}
        onChange={handleChange}
        className='border p-2 rounded'
      />
      <select
        name='status'
        value={formData.status}
        onChange={handleChange}
        className='border p-2 rounded'
      >
        <option value='Pending'>Pending</option>
        <option value='Running'>Running</option>
        <option value='Completed'>Completed</option>
      </select>
      <input
        type='date'
        name='dateCreated'
        value={formData.dateCreated}
        onChange={handleChange}
        className='border p-2 rounded'
      />
      <button type='submit' className='btn btn-secondary p-2 rounded'>
        {initialData ? 'Update Test' : 'Add Test'}
      </button>
    </form>
  );
}

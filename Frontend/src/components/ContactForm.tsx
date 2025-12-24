import { useEffect, useState } from 'react';
import { apiRequest } from '../api/http';
import type { Contact } from '../types/contact';


export default function ContactForm({
  editing,
  onSaved,
}: {
  editing: Contact | null;
  onSaved: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setEmail(editing.email);
      setPhone(editing.phone || '');
      setNotes(editing.notes || '');
    }
  }, [editing]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const payload = { name, email, phone, notes };

    if (editing) {
      await apiRequest(`/contacts/${editing.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    } else {
      await apiRequest('/contacts', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }

    onSaved();
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
  }

  return (
   <form className="card" onSubmit={submit}>
  <h3>{editing ? 'Edit Contact' : 'Create Contact'}</h3>

  <input required value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
  <input required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes" />

  <button className="primary-btn" type="submit">
    {editing ? 'Update' : 'Create'}
  </button>
</form>

  );
}

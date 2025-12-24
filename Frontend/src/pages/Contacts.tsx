import { useEffect, useState } from "react";
import { apiRequest } from "../api/http";
import type { Contact } from "../types/contact";
import ContactForm from "../components/ContactForm";
import Header from "../components/Header";
import { toast } from "react-hot-toast";

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editing, setEditing] = useState<Contact | null>(null);

  async function loadContacts() {
    const data = await apiRequest("/contacts");
    setContacts(data);
  }

  async function deleteContact(id: string) {
    try {
      await apiRequest(`/contacts/${id}`, { method: "DELETE" });
      loadContacts();
    } catch (err: any) {
      toast.error(err?.message || "Action not allowed");
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        <ContactForm editing={editing} onSaved={loadContacts} />

        <h3>Contacts</h3>

        {contacts.length === 0 ? (
          <p className="empty">No contacts found.</p>
        ) : (
          <div className="list">
            {contacts.map((c) => (
              <div key={c.id} className="list-row">
                <div>
                  <strong>{c.name}</strong>
                  <div className="muted">{c.email}</div>
                </div>

                <div className="actions">
                  <button onClick={() => setEditing(c)}>Edit</button>
                  <button
                    className="danger"
                    onClick={() => deleteContact(c.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

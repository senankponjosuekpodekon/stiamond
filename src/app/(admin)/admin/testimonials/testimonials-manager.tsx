"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";

type Testimonial = {
  id: string;
  clientName: string;
  clientRole: string | null;
  clientCompany: string | null;
  projectType: string | null;
  quoteEn: string;
  quoteFr: string | null;
  rating: number;
  status: "draft" | "published";
  sortOrder: number;
  createdAt: string;
};

export function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      setItems(data.testimonials || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Failed to delete testimonial");
    }
  };

  const handleEdit = (item: Testimonial) => {
    setEditing(item);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h3">Testimonials</h2>
          <p className="mt-2 text-body text-muted-foreground">
            Manage client testimonials displayed on the homepage and case studies.
          </p>
        </div>
        <button
          onClick={handleNew}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-body-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Testimonial
        </button>
      </div>

      {showForm && (
        <TestimonialForm
          initial={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditing(null);
            fetchItems();
          }}
        />
      )}

      {loading ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-body text-muted-foreground">Loading...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-body text-muted-foreground">
            No testimonials yet. Click &quot;New Testimonial&quot; to add your first client review.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full">
            <thead className="border-b border-border bg-surface-1/40">
              <tr>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Client</th>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Project</th>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Rating</th>
                <th className="px-4 py-3 text-left text-body-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-right text-body-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-surface-1/30">
                  <td className="px-4 py-3">
                    <div className="font-medium">{item.clientName}</div>
                    {item.clientCompany && (
                      <div className="text-caption text-muted-foreground">{item.clientCompany}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-body-sm text-muted-foreground">
                    {item.projectType || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-caption font-medium ${
                        item.status === "published"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded-md p-2 text-muted-foreground hover:bg-surface-1 hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function TestimonialForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: Testimonial | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    clientName: initial?.clientName || "",
    clientRole: initial?.clientRole || "",
    clientCompany: initial?.clientCompany || "",
    projectType: initial?.projectType || "",
    quoteEn: initial?.quoteEn || "",
    quoteFr: initial?.quoteFr || "",
    rating: initial?.rating || 5,
    status: initial?.status || "draft",
    sortOrder: initial?.sortOrder || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.quoteEn) {
      setError("Client name and English quote are required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = initial
        ? `/api/admin/testimonials/${initial.id}`
        : "/api/admin/testimonials";
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save testimonial");
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-h5 font-semibold">
          {initial ? "Edit Testimonial" : "New Testimonial"}
        </h3>
        <button onClick={onClose} className="rounded-md p-2 text-muted-foreground hover:bg-surface-1 hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-body-sm font-medium">Client Name *</label>
            <input
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              required
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm"
            />
          </div>
          <div>
            <label className="text-body-sm font-medium">Client Role</label>
            <input
              value={form.clientRole}
              onChange={(e) => setForm({ ...form, clientRole: e.target.value })}
              placeholder="e.g. Founder, CEO"
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-body-sm font-medium">Client Company</label>
            <input
              value={form.clientCompany}
              onChange={(e) => setForm({ ...form, clientCompany: e.target.value })}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm"
            />
          </div>
          <div>
            <label className="text-body-sm font-medium">Project Type</label>
            <input
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
              placeholder="e.g. E-commerce, Web Design, Automation"
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-body-sm font-medium">Quote (English) *</label>
          <textarea
            value={form.quoteEn}
            onChange={(e) => setForm({ ...form, quoteEn: e.target.value })}
            required
            rows={3}
            className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm"
          />
        </div>
        <div>
          <label className="text-body-sm font-medium">Quote (French)</label>
          <textarea
            value={form.quoteFr}
            onChange={(e) => setForm({ ...form, quoteFr: e.target.value })}
            rows={3}
            placeholder="Traduction française (optionnel)"
            className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-body-sm font-medium">Rating</label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm"
            >
              <option value={5}>5 stars</option>
              <option value={4}>4 stars</option>
              <option value={3}>3 stars</option>
            </select>
          </div>
          <div>
            <label className="text-body-sm font-medium">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="text-body-sm font-medium">Sort Order</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm"
            />
          </div>
        </div>

        {error && (
          <p className="text-caption text-destructive">{error}</p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-body-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? "Saving..." : initial ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-4 py-2 text-body-sm font-medium text-muted-foreground transition-colors hover:bg-surface-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

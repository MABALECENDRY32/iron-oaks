export default function CustomerDetails({ form, onChange }) {
  return (
    <div className="space-y-5">
      <Field label="Full name" name="name" value={form.name} onChange={onChange} required />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
        <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={onChange} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted mb-2">
          Notes <span className="text-muted/60">(optional)</span>
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={onChange}
          rows={3}
          className="w-full rounded-lg border border-line bg-base px-4 py-3 text-ink focus:border-accent focus:outline-none transition-colors resize-none"
          placeholder="Anything we should know before your visit?"
        />
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted mb-2">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border border-line bg-base px-4 py-3 text-ink focus:border-accent focus:outline-none transition-colors"
      />
    </div>
  );
}
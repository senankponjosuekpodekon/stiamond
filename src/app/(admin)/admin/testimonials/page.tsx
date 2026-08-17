import { TestimonialsManager } from "./testimonials-manager";

export const runtime = "nodejs";

export default function AdminTestimonialsPage() {
  return (
    <div className="p-8">
      <TestimonialsManager />
    </div>
  );
}

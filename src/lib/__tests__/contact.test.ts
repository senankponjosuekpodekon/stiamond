import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/validations/contact";

describe("contactSchema", () => {
  it("validates a valid contact form submission", () => {
    const valid = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      company: "Acme",
      projectType: "ai",
      message: "I would like to discuss a project with you.",
    };

    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const invalid = {
      firstName: "John",
      lastName: "Doe",
      email: "not-an-email",
      projectType: "ai",
      message: "This is a valid message that is long enough.",
    };

    const result = contactSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("rejects short message", () => {
    const invalid = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      projectType: "ai",
      message: "short",
    };

    const result = contactSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const invalid = {
      firstName: "",
      lastName: "",
      email: "",
      projectType: "",
      message: "",
    };

    const result = contactSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("accepts optional company field being empty", () => {
    const valid = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      company: "",
      projectType: "software",
      message: "I would like to discuss a project with you.",
    };

    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });
});

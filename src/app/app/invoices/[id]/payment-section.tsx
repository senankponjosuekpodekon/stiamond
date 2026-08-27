"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { selectPaymentMethod } from "./actions";
import { CreditCard, Bitcoin, Landmark, Smartphone, Wallet } from "lucide-react";

type PaymentMethods = {
  bank: { enabled: boolean; details: string };
  crypto: { enabled: boolean; details: string };
  mobile: { enabled: boolean; details: string };
  other: { enabled: boolean; details: string };
  stripe: { enabled: boolean; details: string };
};

const methodIcons: Record<keyof PaymentMethods, typeof CreditCard> = {
  bank: Landmark,
  crypto: Bitcoin,
  mobile: Smartphone,
  other: Wallet,
  stripe: CreditCard,
};

const manualMethods = ["bank", "crypto", "mobile", "other"] as const;

export function PaymentSection({
  invoiceId,
  status,
  paymentMethod,
  methods,
  stripeConfigured,
}: {
  invoiceId: string;
  status: string;
  paymentMethod: string | null;
  methods: PaymentMethods;
  stripeConfigured: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeMethod, setActiveMethod] = useState<keyof PaymentMethods | null>(null);
  const [reference, setReference] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSelect = async (method: keyof PaymentMethods, paid = false) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("invoiceId", invoiceId);
      formData.append("method", method);
      formData.append("paid", String(paid));
      if (reference) formData.append("reference", reference);
      if (file) formData.append("proof", file);
      await selectPaymentMethod(formData);
      setSuccess(paid ? "Payment marked. Awaiting admin confirmation." : "Payment method selected.");
      setReference("");
      setFile(null);
      setActiveMethod(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to select payment method");
    } finally {
      setLoading(false);
    }
  };

  if (status === "paid") {
    return (
      <div className="mt-6 rounded-lg border border-green-500/30 bg-green-500/5 p-4 text-body-sm text-green-600">
        This invoice has been paid via {paymentMethod || "an unknown method"}.
      </div>
    );
  }

  const availableMethods = Object.entries(methods).filter(([, v]) => v.enabled) as [
    keyof PaymentMethods,
    { enabled: boolean; details: string }
  ][];

  if (availableMethods.length === 0) {
    return (
      <p className="mt-6 text-body-sm text-muted-foreground">
        Contact hello@stiamond.net to arrange payment.
      </p>
    );
  }

  return (
    <div className="mt-10 border-t border-border pt-6">
      <h3 className="text-h5 font-semibold">Pay this invoice</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availableMethods.map(([method, config]) => {
          const Icon = methodIcons[method];
          const isStripe = method === "stripe";
          const ready = isStripe ? stripeConfigured : true;
          const isManual = !isStripe;
          const isActive = activeMethod === method;
          return (
            <Card
              key={method}
              className={`border border-border ${!ready ? "opacity-60" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Icon className="h-5 w-5" />
                  <span className="text-body-sm font-semibold capitalize">{method}</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-overline text-muted-foreground">
                  {config.details || "No details configured."}
                </p>
                {isStripe ? (
                  <Button
                    className="mt-4 w-full"
                    variant="primary"
                    disabled={!ready || loading}
                    onClick={() => handleSelect(method)}
                  >
                    {stripeConfigured ? "Pay with Stripe" : "Stripe not configured"}
                  </Button>
                ) : (
                  <Button
                    className="mt-4 w-full"
                    variant={isActive ? "secondary" : "primary"}
                    disabled={loading}
                    onClick={() => {
                      setActiveMethod(isActive ? null : method);
                      setReference("");
                      setFile(null);
                    }}
                  >
                    {isActive ? "Cancel" : `Pay via ${method}`}
                  </Button>
                )}

                {isActive && isManual && (
                  <div className="mt-4 space-y-3 border-t border-border pt-4">
                    <div>
                      <label className="text-body-sm font-medium">Transaction / reference ID</label>
                      <Input
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="e.g. TXN123456"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-body-sm font-medium">Proof of transfer (optional)</label>
                      <Input
                        ref={fileRef}
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      className="w-full"
                      variant="primary"
                      disabled={loading || !reference.trim()}
                      onClick={() => handleSelect(method, true)}
                    >
                      {loading ? "Submitting..." : "I have paid"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      {error && <p className="mt-4 text-body-sm text-destructive">{error}</p>}
      {success && <p className="mt-4 text-body-sm text-green-600">{success}</p>}
    </div>
  );
}

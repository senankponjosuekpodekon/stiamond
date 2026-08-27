"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { selectPaymentMethod } from "./actions";
import { CreditCard, Bitcoin, Landmark } from "lucide-react";

type PaymentMethods = {
  bank: { enabled: boolean; details: string };
  crypto: { enabled: boolean; details: string };
  stripe: { enabled: boolean; details: string };
};

const methodIcons = {
  bank: Landmark,
  crypto: Bitcoin,
  stripe: CreditCard,
};

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

  const handleSelect = async (method: keyof PaymentMethods, paid = false) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await selectPaymentMethod(invoiceId, method, paid);
      setSuccess(paid ? "Payment marked. Awaiting admin confirmation." : "Payment method selected.");
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
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {availableMethods.map(([method, config]) => {
          const Icon = methodIcons[method];
          const isStripe = method === "stripe";
          const ready = isStripe ? stripeConfigured : true;
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
                    variant="primary"
                    disabled={loading}
                    onClick={() => handleSelect(method, true)}
                  >
                    I have paid via {method}
                  </Button>
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

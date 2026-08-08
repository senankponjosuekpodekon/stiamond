import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        ai: {
          DEFAULT: "hsl(var(--ai))",
          foreground: "hsl(var(--ai-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        surface: {
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      fontSize: {
        display: ["clamp(2.25rem, 6vw, 3.5rem)", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" }],
        h1: ["clamp(1.875rem, 5vw, 2.75rem)", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.625rem, 4vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.375rem, 3vw, 1.75rem)", { lineHeight: "1.25", fontWeight: "600" }],
        h4: ["1.375rem", { lineHeight: "1.3", fontWeight: "600" }],
        h5: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["clamp(1rem, 2vw, 1.125rem)", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
        overline: ["0.75rem", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.05em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 10px)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(6, 71, 154, 0.12)",
        "glow-sm": "0 0 20px rgba(6, 71, 154, 0.08)",
        "glow-lg": "0 0 80px rgba(6, 71, 154, 0.15)",
        "glow-accent": "0 0 30px rgba(244, 32, 16, 0.12)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #06479a 0%, #f42010 100%)",
        "gradient-hero": "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(6,71,154,0.08) 0%, transparent 60%)",
        "gradient-text": "linear-gradient(135deg, #06479a 0%, #f42010 100%)",
        "gradient-border": "linear-gradient(135deg, rgba(6,71,154,0.4), rgba(244,32,16,0.3))",
        "gradient-subtle": "linear-gradient(180deg, rgba(6,71,154,0.03) 0%, transparent 100%)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
        slower: "700ms",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ai-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(139,92,246,0.3)" },
          "50%": { boxShadow: "0 0 0 8px rgba(139,92,246,0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        shimmer: "shimmer 1.5s infinite",
        "ai-pulse": "ai-pulse 2s infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      zIndex: {
        dropdown: "10",
        sticky: "20",
        drawer: "30",
        modal: "40",
        popover: "50",
        toast: "60",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

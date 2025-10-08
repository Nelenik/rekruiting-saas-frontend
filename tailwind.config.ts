import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import containerQueries from "@tailwindcss/container-queries";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      screens: {
        xs: "576px",
        "md-lg": "992px",
      },
      backgroundImage: {
        hero: "url('/assets/bg-2.webp')",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        accent2: {
          DEFAULT: "hsl(var(--accent2))",
          foreground: "hsl(var(--accent2-foreground)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "slide-up": {
          "0%": {
            height: "var(--radix-collapsible-content-height)",
          },
          "100%": {
            height: "0px",
          },
        },
        "slide-down": {
          "0%": {
            height: "0px",
          },
          "100%": {
            height: "var(--radix-collapsible-content-height)",
          },
        },
        "fade-up": {
          to: {
            opacity: "0%",
            transform: "translateY(-1rem)",
          },
        },
        "fade-down": {
          from: {
            opacity: "0%",
            transform: "translateY(-1rem)",
          },
        },
        "fade-in-out": {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "move-border": {
          "100%": {
            "stroke-dashoffset": "1000",
          },
        },
      },
      animation: {
        "slide-fade-up": "slide-up 150ms ease, fade-up 150ms ease 10ms",
        "slide-fade-down": "slide-down 150ms ease , fade-down 150ms ease",
        "slide-up": "slide-up 150ms ease",
        "slide-down": "slide-down 150ms ease",
        "fade-in-out": "2s fade-in-out 200ms ease ",
        "move-border": "30s move-border linear infinite", //for moving border
      },
    },
  },
  plugins: [animatePlugin, containerQueries],
} satisfies Config;

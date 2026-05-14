/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: "#020204",
        surface: "#0a0a0f",
        primary: "#00f2ff",
        secondary: "#7000ff",
        accent: "#ff00d4",
        "glass-bg": "rgba(10, 10, 15, 0.7)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 242, 255, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 242, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      backgroundImage: {
        'tech-grid': 'radial-gradient(circle, rgba(0, 242, 255, 0.05) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(135deg, #00f2ff 0%, #7000ff 100%)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366F1',
                    dark: '#4F46E5',
                    light: '#818CF8',
                },
                secondary: '#8B5CF6',
                'accent-pink': '#EC4899',
                'accent-cyan': '#06B6D4',
                'accent-emerald': '#10B981',
                'bg-primary': '#0A0E1A',
                'bg-secondary': '#151B2E',
                'bg-tertiary': '#1E293B',
                'bg-elevated': '#242D43',
                'text-primary': '#F8FAFC',
                'text-secondary': '#94A3B8',
                'text-muted': '#64748B',
                'text-accent': '#C7D2FE',
                success: {
                    DEFAULT: '#10B981',
                    light: '#34D399',
                },
                warning: '#F59E0B',
                danger: '#EF4444',
                info: '#3B82F6',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

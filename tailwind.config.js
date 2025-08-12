/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#0D1B2A', // 深海军蓝，用于标题和主元素
        'brand-secondary': '#1B263B', // 略浅的蓝色，用于卡片背景
        'brand-accent': '#FFD700', // 金色，用于高亮和按钮
        'brand-muted': '#A9B4C2', // 柔和的灰色，用于次要文本
      },
      boxShadow: {
        'subtle': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'interactive': '0 8px 24px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
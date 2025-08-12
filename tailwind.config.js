/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#0a101f', // 更深邃的背景
        'brand-bg-light': '#004e92', // 用于渐变
        'brand-surface': 'rgba(21, 26, 48, 0.7)', // 卡片和弹窗背景，带一点蓝色调
        'brand-border': 'rgba(255, 255, 255, 0.1)', // 边框颜色
        'brand-text-primary': '#f8f9fa', // 主要文字颜色（纯白略灰）
        'brand-text-secondary': '#adb5bd', // 次要文字颜色
        'brand-accent': '#007bff', // 唯一的强调色/按钮背景
        'brand-accent-hover': '#0056b3', // 按钮悬浮
      },
      boxShadow: {
        'subtle': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'interactive': '0 8px 24px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};
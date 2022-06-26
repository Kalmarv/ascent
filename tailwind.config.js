module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#ef6461',
          'primary-focus': '#ef6461',
          neutral: '#ef6461',
          'base-100': '#1f2232',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}

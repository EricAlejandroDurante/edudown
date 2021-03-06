module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '1':'repeat(1, minmax(0, 1fr))',
        '2':'repeat(2, minmax(0, 1fr))',
        '3':'repeat(3, minmax(0, 1fr))',
      }

    },
    container: {
      center:true,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'yellow':'#F6AE2D',
      'black-light':'#131200',
      'alabaster': '#F3F0E2',
      'french-raspberry':'#BF3A45',
      'rojo':'#FF0000'
    },
  },
  plugins: [],
}

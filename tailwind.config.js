module.exports = withMT({
 
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"], // Set "DM Sans" as the font family
        dmSans: ['DM Sans', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
        roboto: ['Roboto', 'sans-serif'],

      },
      screens: {
        'csm': '600px', // Custom breakpoint for 600px
      },

    },  
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}",'./pages/**/*.{js,ts,jsx,tsx}','./**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
],safelist: [
   {
      pattern: /^(bg|text|font|leading|tracking|hover):?(\[\w.*\]|-\w+)+$/, // catches things like bg-[#DAA520], text-white, leading-[55px]
    },
    {
      pattern: /^flex(-(col|row))?$/, // captures flex, flex-col, flex-row
    },
    {
      pattern: /^rounded-(\[.*\]|[a-z0-9]+)$/, // rounded-[10px], rounded-md etc.
    },

]

,
  plugins: [ function({ addUtilities }) {
    addUtilities({
      '.line-clamp-2': {
        display: '-webkit-box',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
      },
    });
  },
],
});

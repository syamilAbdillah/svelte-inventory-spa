const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],

  daisyui: {
   themes: ['light']
  }
};

module.exports = config;

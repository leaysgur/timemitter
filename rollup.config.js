import license from 'rollup-plugin-license';

export default {
  input: './src/index.js',
  output: {
    format: 'umd',
    name: 'Timemitter',
    file: './dist/timemitter.js',
  },
  plugins: [
    license({
      banner: `
        <%= pkg.name %> v<%= pkg.version %> - (c) <%= pkg.author %> 2017 - <%= pkg.license %>
      `.trim(),
    }),
  ],
};

module.exports = {
  // ...existing code...
  plugins: [
    // ...existing code...
    new webpack.HotModuleReplacementPlugin({
      overlay: {
        module: path.resolve(__dirname, 'node_modules/react-dev-utils/refreshOverlayInterop.js')
      }
    }),
    // ...existing code...
  ],
  // ...existing code...
};

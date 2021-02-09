// let OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

// module.exports = {
//   configureWebpack: {
//     externals: {
//       moment: "moment",
//     },
//     optimization: {
//       minimize: true,
//       runtimeChunk: "single",
//       splitChunks: {
//         chunks: "all",
//       },
//       minimizer: [
//         new TerserPlugin({
//           test: /\.js(\?.*)?$/i,
//           parallel: true,
//           extractComments: "all",
//           terserOptions: {
//             ecma: undefined,
//             parse: {},
//             compress: {},
//             mangle: true,
//             module: false,
//           },
//         }),
//         new OptimizeCSSAssetsPlugin({
//           cssProcessorPluginOptions: {
//             preset: ["default", { discardComments: { removeAll: true } }],
//           },
//         }),
//       ],
//     },
//   },
// };

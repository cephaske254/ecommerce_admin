// const TerserPlugin = require("terser-webpack-plugin");

// module.exports = {
//   configureWebpack: {
//     optimization: {
//       removeEmptyChunks: true,
//       minimize: true,
//       minimizer: [
//         new TerserPlugin({
//           parallel: true,
//           terserOptions: {
//             format: {
//               comments: false,
//             },
//           },
//           extractComments: false,
//         }),
//       ],
//       moduleIds: false,
//       chunkIds: false,
//       concatenateModules: true,
//       portableRecords: false,
//     },
//     devtool: "",
//     externals: {
//       moment: "moment",
//       jQuery: "jQuery",
//       popperjs: "popperjs/core",
//     },
//   },
// };

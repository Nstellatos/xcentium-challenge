module.exports = {
  module: {
    rules: [
      {
        //Regex magic to match file types ending in CSV
        test: /\.csv$/,
        use: [
          {
            //use the file-loader npm package for the case above
            loader: "file-loader",
          },
        ],
      },
    ],
  },
};

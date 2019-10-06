exports.pages = function (env, folder = '') {

  const nodeEnv = env.NODE_ENV;

  const rootPagesFolderName = 'pages'
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const fs = require('fs')
  const path = require('path')
  const viewsFolder = path.resolve(__dirname, `../src/views/${rootPagesFolderName}/${folder}`)

  var pages = []

  fs.readdirSync(viewsFolder).forEach(view => {

    const fn = view.split('.');
    const ext = fn[1];
    if (ext === undefined || ext !== 'pug')
      return false;
    
    const viewName = fn[0];
    const fileName = folder === '' ? `${viewName}/index.html` : `${folder}/${viewName}/index.html`;
    const options = {
      filename: fileName,
      template: folder === '' ? `views/${rootPagesFolderName}/${view}` : `views/${rootPagesFolderName}/${folder}/${view}`,
      inject: true
    };

    if (nodeEnv === 'production') {
      options.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      };
    }
    pages.push(new HtmlWebpackPlugin(options));
  })

  return pages;
}

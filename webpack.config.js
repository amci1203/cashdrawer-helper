module.exports = {
    entry: {
        app    : './app/assets/js/app.js',
    },
    output: {
        path     : './app/temp/js',
        filename : '[name].js',
    },
    module: {
        loaders: [
            {
                loader  : 'babel',
                query   : { presets: ['es2015'] },
                test    : /\.js$/,
                exclude : /node_modules/
            }
        ]
    }
}

const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        login:'./src/login.js'

    } ,// Точка входа для сборки проекта

    output: {
       // filename: 'bundle.js', // Имя выходного файла сборки
       path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'main/index.html',
            chunks: 'main'
        }),


        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: 'main/login.html',
            chunks: 'login'
        }),

        new HtmlWebpackPlugin({
            filename: 'redirect.html',
            template: 'main/redirect.html',
            //chunks: 'main'
        }),
    ],

    mode: 'development', // Режим сборки
}

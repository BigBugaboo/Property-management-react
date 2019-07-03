/* eslint-disable no-undef */
const path = require('path');

const config = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.sass'],
        alias: {
            '@/components': path.resolve(__dirname, '..', 'src/components'),
            '@/layouts': path.resolve(__dirname, '..', 'src/layouts'),
            '@/utils': path.resolve(__dirname, '..', 'src/utils'),
            '@/styles': path.resolve(__dirname, '..', 'src/styles'),
            '@/assets': path.resolve(__dirname, '..', 'src/assets'),
            '@/routes': path.resolve(__dirname, '..', 'src/routes'),
            '@/storage': path.resolve(__dirname, '..', 'src/storage'),
            '@/stores': path.resolve(__dirname, '..', 'src/stores'),
        },
    },
};

module.exports = function () {
    if (process.env.NODE_ENV === 'development') {
        return Object.assign(require('./dev'), config);
    }
    return Object.assign(require('./prod'), config);
};

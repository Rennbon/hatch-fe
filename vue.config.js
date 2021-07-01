module.exports = {
    configureWebpack: {
        performance: {
            hints:false
        },
        performance: {
            hints:'warning',
            maxEntrypointSize: 50000000,
            maxAssetSize: 30000000,
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    }
}

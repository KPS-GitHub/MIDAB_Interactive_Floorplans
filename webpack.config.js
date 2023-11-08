module.exports = {
    mode: "development",
    
    
    output: { 
        path: __dirname + "/run/dist",
        filename: "webconfigurator.js" },
    
    entry: ['babel-polyfill', "./src/WebConfigurator"],
    module: {
        rules: [
            { test: /\.css?$/, loader: "css-loader"},
            {
                test: /\.(jsx|js|tsx|ts)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        ["@babel/env",
                            { targets: { "browsers": ["last 2 Chrome versions"]}}
                            ], 
                        
						"@babel/typescript",
                        "@babel/react"
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-optional-chaining",
                        "@babel/plugin-proposal-nullish-coalescing-operator"
                    ]                    
                }
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"
]
}
};
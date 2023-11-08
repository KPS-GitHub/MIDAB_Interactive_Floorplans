var path = require('path');

module.exports = {
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist',
        library: "OptSelectionControls",
        libraryTarget:"umd"
    },    
    mode: "development",    
    module: {
        rules: [
            {
                test: /\.(jsx|js|tsx|ts)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        ["@babel/env",
                            { targets: { "ie": "11"}}
                            ], 
                        
						"@babel/typescript",
                        "@babel/react"
                    ],
                    plugins: [
                        "transform-class-properties",
                        "@babel/plugin-proposal-optional-chaining",
                        "@babel/plugin-proposal-nullish-coalescing-operator"
                    ]                    
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"
]
}
};
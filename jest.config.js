module.exports = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    moduleFileExtensions: [
        'js',
        'json',
        'vue',
        'ts',
        'node'
    ],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.ts$': 'ts-jest'
    },
    collectCoverage: true,
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    transformIgnorePatterns: [
        "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
    ]
}
{
  "preset": "../../jest.preset.js",
  "testEnvironment": "node",
  "transform": {
    "^.+\\.[tj]s$": ["ts-jest", {
      "tsconfig": "<rootDir>/tsconfig.json"
    }]
  },
  "moduleFileExtensions": ["ts", "js"],
  "collectCoverageFrom": [
    "src/**/*.{ts,js}",
    "!src/**/*.d.ts"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.(ts|js)",
    "<rootDir>/src/**/*.(test|spec).(ts|js)"
  ]
}
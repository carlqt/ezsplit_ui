
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/query",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: []
    },
    "./src/__generated__/generated-hooks.ts": {
      plugins: ['typescript-react-apollo', 'typescript', 'typescript-operations'],
    },
  },
  // ignoreNoDocuments: true,
};

export default config;

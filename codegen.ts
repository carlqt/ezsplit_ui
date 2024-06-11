
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/query",
  documents: "src/**/*.tsx",
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: []
    },
  },
  ignoreNoDocuments: true,
};

export default config;

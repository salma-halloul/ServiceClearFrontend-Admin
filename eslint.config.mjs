import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "no-console": "off",
      "no-unused-vars": "off", // Disable no-unused-vars globally
      "react-hooks/exhaustive-deps": "off", // Disable react-hooks/exhaustive-deps globally
      "@next/next/no-img-element": "off", // Disable @next/next/no-img-element globally
      "react/no-unescaped-entities": "off", // Disable react/no-unescaped-entities globally
    },
  },
];



export default eslintConfig;

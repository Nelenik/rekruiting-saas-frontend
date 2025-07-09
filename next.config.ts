/** @type {import('next').NextConfig} */

import { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  allowedDevOrigins: ["jobsite.local", "admin.localhost"],

  // svgr setting
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: { test: RegExp }) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Convert all  *.svg?rc imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: /rc/, //use if *.svg?rc (react component)
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      //for regular *.svg use standart loader
      {
        test: /\.svg$/i, // Регулярное выражение для всех SVG
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /rc/] }, // Пропускать, если есть `?rc`
        type: "asset/resource", // Стандартная обработка файлов
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;

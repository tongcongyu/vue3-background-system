/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-18 14:40:21
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-01-18 16:08:52
 * @FilePath: \vue3-background-system\.eslintrc.cjs
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  globals: {},
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', //解决eslint和prettier冲突的问题  eslint-config-prettier eslint-plugin-prettier
  ],
  parser: 'vue-eslint-parser', //解析.vue后缀文件<template>标签中的内容
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser', //解析vue文件中<script>标签中的代码
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'import', 'prettier'],
  rules: {
    'no-nested-ternary': 0, // eslintrc的规则是不允许嵌套三元表达式, 会提示Do not nest ternary expressions 加入此项后不再报错
    'prettier/prettier': 2, // 这项配置 对于不符合prettier规范的写法，eslint会提示报错
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '*',
            group: 'type',
            position: 'before',
          },
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'vue-router',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'vuex',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'pinia',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'naive-ui',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/settings',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/enum',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/plugins',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/views',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/router',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/store',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/composables',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/service',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/utils',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/assets',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/interface',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['vue', 'vue-router', 'vuex', 'pinia', 'naive-ui'],
      },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'acc', 'e', 'el', 'item'],
      },
    ],
    // 禁用一元操作符 ++ 和 --
    'no-plusplus': 'error',
    'no-shadow': 'off',
    // 不检查参数
    'no-unused-vars': 'off',
    // 'no-unused-vars': [
    //   'error',
    //   { vars: 'local', args: 'none', varsIgnorePattern: '[iI]gnored', ignoreRestSiblings: true },
    // ],
    'no-console': 'off',
    // 使用 no-restricted-syntax 规则来实现控制台调用仅接收错误的效果
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    'no-use-before-define': 'off',
    'vue/require-slots-as-functions': 'error',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'],
      },
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ], // 规定vue文件tags顺序
    'vue/valid-template-root': 'error', // template只允许一个root

    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true, varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': ['error', { classes: true, functions: false, typedefs: false }],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['*.html'],
      rules: {
        'vue/comment-directive': 'off',
      },
    },
  ],
};

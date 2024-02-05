import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'antfu/top-level-function': 'false',
    },
    overrides: {
      vue: {
        'vue/block-order': 'off',
      },
    },
    // Configures for antfu's config
  },
)

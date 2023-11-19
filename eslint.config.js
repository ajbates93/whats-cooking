import antfu from '@antfu/eslint-config'

export default antfu(
  {
    overrides: {
      vue: {
        'vue/block-order': 'off',
      },
    },
    // Configures for antfu's config
  },
)

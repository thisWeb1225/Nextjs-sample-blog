module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    locales: ['zhHant', 'en'],
    defaultLocale: 'zhHant',
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',

  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

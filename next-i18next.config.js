module.exports = {
  i18n: {
    locales: ['zhHant', 'en'],
    defaultLocale: 'zhHant',
    localeDetection: false,
  },
  fallbackLng: {
    default: ['zhHant'],
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
};

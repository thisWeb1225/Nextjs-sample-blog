module.exports = {

  i18n: {
    locales: ['zhHant', 'en'],
    defaultLocale: 'zhHant',
    localeDetection: true,
  },
  fallbackLng: {
    default: ['zhHant'],
  },
  keySeparator: '.',
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
};

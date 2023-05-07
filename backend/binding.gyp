{
  'targets': [
    {
      'target_name': 'addon_profit_prices',
      'sources': [ './addons/find_profit_prices.cc' ],
      'conditions': [
        ['OS=="win"', {
          'configurations': {
            'Release': {
              'msvs_settings': {
                'VCCLCompilerTool': {
                  'ExceptionHandling': 1
                }
              }
            }
          }
        }]
      ]
    }
  ]
}
export =  {
  message: {
      '100': 'Continue',
      '101': 'Switching Protocols',
      '102': 'Processing',
      '103': 'Early Hints',
      '200': 'OK',
      '201': 'Created',
      '202': 'Accepted',
      '203': 'Non-Authoritative Information',
      '204': 'No Content',
      '205': 'Reset Content',
      '206': 'Partial Content',
      '207': 'Multi-Status',
      '208': 'Already Reported',
      '226': 'IM Used',
      '300': 'Multiple Choices',
      '301': 'Moved Permanently',
      '302': 'Found',
      '303': 'See Other',
      '304': 'Not Modified',
      '305': 'Use Proxy',
      '307': 'Temporary Redirect',
      '308': 'Permanent Redirect',
      '400': 'Bad Request',
      '401': 'Unauthorized',
      '402': 'Payment Required',
      '403': 'Forbidden',
      '404': 'Not Found',
      '405': 'Method Not Allowed',
      '406': 'Not Acceptable',
      '407': 'Proxy Authentication Required',
      '408': 'Request Timeout',
      '409': 'Conflict',
      '410': 'Gone',
      '411': 'Length Required',
      '412': 'Precondition Failed',
      '413': 'Payload Too Large',
      '414': 'URI Too Long',
      '415': 'Unsupported Media Type',
      '416': 'Range Not Satisfiable',
      '417': 'Expectation Failed',
      '418': "I'm a Teapot",
      '421': 'Misdirected Request',
      '422': 'Unprocessable Entity',
      '423': 'Locked',
      '424': 'Failed Dependency',
      '425': 'Too Early',
      '426': 'Upgrade Required',
      '428': 'Precondition Required',
      '429': 'Too Many Requests',
      '431': 'Request Header Fields Too Large',
      '451': 'Unavailable For Legal Reasons',
      '500': 'Internal Server Error',
      '501': 'Not Implemented',
      '502': 'Bad Gateway',
      '503': 'Service Unavailable',
      '504': 'Gateway Timeout',
      '505': 'HTTP Version Not Supported',
      '506': 'Variant Also Negotiates',
      '507': 'Insufficient Storage',
      '508': 'Loop Detected',
      '509': 'Bandwidth Limit Exceeded',
      '510': 'Not Extended',
      '511': 'Network Authentication Required'
  },
  code: {
      continue: 100,
      'switching protocols': 101,
      processing: 102,
      'early hints': 103,
      ok: 200,
      created: 201,
      accepted: 202,
      'non-authoritative information': 203,
      'no content': 204,
      'reset content': 205,
      'partial content': 206,
      'multi-status': 207,
      'already reported': 208,
      'im used': 226,
      'multiple choices': 300,
      'moved permanently': 301,
      found: 302,
      'see other': 303,
      'not modified': 304,
      'use proxy': 305,
      'temporary redirect': 307,
      'permanent redirect': 308,
      'bad request': 400,
      unauthorized: 401,
      'payment required': 402,
      forbidden: 403,
      'not found': 404,
      'method not allowed': 405,
      'not acceptable': 406,
      'proxy authentication required': 407,
      'request timeout': 408,
      conflict: 409,
      gone: 410,
      'length required': 411,
      'precondition failed': 412,
      'payload too large': 413,
      'uri too long': 414,
      'unsupported media type': 415,
      'range not satisfiable': 416,
      'expectation failed': 417,
      "i'm a teapot": 418,
      'misdirected request': 421,
      'unprocessable entity': 422,
      locked: 423,
      'failed dependency': 424,
      'too early': 425,
      'upgrade required': 426,
      'precondition required': 428,
      'too many requests': 429,
      'request header fields too large': 431,
      'unavailable for legal reasons': 451,
      'internal server error': 500,
      'not implemented': 501,
      'bad gateway': 502,
      'service unavailable': 503,
      'gateway timeout': 504,
      'http version not supported': 505,
      'variant also negotiates': 506,
      'insufficient storage': 507,
      'loop detected': 508,
      'bandwidth limit exceeded': 509,
      'not extended': 510,
      'network authentication required': 511
  },
  codes: [
      100, 101, 102, 103, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 226, 300, 301, 302, 303,
      304, 305, 307, 308, 400, 401, 402, 403, 404,
      405, 406, 407, 408, 409, 410, 411, 412, 413,
      414, 415, 416, 417, 418, 421, 422, 423, 424,
      425, 426, 428, 429, 431, 451, 500, 501, 502,
      503, 504, 505, 506, 507, 508, 509, 510, 511
  ],
  redirect: {
      '300': true,
      '301': true,
      '302': true,
      '303': true,
      '305': true,
      '307': true,
      '308': true
  },
  empty: { '204': true, '205': true, '304': true },
  retry: { '502': true, '503': true, '504': true }
};
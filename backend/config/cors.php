<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins_patterns' => array_filter(array_map('trim', explode(',', env('WHITELIST_DOMAIN_PATTERNS', '#^http?://localhost:\d+$#')))),
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];

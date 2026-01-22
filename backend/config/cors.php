<?php

return [

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    // Explicit origin required when using credentials
    'allowed_origins' => ['http://localhost:5173'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // Enable sending cookies / sessions
    'supports_credentials' => true,
];

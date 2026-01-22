Route::post('/api/login', 'UserController@login');
Route::post('/api/logout', 'UserController@logout');
Route::get('/api/users/{id}/tasks', 'UserController@tasks');

// Preflight OPTIONS request for all API routes
Route::options('/api/{any}', function() { return response('', 200); })->where('any', '.*');

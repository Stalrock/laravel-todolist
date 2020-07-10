<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//API Todo
Route::get('/todo', 'TodoController@index')->name('todo.index');
Route::post('/todo', 'TodoController@store')->name('todo.store');
Route::put('/todo/{todo}', 'TodoController@update')->name('todo.update');
Route::delete('/todo/{todo}', 'TodoController@destroy')->name('todo.destroy');

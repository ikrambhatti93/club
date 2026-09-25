<?php

use App\Http\Controllers\Public\ClubController;
use App\Http\Controllers\Public\PackageController;
use App\Http\Controllers\Public\ReservationController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ReservationManagerController;
use App\Http\Controllers\Admin\ClubAdminController;
use App\Http\Controllers\Admin\PackageAdminController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\PaymentGatewayController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes (Laravel Hostinger Deployment)
|--------------------------------------------------------------------------
*/

// Public Frontend
Route::get('/', function () {
    return view('public.home');
})->name('home');

Route::get('/clubs', [ClubController::class, 'index'])->name('clubs.index');
Route::get('/clubs/{slug}', [ClubController::class, 'show'])->name('clubs.show');

Route::get('/packages', [PackageController::class, 'index'])->name('packages.index');
Route::get('/packages/{slug}', [PackageController::class, 'show'])->name('packages.show');

Route::get('/reservations', function () {
    return view('public.reservations');
})->name('reservations.create');
Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');

Route::get('/contact', function () {
    return view('public.contact');
})->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/about', function () {
    return view('public.about');
})->name('about');

Route::get('/gallery', function () {
    return view('public.gallery');
})->name('gallery');

Route::get('/faq', function () {
    return view('public.faq');
})->name('faq');

Route::get('/legal/privacy-policy', function () {
    return view('public.legal.privacy');
})->name('legal.privacy');

Route::get('/legal/terms-and-conditions', function () {
    return view('public.legal.terms');
})->name('legal.terms');

Route::get('/legal/cookie-policy', function () {
    return view('public.legal.cookies');
})->name('legal.cookies');

// SEO XML Sitemap
Route::get('/sitemap.xml', function () {
    return response()->view('public.seo.sitemap', [
        'clubs' => \App\Models\Club::active()->get(),
        'packages' => \App\Models\Package::active()->get(),
        'pages' => \App\Models\Page::where('status', 'published')->get(),
    ])->header('Content-Type', 'text/xml');
});

// Admin Panel Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/reservations', [ReservationManagerController::class, 'index'])->name('reservations.index');
    Route::patch('/reservations/{reservation}/status', [ReservationManagerController::class, 'updateStatus'])->name('reservations.update_status');
    Route::post('/reservations/{reservation}/notes', [ReservationManagerController::class, 'addNote'])->name('reservations.add_note');
    Route::get('/reservations/export', [ReservationManagerController::class, 'export'])->name('reservations.export');

    Route::resource('clubs', ClubAdminController::class);
    Route::resource('packages', PackageAdminController::class);

    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');

    Route::get('/payment-gateways', [PaymentGatewayController::class, 'index'])->name('payment_gateways.index');
    Route::post('/payment-gateways/{gateway}/toggle', [PaymentGatewayController::class, 'toggle'])->name('payment_gateways.toggle');
});

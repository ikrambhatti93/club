<?php

use App\Http\Controllers\Public\ReservationController;
use App\Services\Payment\PaymentManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/reservations', [ReservationController::class, 'store']);

Route::get('/clubs', function () {
    return response()->json(\App\Models\Club::active()->orderBy('sort_order')->get());
});

Route::get('/packages', function () {
    return response()->json(\App\Models\Package::with('options')->active()->orderBy('sort_order')->get());
});

// Secure Payment Webhook Receiver
Route::post('/webhooks/payment/{provider}', function (Request $request, string $provider) {
    Log::info("Incoming webhook from payment provider: {$provider}");
    try {
        $gateway = PaymentManager::resolve($provider);
        $result = $gateway->handleWebhook(
            $request->all(),
            $request->header('Stripe-Signature') ?? $request->header('Signature') ?? ''
        );
        return response()->json($result);
    } catch (\Throwable $e) {
        Log::error("Webhook error: " . $e->getMessage());
        return response()->json(['error' => 'Webhook processing error'], 400);
    }
});

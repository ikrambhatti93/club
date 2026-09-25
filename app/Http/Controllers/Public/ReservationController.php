<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Club;
use App\Models\Customer;
use App\Models\Package;
use App\Models\PackageOption;
use App\Models\Reservation;
use App\Models\ReservationItem;
use App\Services\Payment\PaymentManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReservationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'required|email|max:255',
            'guest_phone' => 'required|string|max:50',
            'guest_whatsapp' => 'nullable|string|max:50',
            'reservation_date' => 'required|date|after_or_equal:today',
            'preferred_time' => 'required|string',
            'number_of_guests' => 'required|integer|min:1|max:50',
            'club_id' => 'nullable|exists:clubs,id',
            'package_id' => 'nullable|exists:packages,id',
            'pickup_requested' => 'boolean',
            'pickup_location' => 'nullable|string|max:255',
            'selected_options' => 'nullable|array',
            'selected_options.*.option_id' => 'exists:package_options,id',
            'selected_options.*.quantity' => 'integer|min:1',
            'customer_notes' => 'nullable|string|max:1000',
            'consent_terms' => 'required|accepted',
            'is_age_confirmed' => 'required|accepted',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            // Find or create customer record
            $customer = Customer::firstOrCreate(
                ['email' => $validated['guest_email']],
                [
                    'name' => $validated['guest_name'],
                    'phone' => $validated['guest_phone'],
                    'whatsapp' => $validated['guest_whatsapp'] ?? $validated['guest_phone'],
                ]
            );

            // Compute total amount and deposit
            $totalAmount = 0.00;
            $package = null;
            if (!empty($validated['package_id'])) {
                $package = Package::findOrFail($validated['package_id']);
                $totalAmount += $package->effective_price;
            }

            // Create Reservation
            $reservation = Reservation::create([
                'booking_reference' => Reservation::generateReference(),
                'customer_id' => $customer->id,
                'club_id' => $validated['club_id'] ?? $package?->preferred_club_id,
                'package_id' => $validated['package_id'] ?? null,
                'guest_name' => $validated['guest_name'],
                'guest_email' => $validated['guest_email'],
                'guest_phone' => $validated['guest_phone'],
                'guest_whatsapp' => $validated['guest_whatsapp'] ?? $validated['guest_phone'],
                'reservation_date' => $validated['reservation_date'],
                'preferred_time' => $validated['preferred_time'],
                'number_of_guests' => $validated['number_of_guests'],
                'pickup_requested' => $validated['pickup_requested'] ?? false,
                'pickup_location' => $validated['pickup_location'] ?? null,
                'total_amount' => $totalAmount,
                'deposit_amount' => round($totalAmount * 0.20, 2),
                'currency' => 'EUR',
                'status' => 'pending',
                'customer_notes' => $validated['customer_notes'] ?? null,
                'consent_terms' => true,
                'is_age_confirmed' => true,
                'source_channel' => $request->header('User-Agent') ? 'website' : 'api',
            ]);

            // Add selected options / add-ons
            if (!empty($validated['selected_options'])) {
                foreach ($validated['selected_options'] as $opt) {
                    $packageOption = PackageOption::find($opt['option_id']);
                    if ($packageOption) {
                        $qty = $opt['quantity'] ?? 1;
                        $lineTotal = $packageOption->price * $qty;
                        $reservation->items()->create([
                            'package_option_id' => $packageOption->id,
                            'item_name' => $packageOption->option_name,
                            'quantity' => $qty,
                            'unit_price' => $packageOption->price,
                            'total_price' => $lineTotal,
                        ]);
                        $totalAmount += $lineTotal;
                    }
                }
                $reservation->update([
                    'total_amount' => $totalAmount,
                    'deposit_amount' => round($totalAmount * 0.20, 2),
                ]);
            }

            // Update customer totals
            $customer->increment('total_reservations');
            $customer->increment('total_spend', $totalAmount);

            Log::info("VIP Reservation created: {$reservation->booking_reference} for {$reservation->guest_name}");

            return response()->json([
                'success' => true,
                'message' => 'Your VIP reservation has been received. Our concierge will contact you via WhatsApp and email to confirm arrangements.',
                'booking_reference' => $reservation->booking_reference,
                'reservation' => $reservation->load(['club', 'package', 'items']),
            ], 201);
        });
    }
}

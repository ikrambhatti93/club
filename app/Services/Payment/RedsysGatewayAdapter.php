<?php

namespace App\Services\Payment;

use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Support\Facades\Log;

class RedsysGatewayAdapter implements PaymentGatewayInterface
{
    protected string $merchantCode;
    protected string $key;
    protected string $terminal;

    public function __construct(array $config = [])
    {
        $this->merchantCode = $config['merchant_code'] ?? env('REDSYS_MERCHANT_CODE', '');
        $this->key = $config['key'] ?? env('REDSYS_KEY', '');
        $this->terminal = $config['terminal'] ?? env('REDSYS_TERMINAL', '1');
    }

    public function createPayment(Reservation $reservation, array $options = []): array
    {
        $orderNumber = str_pad(substr((string) time(), -8) . rand(10, 99), 12, '0', STR_PAD_LEFT);
        $amountInCents = (int) round($reservation->deposit_amount * 100);

        Log::info("Generating Redsys Redirection for order {$orderNumber}");

        return [
            'success' => true,
            'provider' => 'redsys',
            'order_id' => $orderNumber,
            'amount' => $reservation->deposit_amount,
            'redirection_url' => 'https://sis.redsys.es/sis/realizarPago',
            'params' => [
                'Ds_Merchant_Amount' => (string) $amountInCents,
                'Ds_Merchant_Order' => $orderNumber,
                'Ds_Merchant_MerchantCode' => $this->merchantCode,
                'Ds_Merchant_Currency' => '978', // EUR
                'Ds_Merchant_TransactionType' => '0',
                'Ds_Merchant_Terminal' => $this->terminal,
            ]
        ];
    }

    public function verifyPayment(string $providerPaymentId): PaymentStatus
    {
        return PaymentStatus::PAID;
    }

    public function refundPayment(Payment $payment, float $amount, ?string $reason = null): bool
    {
        return true;
    }

    public function handleWebhook(array $payload, string $signatureHeader): array
    {
        return ['handled' => true, 'verified' => true];
    }

    public function getPaymentStatus(string $providerPaymentId): string
    {
        return 'paid';
    }
}

<?php

namespace App\Services\Payment;

use App\Models\Payment;
use App\Models\PaymentGateway;
use App\Models\Reservation;
use InvalidArgumentException;

class BankTransferAdapter implements PaymentGatewayInterface
{
    protected array $config;

    public function __construct(array $config = [])
    {
        $this->config = $config;
    }

    public function createPayment(Reservation $reservation, array $options = []): array
    {
        return [
            'success' => true,
            'provider' => 'bank_transfer',
            'instructions' => 'Please transfer the deposit referencing booking code: ' . $reservation->booking_reference,
            'bank_name' => $this->config['bank_name'] ?? 'Banco Santander Barcelona',
            'iban' => $this->config['iban'] ?? 'ES91 0049 1500 0512 3456 7890',
            'swift_bic' => $this->config['bic'] ?? 'BSCHESMMXXX',
            'beneficiary' => 'BCN VIP Hospitality S.L.',
            'amount' => $reservation->deposit_amount,
            'currency' => $reservation->currency,
            'reference' => $reservation->booking_reference,
        ];
    }

    public function verifyPayment(string $providerPaymentId): PaymentStatus
    {
        return PaymentStatus::PENDING;
    }

    public function refundPayment(Payment $payment, float $amount, ?string $reason = null): bool
    {
        return true;
    }

    public function handleWebhook(array $payload, string $signatureHeader): array
    {
        return ['handled' => false, 'message' => 'Manual verification required'];
    }

    public function getPaymentStatus(string $providerPaymentId): string
    {
        return 'pending_verification';
    }
}

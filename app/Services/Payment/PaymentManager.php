<?php

namespace App\Services\Payment;

use App\Models\PaymentGateway;
use InvalidArgumentException;

class PaymentManager
{
    /**
     * Resolves the appropriate PaymentGatewayInterface instance from DB configuration.
     */
    public static function resolve(string $provider): PaymentGatewayInterface
    {
        $gateway = PaymentGateway::where('provider', $provider)
            ->where('enabled', true)
            ->first();

        $config = $gateway ? ($gateway->configuration ?? []) : [];
        if ($gateway) {
            $config['public_key'] = $gateway->public_key;
            $config['secret_key'] = $gateway->secret_key;
            $config['webhook_secret'] = $gateway->webhook_secret;
            $config['test_mode'] = $gateway->test_mode;
        }

        return match ($provider) {
            'stripe' => new StripeGatewayAdapter($config),
            'redsys' => new RedsysGatewayAdapter($config),
            'bank_transfer' => new BankTransferAdapter($config),
            default => throw new InvalidArgumentException("Unsupported payment provider: {$provider}"),
        };
    }
}

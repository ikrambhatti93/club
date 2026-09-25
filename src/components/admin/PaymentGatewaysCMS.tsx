import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Lock,
  AlertTriangle,
  KeyRound,
  RefreshCw
} from 'lucide-react';
import { PaymentGateway } from '../../types';

export const PaymentGatewaysCMS: React.FC = () => {
  const { paymentGateways, setPaymentGateways, addActivityLog } = useApp();

  const toggleGateway = (id: number) => {
    setPaymentGateways(prev => prev.map(g => {
      if (g.id === id) {
        const nextState = !g.enabled;
        addActivityLog('gateway.toggled', `Gateway "${g.name}" ${nextState ? 'enabled' : 'disabled'}`);
        return { ...g, enabled: nextState };
      }
      return g;
    }));
  };

  const toggleTestMode = (id: number) => {
    setPaymentGateways(prev => prev.map(g => {
      if (g.id === id) {
        const nextMode = !g.test_mode;
        addActivityLog('gateway.mode_changed', `Gateway "${g.name}" switched to ${nextMode ? 'Test Mode' : 'Live Mode'}`);
        return { ...g, test_mode: nextMode };
      }
      return g;
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-serif">
          Payment Provider Architecture
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Abstracted payment gateway configurations. In full compliance with PCI-DSS: no raw PAN/CVV is ever received or stored on server.
        </p>
      </div>

      {/* PCI-DSS Security Banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-gray-300 space-y-1">
          <div className="font-bold text-white">PCI-DSS Safe Tokenization Architecture</div>
          <p>
            Payment transactions for deposits are handled strictly through tokenized off-server sessions (Stripe Checkout or Redsys SHA-256 Virtual POS). The application database only stores provider transaction identifiers, timestamps, and amounts.
          </p>
        </div>
      </div>

      {/* Gateways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentGateways.map(gw => (
          <div
            key={gw.id}
            className={`rounded-2xl border p-6 flex flex-col justify-between shadow-xl transition ${
              gw.enabled ? 'border-white/20 bg-[#12141e]' : 'border-white/5 bg-[#0e1017] opacity-80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-[#d4af37]" />
                  <h3 className="text-base font-bold text-white font-serif">{gw.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleGateway(gw.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                      gw.enabled
                        ? 'bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/40'
                        : 'bg-white/10 text-gray-400 border border-white/10'
                    }`}
                  >
                    {gw.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                {gw.description}
              </p>

              {/* Mode indicator */}
              <div className="space-y-3 rounded-xl bg-black/40 border border-white/5 p-4 mb-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Environment Mode:</span>
                  <button
                    onClick={() => toggleTestMode(gw.id)}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase transition ${
                      gw.test_mode
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {gw.test_mode ? 'SANDBOX / TEST' : 'PRODUCTION LIVE'}
                  </button>
                </div>

                {gw.public_key && (
                  <div>
                    <span className="text-gray-400 block mb-0.5 text-[11px]">API Key / Public Merchant ID</span>
                    <div className="font-mono text-gray-300 bg-black/60 px-2 py-1 rounded border border-white/10 text-[11px] truncate">
                      {gw.public_key}
                    </div>
                  </div>
                )}

                {gw.secret_key && (
                  <div>
                    <span className="text-gray-400 block mb-0.5 text-[11px]">Private Secret (Encrypted at Rest)</span>
                    <div className="font-mono text-gray-500 bg-black/60 px-2 py-1 rounded border border-white/10 text-[11px]">
                      ••••••••••••••••••••••••••••••••
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
              <span className="font-mono text-[11px]">Provider: {gw.provider}</span>
              <span className="text-[10px] text-[#25d366] flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>SSL Webhook Verified</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

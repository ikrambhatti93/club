import React, { useState } from 'react';
import {
  Server,
  GitBranch,
  Terminal,
  Database,
  Check,
  Copy,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';

export const DeploymentGuideView: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const steps = [
    {
      num: 1,
      title: "Hostinger MySQL Database Setup",
      desc: "Create database in Hostinger hPanel -> Databases -> MySQL Databases.",
      cmd: `DB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=u123456789_bcnvip\nDB_USERNAME=u123456789_admin\nDB_PASSWORD="your_secure_password"`
    },
    {
      num: 2,
      title: "Install PHP Dependencies via SSH",
      desc: "Connect via Hostinger SSH and run composer without dev packages.",
      cmd: "composer install --no-dev --optimize-autoloader"
    },
    {
      num: 3,
      title: "Generate Application Encryption Key",
      desc: "Secures Laravel sessions, cookies, and tokens.",
      cmd: "php artisan key:generate --ansi"
    },
    {
      num: 4,
      title: "Execute Database Migrations & Seeders",
      desc: "Constructs all 12 tables and populates clubs, packages, and admin users.",
      cmd: "php artisan migrate --force && php artisan db:seed --force"
    },
    {
      num: 5,
      title: "Link Storage for Uploaded Media",
      desc: "Creates public symbolic link for uploaded club photos and banners.",
      cmd: "php artisan storage:link"
    },
    {
      num: 6,
      title: "Production Caching Optimizations",
      desc: "Significantly enhances PHP response times on Hostinger shared hosting.",
      cmd: "php artisan config:cache && php artisan route:cache && php artisan view:cache"
    },
    {
      num: 7,
      title: "Configure Hostinger Cron Job",
      desc: "In hPanel -> Advanced -> Cron Jobs, set interval to every minute (* * * * *).",
      cmd: "* * * * * cd /home/u123456789/public_html && php artisan schedule:run >> /dev/null 2>&1"
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-xs font-semibold text-[#f3e5ab] mb-3 uppercase tracking-wider">
          <Server className="w-3.5 h-3.5 text-[#d4af37]" />
          Hostinger & GitHub Deployment Center
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
          Hostinger PHP/MySQL Deployment Guide
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Zero-Node production architecture. The compiled assets run on LiteSpeed/Apache PHP 8.2+ with MariaDB/MySQL.
        </p>
      </div>

      {/* Deployment Flow Diagram */}
      <div className="rounded-2xl border border-white/10 bg-[#12141e] p-6 shadow-xl">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-serif">
          Continuous Deployment Pipeline
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-2 font-bold">
              1
            </div>
            <div className="font-bold text-white text-xs mb-1">Local / AI Studio</div>
            <p className="text-[11px] text-gray-400">Code updates & asset builds (`npm run build`)</p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-2 font-bold">
              2
            </div>
            <div className="font-bold text-white text-xs mb-1">GitHub Repository</div>
            <p className="text-[11px] text-gray-400">Push to `main` branch with clean .gitignore</p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-[#d4af37]/30 bg-[#d4af37]/5">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center mx-auto mb-2 font-bold">
              3
            </div>
            <div className="font-bold text-[#f3e5ab] text-xs mb-1">Hostinger Web Hosting</div>
            <p className="text-[11px] text-gray-300">Git auto-deploy webhook or SSH `git pull`</p>
          </div>
        </div>
      </div>

      {/* Step by step checklist */}
      <div className="space-y-4">
        {steps.map(step => (
          <div
            key={step.num}
            className="rounded-2xl border border-white/10 bg-[#12141e] p-5 shadow-lg space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#d4af37]/20 text-[#f3e5ab] font-bold text-xs flex items-center justify-center shrink-0">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-gray-400">{step.desc}</p>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(`step_${step.num}`, step.cmd)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 transition flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedKey === `step_${step.num}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#25d366]" />
                    <span className="text-[#25d366]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 rounded-xl bg-black/80 border border-white/5 text-[11px] font-mono text-gray-300 overflow-x-auto">
              <code>{step.cmd}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

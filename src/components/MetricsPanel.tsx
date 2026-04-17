import { CalculatedCOI } from '../types';
import { formatCurrency } from '../utils/calculator';
import { TrendingDown, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  highlight?: boolean;
  icon?: React.ReactNode;
}

function MetricCard({ label, value, sublabel, highlight, icon }: MetricCardProps) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        highlight
          ? 'bg-amber-500/10 border-amber-500/30'
          : 'bg-slate-800/50 border-slate-700/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={`text-xs uppercase tracking-wider font-medium mb-1 ${highlight ? 'text-amber-400' : 'text-slate-500'}`}>
            {label}
          </p>
          <p className={`text-xl font-bold tabular-nums ${highlight ? 'text-amber-400' : 'text-slate-100'}`}>
            {value}
          </p>
          {sublabel && <p className="text-xs text-slate-500 mt-1">{sublabel}</p>}
        </div>
        {icon && (
          <div className={`p-2 rounded-lg ${highlight ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

interface MetricsPanelProps {
  calc: CalculatedCOI;
  proposalPrice: number;
}

export function MetricsPanel({ calc, proposalPrice }: MetricsPanelProps) {
  const netBenefit = calc.yearFiveCost - proposalPrice;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Monthly Leakage"
          value={formatCurrency(calc.monthlyLeakage)}
          sublabel="in wasted capital"
          icon={<TrendingDown size={16} />}
        />
        <MetricCard
          label="Break-Even"
          value={calc.roiMonths > 0 ? `${calc.roiMonths} mo` : '—'}
          sublabel="to recoup investment"
          icon={<Clock size={16} />}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MetricCard
          label="Year 1 COI"
          value={formatCurrency(calc.yearOneCost)}
        />
        <MetricCard
          label="Year 3 COI"
          value={formatCurrency(calc.yearThreeCost)}
          highlight
        />
        <MetricCard
          label="Year 5 COI"
          value={formatCurrency(calc.yearFiveCost)}
        />
      </div>

      {netBenefit > 0 && (
        <div className="rounded-xl p-4 bg-emerald-500/10 border border-emerald-500/30">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-400" />
            <p className="text-xs uppercase tracking-wider font-medium text-emerald-400">
              5-Year Net Benefit
            </p>
          </div>
          <p className="text-2xl font-bold text-emerald-400 tabular-nums mt-1">
            {formatCurrency(netBenefit)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            After recouping the project investment
          </p>
        </div>
      )}
    </div>
  );
}

import { COIData } from '../types';
import { formatCurrency } from '../utils/calculator';

interface SliderFieldProps {
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (v: number) => string;
}

function SliderField({
  label,
  sublabel,
  value,
  min,
  max,
  step,
  onChange,
  format = (v) => String(v),
}: SliderFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <div>
          <label className="text-sm font-medium text-slate-300">{label}</label>
          {sublabel && <span className="ml-1.5 text-xs text-slate-500">{sublabel}</span>}
        </div>
        <span className="text-amber-400 font-semibold text-sm tabular-nums">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-amber-500"
      />
      <div className="flex justify-between text-xs text-slate-600">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

interface TextFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

function TextField({ label, placeholder, value, onChange }: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
      />
    </div>
  );
}

interface SectionProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
}

function Section({ title, badge, children }: SectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{title}</h3>
        {badge && (
          <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        <div className="flex-1 h-px bg-slate-800" />
      </div>
      {children}
    </div>
  );
}

interface InputFormProps {
  data: COIData;
  onChange: (data: COIData) => void;
}

export function InputForm({ data, onChange }: InputFormProps) {
  const set = <K extends keyof COIData>(key: K, value: COIData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="space-y-8">
      <Section title="Client Details">
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="Client Name"
            placeholder="Acme Corp"
            value={data.clientName}
            onChange={(v) => set('clientName', v)}
          />
          <TextField
            label="Project Name"
            placeholder="Website Redesign"
            value={data.projectName}
            onChange={(v) => set('projectName', v)}
          />
        </div>
      </Section>

      <Section title="Wage Leakage">
        <SliderField
          label="Employees Affected"
          value={data.employeesAffected}
          min={1}
          max={50}
          step={1}
          onChange={(v) => set('employeesAffected', v)}
          format={(v) => `${v} people`}
        />
        <SliderField
          label="Hours Wasted Per Week"
          sublabel="per employee"
          value={data.hoursWastedPerWeek}
          min={0.5}
          max={40}
          step={0.5}
          onChange={(v) => set('hoursWastedPerWeek', v)}
          format={(v) => `${v} hrs`}
        />
        <SliderField
          label="Average Hourly Wage"
          sublabel="burden rate"
          value={data.averageHourlyWage}
          min={15}
          max={200}
          step={5}
          onChange={(v) => set('averageHourlyWage', v)}
          format={formatCurrency}
        />
      </Section>

      <Section title="Opportunity Cost" badge="Optional">
        <SliderField
          label="Lost Leads Per Month"
          value={data.lostLeadsPerMonth}
          min={0}
          max={100}
          step={1}
          onChange={(v) => set('lostLeadsPerMonth', v)}
          format={(v) => `${v} leads`}
        />
        <SliderField
          label="Average Lead Value"
          value={data.averageLeadValue}
          min={0}
          max={10000}
          step={100}
          onChange={(v) => set('averageLeadValue', v)}
          format={formatCurrency}
        />
      </Section>

      <Section title="Your Proposal">
        <SliderField
          label="Project Investment"
          value={data.proposalPrice}
          min={500}
          max={100000}
          step={500}
          onChange={(v) => set('proposalPrice', v)}
          format={formatCurrency}
        />
      </Section>
    </div>
  );
}

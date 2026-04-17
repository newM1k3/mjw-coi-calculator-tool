import { useState, useMemo, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Download, Calculator, Mail, ChevronRight, FileText } from 'lucide-react';
import { COIData } from './types';
import { calculateCOI } from './utils/calculator';
import { ProposalPDF } from './components/ProposalPDF';
import { InputForm } from './components/InputForm';
import { MetricsPanel } from './components/MetricsPanel';

const DEFAULT_DATA: COIData = {
  clientName: '',
  projectName: '',
  proposalPrice: 8000,
  employeesAffected: 5,
  averageHourlyWage: 45,
  hoursWastedPerWeek: 5,
  lostLeadsPerMonth: 10,
  averageLeadValue: 500,
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function App() {
  const [data, setData] = useState<COIData>(DEFAULT_DATA);
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calc = useMemo(() => calculateCOI(data), [data]);
  const emailValid = isValidEmail(email);
  const pdfFilename = `COI-Analysis-${data.clientName || 'Client'}.pdf`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <Calculator size={16} className="text-slate-900" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-100">Avoidance Cost Calculator</h1>
              <p className="text-xs text-slate-500">Cost of Inaction Proposal Tool</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Preview Active
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="lg:w-[420px] xl:w-[460px] shrink-0 overflow-y-auto bg-slate-900 border-r border-slate-800">
          <div className="p-6 space-y-8">
            <div>
              <h2 className="text-lg font-bold text-slate-100 mb-1">Build Your COI Analysis</h2>
              <p className="text-sm text-slate-400">
                Enter your client's inefficiency data to calculate the true cost of inaction.
              </p>
            </div>

            <InputForm data={data} onChange={setData} />

            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Live Summary
                </h3>
                <MetricsPanel calc={calc} proposalPrice={data.proposalPrice} />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Download Report
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Enter your email to unlock the PDF download.
                </p>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    className={`w-full bg-slate-800 border rounded-lg pl-9 pr-3 py-2.5 text-sm placeholder-slate-600 focus:outline-none transition-colors ${
                      emailTouched && !emailValid && email.length > 0
                        ? 'border-red-500/60 focus:border-red-500'
                        : 'border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30'
                    }`}
                  />
                </div>
                {emailTouched && !emailValid && email.length > 0 && (
                  <p className="text-xs text-red-400 mt-1">Please enter a valid email address.</p>
                )}
              </div>

              {emailValid ? (
                <PDFDownloadLink
                  document={<ProposalPDF data={data} calc={calc} />}
                  fileName={pdfFilename}
                  className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors text-sm shadow-lg shadow-amber-500/20"
                >
                  {({ loading }) =>
                    loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Download PDF Report
                        <ChevronRight size={14} className="ml-auto" />
                      </>
                    )
                  }
                </PDFDownloadLink>
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center gap-2 w-full bg-slate-800 text-slate-600 font-bold py-3 px-4 rounded-xl text-sm cursor-not-allowed border border-slate-700"
                >
                  <Download size={16} />
                  Download PDF Report
                  <span className="ml-auto text-xs font-normal">Enter email first</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-slate-950 min-h-0">
          <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800 bg-slate-900/50">
            <FileText size={14} className="text-slate-500" />
            <span className="text-xs text-slate-500 font-medium">Live PDF Preview</span>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Updates as you type
            </div>
          </div>
          <div className="flex-1 p-4 min-h-0">
            {mounted ? (
              <PDFViewer
                width="100%"
                height="100%"
                className="rounded-xl overflow-hidden shadow-2xl border border-slate-800 min-h-[600px]"
                showToolbar={false}
              >
                <ProposalPDF data={data} calc={calc} />
              </PDFViewer>
            ) : (
              <div className="flex-1 flex items-center justify-center min-h-[600px] rounded-xl border border-slate-800 bg-slate-900/30">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 border-2 border-amber-500/40 border-t-amber-500 rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-slate-500">Loading preview...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { COIData, CalculatedCOI } from '../types';
import { formatCurrency } from '../utils/calculator';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  headerAccent: {
    width: 40,
    height: 4,
    backgroundColor: '#f59e0b',
    marginBottom: 12,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 24,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottom: '1px solid #e2e8f0',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  rowAlt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 11,
    color: '#475569',
  },
  value: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  coiGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
    marginBottom: 8,
  },
  coiCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 14,
    borderTop: '3px solid #cbd5e1',
  },
  coiCardHighlight: {
    flex: 1,
    backgroundColor: '#fffbeb',
    borderRadius: 6,
    padding: 14,
    borderTop: '3px solid #f59e0b',
  },
  coiCardLabel: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  coiCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  coiCardValueHighlight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b45309',
  },
  highlightBox: {
    backgroundColor: '#0f172a',
    padding: 24,
    borderRadius: 8,
    marginTop: 24,
  },
  highlightLabel: {
    fontSize: 10,
    color: '#94a3b8',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  highlightValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 8,
  },
  highlightSubtext: {
    fontSize: 10,
    color: '#94a3b8',
    lineHeight: 1.5,
  },
  roiBox: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  roiCard: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    borderRadius: 6,
    padding: 14,
    borderLeft: '3px solid #22c55e',
  },
  roiCardLabel: {
    fontSize: 10,
    color: '#16a34a',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  roiCardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#15803d',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 50,
    right: 50,
    fontSize: 9,
    color: '#94a3b8',
    textAlign: 'center',
    borderTop: '1px solid #e2e8f0',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeft: {
    fontSize: 9,
    color: '#94a3b8',
  },
  footerRight: {
    fontSize: 9,
    color: '#94a3b8',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 4,
  },
});

interface ProposalPDFProps {
  data: COIData;
  calc: CalculatedCOI;
}

export const ProposalPDF = ({ data, calc }: ProposalPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerAccent} />
      <Text style={styles.header}>The Cost of Inaction Analysis</Text>
      <Text style={styles.subHeader}>
        Prepared for: {data.clientName || 'Client'} | Project: {data.projectName || 'Project'} |{' '}
        {format(new Date(), 'MMMM d, yyyy')}
      </Text>

      <Text style={styles.sectionTitle}>Current Operational Inefficiencies</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Employees Affected</Text>
        <Text style={styles.value}>{data.employeesAffected}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.rowAlt}>
        <Text style={styles.label}>Hours Wasted Per Week (Per Employee)</Text>
        <Text style={styles.value}>{data.hoursWastedPerWeek} hrs</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Average Hourly Burden Rate</Text>
        <Text style={styles.value}>{formatCurrency(data.averageHourlyWage)}/hr</Text>
      </View>
      {data.lostLeadsPerMonth > 0 && (
        <>
          <View style={styles.rowAlt}>
            <Text style={styles.label}>Lost Leads Per Month</Text>
            <Text style={styles.value}>{data.lostLeadsPerMonth}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Average Lead Value</Text>
            <Text style={styles.value}>{formatCurrency(data.averageLeadValue)}</Text>
          </View>
        </>
      )}

      <Text style={styles.sectionTitle}>Projected Cost of Inaction</Text>

      <View style={styles.coiGrid}>
        <View style={styles.coiCard}>
          <Text style={styles.coiCardLabel}>Monthly Leakage</Text>
          <Text style={styles.coiCardValue}>{formatCurrency(calc.monthlyLeakage)}</Text>
        </View>
        <View style={styles.coiCard}>
          <Text style={styles.coiCardLabel}>Year 1 Total</Text>
          <Text style={styles.coiCardValue}>{formatCurrency(calc.yearOneCost)}</Text>
        </View>
        <View style={styles.coiCardHighlight}>
          <Text style={styles.coiCardLabel}>Year 3 Total</Text>
          <Text style={styles.coiCardValueHighlight}>{formatCurrency(calc.yearThreeCost)}</Text>
        </View>
        <View style={styles.coiCard}>
          <Text style={styles.coiCardLabel}>Year 5 Total</Text>
          <Text style={styles.coiCardValue}>{formatCurrency(calc.yearFiveCost)}</Text>
        </View>
      </View>

      <View style={styles.highlightBox}>
        <Text style={styles.highlightLabel}>Key Finding</Text>
        <Text style={styles.highlightTitle}>The 3-Year Cost of Doing Nothing</Text>
        <Text style={styles.highlightValue}>{formatCurrency(calc.yearThreeCost)}</Text>
        <Text style={styles.highlightSubtext}>
          If current processes remain unchanged, this is the projected capital leakage over the next
          36 months — representing a significant and avoidable loss of business value.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Return on Investment</Text>

      <View style={styles.roiBox}>
        <View style={styles.roiCard}>
          <Text style={styles.roiCardLabel}>Project Investment</Text>
          <Text style={styles.roiCardValue}>{formatCurrency(data.proposalPrice)}</Text>
        </View>
        <View style={styles.roiCard}>
          <Text style={styles.roiCardLabel}>Break-Even Point</Text>
          <Text style={styles.roiCardValue}>
            {calc.roiMonths > 0 ? `${calc.roiMonths} Months` : 'N/A'}
          </Text>
        </View>
        <View style={styles.roiCard}>
          <Text style={styles.roiCardLabel}>5-Year Net Benefit</Text>
          <Text style={styles.roiCardValue}>
            {formatCurrency(calc.yearFiveCost - data.proposalPrice)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLeft}>Generated by MJW Avoidance Cost Calculator</Text>
        <Text style={styles.footerRight}>Confidential — For Proposal Use Only</Text>
      </View>
    </Page>
  </Document>
);

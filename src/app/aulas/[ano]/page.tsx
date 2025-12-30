import AulaAnoClient from './AulaAnoClient';

// Static params for export
export function generateStaticParams() {
  return [
    { ano: '1ano' },
    { ano: '2ano' },
    { ano: '3ano' },
    { ano: '4ano' },
    { ano: '5ano' },
  ];
}

export default function AulaAnoPage() {
  return <AulaAnoClient />;
}

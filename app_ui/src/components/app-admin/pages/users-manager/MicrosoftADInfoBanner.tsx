import { Info } from 'lucide-react';


export default function MicrosoftADInfoBanner() {
  const microsoftADInfo = {
    title: 'Управління через Microsoft Active Directory',
    description:
      'Користувачі автоматично синхронізуються з корпоративного Active Directory. Для створення нових облікових записів зверніться до системного адміністратора вашої організації.',
  };
  return (
    <div
      className={`bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 mb-6`}
    >
      <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="text-blue-900 mb-1">{microsoftADInfo.title}</h4>
        <p className="text-sm text-blue-800">{microsoftADInfo.description}</p>
      </div>
    </div>
  );
}

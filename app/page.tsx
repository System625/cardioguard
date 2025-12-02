import CvdForm from '@/components/CvdForm';
import AboutSection from '@/components/AboutSection';

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center p-6 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="w-full max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            CardioGuard
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered cardiovascular disease risk assessment
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Built for Byte 2 Beat Hackathon by Hack4Health
          </p>
        </div>
        <CvdForm />
        <AboutSection />
      </div>
    </main>
  );
}

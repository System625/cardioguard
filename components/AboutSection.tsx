'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Target, Shield, TrendingUp, Activity } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 mt-12">
      {/* Main About Card */}
      <Card className="border-none shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardTitle className="text-2xl">About CardioGuard</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            CardioGuard is an AI-powered cardiovascular disease (CVD) risk assessment tool developed for the
            <strong> Byte 2 Beat Hackathon</strong>. This project demonstrates the application of machine learning
            in healthcare to enable early detection and risk stratification of cardiovascular disease.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our model analyzes patient demographics, vital signs, laboratory values, and lifestyle factors to
            predict CVD risk, helping to identify individuals who may benefit from preventive interventions.
          </p>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Brain className="h-6 w-6 text-green-600" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Data Collection</h4>
                <p className="text-sm text-gray-600">
                  Patient information is collected including age, gender, height, weight, blood pressure,
                  cholesterol, glucose levels, and lifestyle factors.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Machine Learning Analysis</h4>
                <p className="text-sm text-gray-600">
                  Our trained model processes the input data using patterns learned from thousands of patient records
                  to assess cardiovascular disease risk.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Risk Prediction</h4>
                <p className="text-sm text-gray-600">
                  The model outputs a risk classification (High/Low) along with a probability score,
                  providing clear, actionable insights.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Interpretability</h4>
                <p className="text-sm text-gray-600">
                  Results are presented with explanations to help understand which factors contribute most to the risk assessment.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <Target className="h-10 w-10 text-green-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Early Detection</h3>
            <p className="text-sm text-gray-700">
              Identify high-risk individuals early for timely intervention and prevention strategies.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-200 bg-emerald-50">
          <CardContent className="p-6">
            <Shield className="h-10 w-10 text-emerald-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Evidence-Based</h3>
            <p className="text-sm text-gray-700">
              Model trained on real biomedical data with established CVD risk factors.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-teal-200 bg-teal-50">
          <CardContent className="p-6">
            <TrendingUp className="h-10 w-10 text-teal-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Scalable Solution</h3>
            <p className="text-sm text-gray-700">
              Web-based platform enables widespread access to CVD risk assessment tools.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <Brain className="h-10 w-10 text-green-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Interpretable AI</h3>
            <p className="text-sm text-gray-700">
              Clear explanations of predictions support clinical decision-making and trust.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Model Interpretability - SHAP Visualizations */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Activity className="h-6 w-6 text-green-600" />
            Model Interpretability (SHAP Analysis)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 text-sm">
            Our model uses SHAP (SHapley Additive exPlanations) to provide transparent, interpretable predictions.
            Below are visualizations showing which features have the most impact on CVD risk predictions.
          </p>

          {/* SHAP Visualizations - Side by Side on Desktop, Stacked on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SHAP Summary Plot */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 text-sm">Feature Impact Summary</h4>
              <p className="text-xs text-gray-600">
                Shows how each feature pushes predictions toward high (red) or low risk (blue).
              </p>
              <div className="border-2 border-gray-200 rounded-lg p-3 bg-white hover:shadow-lg transition-shadow">
                <div className="relative w-full aspect-4/3">
                  <Image
                    src="/shap-summary.png"
                    alt="SHAP Summary Plot showing feature impacts on CVD predictions"
                    fill
                    className="object-contain rounded"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* SHAP Feature Importance */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 text-sm">Top Risk Factors</h4>
              <p className="text-xs text-gray-600">
                Ranking of features by average impact. Systolic BP (ap_hi) and age are strongest predictors.
              </p>
              <div className="border-2 border-gray-200 rounded-lg p-3 bg-white hover:shadow-lg transition-shadow">
                <div className="relative w-full aspect-4/3">
                  <Image
                    src="/shap-importance.png"
                    alt="SHAP Feature Importance bar chart showing top 15 risk factors"
                    fill
                    className="object-contain rounded"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-900">
              <strong>Key Insights:</strong> The model identifies systolic blood pressure, age-related features,
              and cholesterol levels as the most significant risk factors, aligning with established medical research
              on cardiovascular disease.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-2 border-yellow-300 bg-yellow-50">
        <CardContent className="p-6">
          <h3 className="font-bold text-yellow-900 mb-2">Important Notice</h3>
          <p className="text-sm text-yellow-900">
            This tool is designed for <strong>educational and research purposes only</strong> as part of the
            Byte 2 Beat Hackathon. It is not intended for clinical use and should not replace professional
            medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical concerns.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

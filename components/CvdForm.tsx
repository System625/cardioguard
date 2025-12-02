'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cvdSchema, CvdInput } from '@/lib/schema';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from '@/components/ui/drawer';
import { Loader2, AlertCircle, Activity, Heart, TrendingUp, Info, X } from 'lucide-react';
import RiskGauge from './RiskGauge';
import InfoTooltip from './InfoTooltip';

interface PredictionResult {
  risk?: string;
  probability?: number;
  prediction?: number;
  explanation?: Record<string, unknown>;
  [key: string]: unknown;
}

export default function CvdForm() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const form = useForm<CvdInput>({
    resolver: zodResolver(cvdSchema),
    defaultValues: {
      age: 50,
      gender: 'male',
      height: 170,
      weight: 70,
      ap_hi: 120,
      ap_lo: 80,
      cholesterol: 'normal',
      gluc: 'normal',
      smoke: false,
      alco: false,
      active: true,
    },
  });

  const onSubmit = async (data: CvdInput) => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Map user-friendly values to API's numeric format
    const payload = {
      age: data.age,
      gender: data.gender === 'male' ? 1 : 2,
      height: data.height,
      weight: data.weight,
      ap_hi: data.ap_hi,
      ap_lo: data.ap_lo,
      cholesterol: { normal: 1, above: 2, well_above: 3 }[data.cholesterol],
      gluc: { normal: 1, above: 2, well_above: 3 }[data.gluc],
      smoke: data.smoke ? 1 : 0,
      alco: data.alco ? 1 : 0,
      active: data.active ? 1 : 0,
    };

    try {
      const res = await axios.post('https://byte2beat-api.onrender.com/predict', payload);

      // Convert risk text to prediction number for consistent handling
      const processedResult = {
        ...res.data,
        prediction: res.data.risk?.toLowerCase().includes('high') ? 1 : 0
      };

      setResult(processedResult);
      setDrawerOpen(true);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: unknown } }; message?: string };
      const errorMessage = error.response?.data?.detail
        ? JSON.stringify(error.response.data.detail)
        : error.message || 'An error occurred while predicting';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string | number | undefined) => {
    if (risk === undefined || risk === null) return 'text-gray-600';
    const riskStr = String(risk).toLowerCase();
    if (riskStr.includes('high') || risk === 1) return 'text-red-600';
    if (riskStr.includes('low') || risk === 0) return 'text-green-600';
    return 'text-yellow-600';
  };

  const getRiskBgColor = (risk: string | number | undefined) => {
    if (risk === undefined || risk === null) return 'bg-gray-100';
    const riskStr = String(risk).toLowerCase();
    if (riskStr.includes('high') || risk === 1) return 'bg-red-50';
    if (riskStr.includes('low') || risk === 0) return 'bg-green-50';
    return 'bg-yellow-50';
  };

  const getRiskBorderColor = (risk: string | number | undefined) => {
    if (risk === undefined || risk === null) return 'border-gray-200';
    const riskStr = String(risk).toLowerCase();
    if (riskStr.includes('high') || risk === 1) return 'border-red-200';
    if (riskStr.includes('low') || risk === 0) return 'border-green-200';
    return 'border-yellow-200';
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto shadow-xl border-none">
        <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">CardioGuard</CardTitle>
              <p className="text-sm text-green-100 mt-1">AI-Powered CVD Risk Assessment</p>
            </div>
          </div>
        </CardHeader>
      <CardContent className="mt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Demographics Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Demographics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <Label htmlFor="age" className="text-sm font-medium inline-flex items-center">
                  Age (years)
                  <InfoTooltip content="Patient's age in years. Age is a significant risk factor for cardiovascular disease." />
                </Label>
                <Input
                  id="age"
                  type="number"
                  {...form.register('age', { valueAsNumber: true })}
                  className="mt-1"
                />
                {form.formState.errors.age && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.age.message}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <Label htmlFor="gender" className="text-sm font-medium">Gender</Label>
                <Select
                  onValueChange={(val) => form.setValue('gender', val as 'male' | 'female')}
                  defaultValue="male"
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.gender.message}</p>
                )}
              </div>

              {/* Height */}
              <div>
                <Label htmlFor="height" className="text-sm font-medium">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  {...form.register('height', { valueAsNumber: true })}
                  className="mt-1"
                />
                {form.formState.errors.height && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.height.message}</p>
                )}
              </div>

              {/* Weight */}
              <div>
                <Label htmlFor="weight" className="text-sm font-medium">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  {...form.register('weight', { valueAsNumber: true })}
                  className="mt-1"
                />
                {form.formState.errors.weight && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.weight.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Blood Pressure Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Blood Pressure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Systolic BP */}
              <div>
                <Label htmlFor="ap_hi" className="text-sm font-medium inline-flex items-center">
                  Systolic BP (mmHg)
                  <InfoTooltip content="Upper blood pressure reading. Normal range: 90-120 mmHg. High blood pressure is a major CVD risk factor." />
                </Label>
                <Input
                  id="ap_hi"
                  type="number"
                  {...form.register('ap_hi', { valueAsNumber: true })}
                  className="mt-1"
                  placeholder="e.g., 120"
                />
                {form.formState.errors.ap_hi && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.ap_hi.message}</p>
                )}
              </div>

              {/* Diastolic BP */}
              <div>
                <Label htmlFor="ap_lo" className="text-sm font-medium inline-flex items-center">
                  Diastolic BP (mmHg)
                  <InfoTooltip content="Lower blood pressure reading. Normal range: 60-80 mmHg. Consistently high readings increase CVD risk." />
                </Label>
                <Input
                  id="ap_lo"
                  type="number"
                  {...form.register('ap_lo', { valueAsNumber: true })}
                  className="mt-1"
                  placeholder="e.g., 80"
                />
                {form.formState.errors.ap_lo && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.ap_lo.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Laboratory Values Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Laboratory Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cholesterol */}
              <div>
                <Label htmlFor="cholesterol" className="text-sm font-medium inline-flex items-center">
                  Cholesterol
                  <InfoTooltip content="Blood cholesterol level. High cholesterol contributes to plaque buildup in arteries, increasing CVD risk." />
                </Label>
                <Select
                  onValueChange={(val) => form.setValue('cholesterol', val as 'normal' | 'above' | 'well_above')}
                  defaultValue="normal"
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="above">Above Normal</SelectItem>
                    <SelectItem value="well_above">Well Above Normal</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.cholesterol && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.cholesterol.message}</p>
                )}
              </div>

              {/* Glucose */}
              <div>
                <Label htmlFor="gluc" className="text-sm font-medium inline-flex items-center">
                  Glucose
                  <InfoTooltip content="Blood glucose level. Elevated glucose levels can indicate diabetes, a major CVD risk factor." />
                </Label>
                <Select
                  onValueChange={(val) => form.setValue('gluc', val as 'normal' | 'above' | 'well_above')}
                  defaultValue="normal"
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="above">Above Normal</SelectItem>
                    <SelectItem value="well_above">Well Above Normal</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.gluc && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.gluc.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Lifestyle Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Lifestyle Factors</h3>
            <div className="space-y-3">
              {/* Smoker */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <Label htmlFor="smoke" className="text-sm font-medium cursor-pointer">Smoker</Label>
                <Switch
                  id="smoke"
                  checked={form.watch('smoke')}
                  onCheckedChange={(checked) => form.setValue('smoke', checked)}
                />
              </div>

              {/* Alcohol */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <Label htmlFor="alco" className="text-sm font-medium cursor-pointer">Alcohol Consumption</Label>
                <Switch
                  id="alco"
                  checked={form.watch('alco')}
                  onCheckedChange={(checked) => form.setValue('alco', checked)}
                />
              </div>

              {/* Physical Activity */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <Label htmlFor="active" className="text-sm font-medium cursor-pointer">Physically Active</Label>
                <Switch
                  id="active"
                  checked={form.watch('active')}
                  onCheckedChange={(checked) => form.setValue('active', checked)}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Risk...
              </>
            ) : (
              <>
                <Activity className="mr-2 h-5 w-5" />
                Predict CVD Risk
              </>
            )}
          </Button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-800">Prediction Error</h4>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>

    {/* Results Drawer */}
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${getRiskBgColor(result?.prediction)}`}>
                <Heart className={`h-6 w-6 ${getRiskColor(result?.prediction)}`} />
              </div>
              <div>
                <DrawerTitle className="text-2xl">Risk Assessment Results</DrawerTitle>
                <DrawerDescription>Your cardiovascular disease risk analysis</DrawerDescription>
              </div>
            </div>
            <DrawerClose asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto p-6 space-y-6">
          {result && (
            <>
              {/* Risk Gauge Visualization */}
              {result.probability !== undefined && (
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <RiskGauge probability={result.probability} prediction={result.prediction || 0} />
                </div>
              )}

              {/* Main Risk Display */}
              <div className={`p-6 rounded-xl border-2 ${getRiskBorderColor(result.prediction)} ${getRiskBgColor(result.prediction)} text-center`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className={`h-5 w-5 ${getRiskColor(result.prediction)}`} />
                  <p className="text-sm font-medium text-gray-600">CVD Risk Level</p>
                </div>
                <p className={`text-4xl font-bold ${getRiskColor(result.prediction)} mb-2`}>
                  {result.prediction === 1 ? 'High Risk' : 'Low Risk'}
                </p>
                {result.probability !== undefined && (
                  <p className={`text-2xl font-semibold ${getRiskColor(result.prediction)}`}>
                    {(result.probability * 100).toFixed(2)}% Probability
                  </p>
                )}
              </div>

              {/* Risk Explanation */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">What does this mean?</h4>
                    <p className="text-sm text-green-800">
                      {result.prediction === 1 ? (
                        <>
                          The model indicates an elevated risk for cardiovascular disease. This assessment
                          suggests considering preventive measures and consulting with a healthcare professional
                          for a comprehensive evaluation.
                        </>
                      ) : (
                        <>
                          The model indicates a lower risk for cardiovascular disease based on the provided data.
                          Continue maintaining healthy lifestyle habits and regular check-ups with your healthcare provider.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>             

              {/* SHAP Explanations if available */}
              {result.explanation && (
                <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-gray-900">Feature Importance</h4>
                  </div>
                  <pre className="text-xs text-gray-700 overflow-auto bg-gray-50 p-3 rounded border">
                    {JSON.stringify(result.explanation, null, 2)}
                  </pre>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-xs text-yellow-900">
                  <strong>Medical Disclaimer:</strong> This tool is for educational and research purposes only.
                  It should not be used as a substitute for professional medical advice, diagnosis, or treatment.
                  Always consult with qualified healthcare providers regarding medical conditions.
                </p>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
    </>
  );
}

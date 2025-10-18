'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, AlertCircle, Phone, Mail } from 'lucide-react';

interface PersonalInfo {
  name: string;
  age: string;
  gender: string;
  maritalStatus: string;
  education: string;
  religion: string;
  phone: string;
  nextOfKinPhone: string;
}

const questions = [
  {
    id: 1,
    en: "Have you ever abused substance while you are alone?",
    rw: "Waba wawarakoresheje ibiyobyabwe uri wenyine?"
  },
  {
    id: 2,
    en: "Have your friends or family members expressed concerns about your substance use?",
    rw: "Abo mu muryango wawe baba bahangayikishijwe n'uko ukoresha ibiyobyambwenge?"
  },
  {
    id: 3,
    en: "Have you ever stolen money or substance in order to buy drugs?",
    rw: "Waba warigeze wiba amafaranga kugira ngo ubashe kugura ibiyobyabwenge?"
  },
  {
    id: 4,
    en: "Has your drinking/smoking been a source of conflict in your marriage or relationship?",
    rw: "Ibyo unywa byaba byarigeze biba intandaro y'ubwumvikane buke hamwe n'uwo mwashakanye cyangwa inshuti yawe?"
  },
  {
    id: 5,
    en: "Have you ever felt remorse after drinking/smoking?",
    rw: "Waba warigeze wigaya umaze kunywa inzoga cg itabi, cg ikiyobyabwenge?"
  },
  {
    id: 6,
    en: "Do you worry that you might have a substance abuse problem?",
    rw: "Ujya ugira impungenge ko ushobora kugira ibibazo utewe no gukoresha ibiyobyabwenge?"
  },
  {
    id: 7,
    en: "Do you turn to inferior companions and environments when drinking/smoking?",
    rw: "Ujya wumva wisuzuguye imbere y'abo muri kumwe iyo wanyoye inzoga, itabi cg ibiyobyabwenge?"
  },
  {
    id: 8,
    en: "Does your drinking/smoking make you careless of your family's welfare?",
    rw: "Kunywa kwawe byaba bituma utita ku imibereho y'umuryango wawe?"
  },
  {
    id: 9,
    en: "Have you tried and failed to reduce the amount and/or frequency of your substance use?",
    rw: "Waba waragerageje kugabanya ingano cyangwa inshuro unywamo ariko bikakunanira?"
  },
  {
    id: 10,
    en: "Do you crave a drink or drug at a definite time daily?",
    rw: "Ujya wumva ushaka cyane kunywa inzoga, itabi cg ibiyobyabwenge mu gihe runaka buri munsi?"
  },
  {
    id: 11,
    en: "Do you want a drink/drug/cigarette the next morning?",
    rw: "Ujya ushaka kunywa inzoga, itabi cg ibiyobyabwenge mu gitondo?"
  },
  {
    id: 12,
    en: "Does your use of substance cause you to have difficulty in sleeping?",
    rw: "Gukoresha ibiyobyabwenge kwawe byaba bigutera ibibazo mu gusinzira?"
  },
  {
    id: 13,
    en: "Has your efficiency decreased since drinking/smoking?",
    rw: "Ubushobozi bwawe bwaba bwaragabanutse uhereye igihe watangiriye kunywa inzoga, itabi cg ibiyobyabwenge?"
  },
  {
    id: 14,
    en: "Is substance use jeopardizing your work or school?",
    rw: "Ibyo unywa cg ukoresha byaba bibangamira akazi kawe cyangwa amasomo?"
  },
  {
    id: 15,
    en: "When you stop using or when you can't use, do you start to feel depressed or agitated?",
    rw: "Iyo uhagaritse wanywaga, waba ugira agahinda gakabije cyangwa uhagarika umutika?"
  },
  {
    id: 16,
    en: "Have you ever used substances as a way of dealing with stress, worries or trouble?",
    rw: "Waba warigeze wifashisha ikiyobyabwange kugira ngo uhangane n'umuhangayiko, ubwoba cyangwa ingorane?"
  },
  {
    id: 17,
    en: "Have you lied to your Doctor about your prescription medication?",
    rw: "Waba warigeze ubeshya Muganga kubijyanye n'imifatire y'imiti yawe?"
  },
  {
    id: 18,
    en: "Have you lost your memory after using substances that you can't remember what you did while you were high?",
    rw: "Wigeze uta ubwenge umaze kunywa ikiyobyabwenge kuburyo utibuka ibyo wakoze igihe wari wasinze?"
  },
  {
    id: 19,
    en: "Do you drink/smoke to build up your self-confidence?",
    rw: "Ujya unywa kugira ngo ugire akanyabugabo?"
  },
  {
    id: 20,
    en: "Have you used one substance in order to recover from using another substance?",
    rw: "Waba warigeze ukoresha ikiyobyabwenge kugira wikize ikindi wari wanyoye?"
  }
];

export default function ScreeningPage() {
  const [step, setStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    age: '',
    gender: '',
    maritalStatus: '',
    education: '',
    religion: '',
    phone: '',
    nextOfKinPhone: ''
  });
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleAnswer = (questionId: number, answer: boolean) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateRisk = () => {
    const yesCount = Object.values(answers).filter(a => a === true).length;
    
    if (yesCount <= 6) {
      return 'low';
    } else if (yesCount <= 13) {
      return 'medium';
    } else {
      return 'high';
    }
  };

  const getRiskInfo = () => {
    const risk = calculateRisk();
    const yesCount = Object.values(answers).filter(a => a === true).length;

    if (risk === 'low') {
      return {
        level: 'Low Risk',
        color: 'green',
        icon: CheckCircle,
        message: 'Your responses suggest a low risk of substance abuse. However, staying informed and maintaining healthy habits is important.',
        recommendation: 'Consider occasional check-ins and maintain awareness of substance use patterns. We are here if you ever need support.',
        bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
        borderColor: 'border-green-400',
        textColor: 'text-green-800',
        iconColor: 'text-green-600',
        score: `${yesCount} out of 20 questions`
      };
    } else if (risk === 'medium') {
      return {
        level: 'Medium Risk',
        color: 'yellow',
        icon: AlertTriangle,
        message: 'Your responses indicate some concerning patterns that may benefit from professional guidance.',
        recommendation: 'We recommend scheduling a consultation with our counseling team to discuss your situation and explore support options.',
        bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-100',
        borderColor: 'border-yellow-400',
        textColor: 'text-yellow-900',
        iconColor: 'text-yellow-600',
        score: `${yesCount} out of 20 questions`
      };
    } else {
      return {
        level: 'High Risk',
        color: 'red',
        icon: AlertCircle,
        message: 'Your responses suggest significant substance use concerns that require immediate professional attention.',
        recommendation: 'We strongly recommend contacting us immediately for a comprehensive assessment and treatment plan. Recovery is possible with the right support.',
        bgColor: 'bg-gradient-to-br from-red-50 to-rose-100',
        borderColor: 'border-red-400',
        textColor: 'text-red-900',
        iconColor: 'text-red-600',
        score: `${yesCount} out of 20 questions`
      };
    }
  };

  const canProceed = () => {
    if (step === 0) {
      return personalInfo.name && personalInfo.age && personalInfo.gender && personalInfo.phone;
    }
    return true;
  };

  const RiskIcon = step === 21 ? getRiskInfo().icon : CheckCircle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#57241B] to-[#7a3326] text-white p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Substance Abuse Screening Assessment
            </h1>
            <p className="text-white/90">
              Confidential • Free • Takes 5-10 minutes
            </p>
          </div>

          {/* Progress Bar */}
          {step > 0 && step <= 20 && (
            <div className="bg-gray-50 px-6 py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Question {step} of 20
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round((step / 20) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 20) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Personal Information Form */}
          {step === 0 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name / Amazina *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age / Imyaka *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={personalInfo.age}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                    placeholder="Enter your age"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender / Igitsina *
                  </label>
                  <select
                    name="gender"
                    value={personalInfo.gender}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male / Gabo</option>
                    <option value="Female">Female / Gore</option>
                    <option value="Other">Other / Ikindi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status / Arubatse cg Ingaragu
                  </label>
                  <select
                    name="maritalStatus"
                    value={personalInfo.maritalStatus}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Single">Single / Ingaragu</option>
                    <option value="Married">Married / Arubatse</option>
                    <option value="Divorced">Divorced / Batandukanye</option>
                    <option value="Widowed">Widowed / Bapfakazi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education Level / Amashuri wize
                  </label>
                  <select
                    name="education"
                    value={personalInfo.education}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="">Select</option>
                    <option value="No Formal Education">No Formal Education / Nta mashuri yize</option>
                    <option value="Primary">Primary / Abanza</option>
                    <option value="Secondary">Secondary / Ayisumbuye</option>
                    <option value="High School">High School / Icyiciro cya kabiri</option>
                    <option value="Vocational/Technical">Vocational/Technical / Umwuga/Tekiniki</option>
                    <option value="University">University / Kaminuza</option>
                    <option value="Postgraduate">Postgraduate / Impamyabumenyi y&apos;ikirenga</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Religion / Imyemerere
                  </label>
                  <input
                    type="text"
                    name="religion"
                    value={personalInfo.religion}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                    placeholder="Your religion"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number / Tel *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                    placeholder="+250 xxx xxx xxx"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next of Kin&apos;s Phone / Tel. y&apos;umuntu ukwitaho
                  </label>
                  <input
                    type="tel"
                    name="nextOfKinPhone"
                    value={personalInfo.nextOfKinPhone}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                    placeholder="+250 xxx xxx xxx"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(1)}
                  disabled={!canProceed()}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg flex items-center gap-2"
                >
                  Start Assessment
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Questions */}
          {step >= 1 && step <= 20 && (
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {questions[step - 1].en}
                </h2>
                <p className="text-gray-600 italic">
                  {questions[step - 1].rw}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => {
                    handleAnswer(step, true);
                    if (step < 20) {
                      setTimeout(() => setStep(step + 1), 300);
                    } else {
                      setTimeout(() => setStep(21), 300);
                    }
                  }}
                  className={`py-6 px-6 text-lg font-semibold rounded-lg border-2 transition-all cursor-pointer ${
                    answers[step] === true
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-md'
                  }`}
                >
                  Yes / Yego
                </button>
                <button
                  onClick={() => {
                    handleAnswer(step, false);
                    if (step < 20) {
                      setTimeout(() => setStep(step + 1), 300);
                    } else {
                      setTimeout(() => setStep(21), 300);
                    }
                  }}
                  className={`py-6 px-6 text-lg font-semibold rounded-lg border-2 transition-all cursor-pointer ${
                    answers[step] === false
                      ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white border-gray-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  No / Oya
                </button>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className="px-6 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={20} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (step < 20) {
                      setStep(step + 1);
                    } else {
                      setStep(21);
                    }
                  }}
                  disabled={answers[step] === undefined}
                  className="px-6 py-2 text-blue-600 hover:text-blue-700 disabled:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {step === 20 ? 'See Results' : 'Skip'}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {step === 21 && (
            <div className="p-6 md:p-8">
              {(() => {
                const riskInfo = getRiskInfo();
                return (
                  <>
                    <div className={`${riskInfo.bgColor} border-2 ${riskInfo.borderColor} rounded-xl p-6 mb-6 shadow-lg`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white rounded-full p-3 shadow-md">
                          <RiskIcon size={48} className={riskInfo.iconColor} />
                        </div>
                        <div>
                          <h2 className={`text-2xl font-bold ${riskInfo.textColor}`}>
                            {riskInfo.level}
                          </h2>
                          <p className="text-sm text-gray-600 font-medium">{riskInfo.score}</p>
                        </div>
                      </div>
                      <p className={`${riskInfo.textColor} mb-4 text-base`}>
                        {riskInfo.message}
                      </p>
                      <div className="bg-white/50 rounded-lg p-4 border border-white/60">
                        <p className={`${riskInfo.textColor} font-semibold`}>
                          {riskInfo.recommendation}
                        </p>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Information (Optional)
                      </label>
                      <textarea
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                        placeholder="Any other information you would like to share about your situation..."
                      />
                    </div>

                    {/* Contact Options */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <a
                        href="tel:+250788772489"
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all cursor-pointer shadow-lg"
                      >
                        <Phone size={20} />
                        Call Us Now
                      </a>
                      <a
                        href="mailto:iwacurecovercentre17@gmail.com"
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all cursor-pointer shadow-lg"
                      >
                        <Mail size={20} />
                        Email Us
                      </a>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => window.location.href = '/book-call'}
                        className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all cursor-pointer shadow-lg"
                      >
                        Schedule Consultation
                      </button>
                      <button
                        onClick={() => window.location.href = '/'}
                        className="flex-1 text-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Return Home
                      </button>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
                      <p className="text-sm text-blue-900">
                        <strong>Confidentiality Notice:</strong> Your responses are confidential. This assessment is for screening purposes only and does not constitute a medical diagnosis. Professional evaluation is recommended for accurate assessment.
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
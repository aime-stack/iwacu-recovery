'use client';

import { useState } from 'react';
import { Calendar, Clock, Phone, CheckCircle, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

// Simulated booked slots - Replace with API call to your backend
const bookedSlots = [
  { date: '2025-10-20', time: '09:00 AM' },
  { date: '2025-10-20', time: '10:00 AM' },
  { date: '2025-10-21', time: '02:00 PM' },
];

export default function BookCallPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const callPrice = 5000;
  const momoCode = '*182*8*1*123456#';

  const isSlotBooked = (date: string, time: string) => {
    return bookedSlots.some(slot => slot.date === date && slot.time === time);
  };

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (date > today) {
        days.push(date);
      } else {
        days.push(null);
      }
    }
    
    return days;
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step === 1 && selectedDate && selectedTime && formData.name && formData.email && formData.phone) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const calendarDays = getCalendarDays();
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#57241B] text-white p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {step === 1 && 'Schedule Your Call'}
              {step === 2 && 'Complete Payment'}
              {step === 3 && 'Booking Confirmed!'}
            </h1>
            <p className="text-white/90">
              {step === 1 && 'Choose your preferred date and time'}
              {step === 2 && 'Secure your appointment with payment'}
              {step === 3 && 'Your appointment has been scheduled'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-1 mx-2 transition-all ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Booking Form */}
          {step === 1 && (
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>
                </div>

                {/* Right Column - Calendar & Time */}
                <div className="space-y-6">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Calendar size={20} />
                        Select Date
                      </h3>
                      <div className="flex items-center gap-2">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm font-medium min-w-[140px] text-center">{monthYear}</span>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="border-2 border-gray-200 rounded-xl p-4">
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="text-center text-xs font-semibold text-gray-600 py-1">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((date, idx) => {
                          if (!date) {
                            return <div key={`empty-${idx}`} className="aspect-square" />;
                          }
                          const dateStr = formatDateString(date);
                          const isSelected = selectedDate === dateStr;
                          
                          return (
                            <button
                              key={dateStr}
                              onClick={() => setSelectedDate(dateStr)}
                              className={`aspect-square rounded-full text-sm font-medium transition-all ${
                                isSelected
                                  ? 'bg-blue-600 text-white shadow-lg scale-110'
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-105'
                              }`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock size={20} />
                        Select Time
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {availableTimes.map((time) => {
                          const booked = isSlotBooked(selectedDate, time);
                          const isSelected = selectedTime === time;
                          
                          return (
                            <button
                              key={time}
                              onClick={() => !booked && setSelectedTime(time)}
                              disabled={booked}
                              className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-all ${
                                booked
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-md'
                                  : 'border-gray-200 hover:border-blue-300 text-gray-700 cursor-pointer hover:shadow-sm'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNextStep}
                  disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-lg hover:shadow-xl"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="p-6 md:p-8">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><span className="font-semibold">Name:</span> {formData.name}</p>
                    <p><span className="font-semibold">Email:</span> {formData.email}</p>
                    <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
                    <p><span className="font-semibold">Date:</span> {formatDisplayDate(selectedDate)}</p>
                    <p><span className="font-semibold">Time:</span> {selectedTime}</p>
                    <p className="text-2xl font-bold text-blue-600 mt-4 pt-4 border-t border-blue-200">
                      Total: {callPrice.toLocaleString()} RWF
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-center shadow-lg">
                  <div className="bg-white rounded-lg p-6 mb-4">
                    <h4 className="font-bold text-xl text-gray-900 mb-3">MTN Mobile Money Payment</h4>
                    <p className="text-sm text-gray-600 mb-4">Dial this code on your phone to complete payment:</p>
                    <div className="bg-gray-900 text-white text-3xl font-mono font-bold py-4 px-6 rounded-lg inline-block mb-4">
                      {momoCode}
                    </div>
                    <p className="text-sm text-gray-600">Amount: <span className="font-bold text-lg">{callPrice.toLocaleString()} RWF</span></p>
                  </div>
                  <Phone className="mx-auto mb-3" size={40} />
                  <p className="text-sm font-semibold text-gray-800">
                    Complete the payment on your phone, then click "I've Paid" below
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Please complete the payment before confirming. You'll receive a confirmation SMS from MTN after successful payment.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors cursor-pointer shadow-lg"
                  >
                    I've Paid
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="p-6 md:p-8 text-center">
              <div className="max-w-lg mx-auto space-y-6">
                <CheckCircle size={80} className="text-green-500 mx-auto" />
                <h3 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h3>
                <p className="text-gray-600">
                  Your call has been scheduled successfully. We'll send you a confirmation email at{' '}
                  <span className="font-semibold text-gray-900">{formData.email}</span> and an SMS reminder before your appointment.
                </p>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-lg text-gray-900 mb-4">Appointment Details</h4>
                  <div className="space-y-2 text-gray-700">
                    <p><span className="font-semibold">Date:</span> {formatDisplayDate(selectedDate)}</p>
                    <p><span className="font-semibold">Time:</span> {selectedTime}</p>
                    <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
                  </div>
                </div>
                <Link
                  href="/"
                  className="inline-block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shadow-lg"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
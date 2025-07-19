import React from 'react';
import { BookOpen, Users, Award, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Singapore Math
            <span className="text-blue-600"> Worksheet Generator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create customized math worksheets for Primary 1-6 students using AI-powered question generation. 
            Perfect for parents, tutors, and educators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Curriculum Aligned</h3>
            <p className="text-gray-600">Questions follow Singapore Math methodology and standards</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">All Levels</h3>
            <p className="text-gray-600">Primary 1 to Primary 6 with adjustable difficulty levels</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Questions</h3>
            <p className="text-gray-600">AI-generated questions with detailed working steps</p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant PDF</h3>
            <p className="text-gray-600">Download worksheets as PDF with or without answers</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <img 
            src="https://drive.google.com/uc?export=view&id=1QI0zQSTgSHgF2igVjGKRqH-_t5y0OaVp"
            alt="Asian mother teaching her daughter on the computer"
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

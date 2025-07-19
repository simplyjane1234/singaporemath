import React, { useState } from 'react';
import { Download, FileText, Loader2, Crown } from 'lucide-react';
import { Level, Topic, Difficulty, Worksheet, User } from '../types';
import { generateQuestions } from '../services/openai';
import { downloadWorksheet } from '../services/pdf';

interface WorksheetGeneratorProps {
  user: User | null;
  onUpdateUser: (updates: Partial<User>) => void;
}

const levels: Level[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
const topics: Topic[] = ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Fractions', 'Decimals', 'Geometry', 'Word Problems'];
const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export const WorksheetGenerator: React.FC<WorksheetGeneratorProps> = ({ user, onUpdateUser }) => {
  const [level, setLevel] = useState<Level>('P1');
  const [topic, setTopic] = useState<Topic>('Addition');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const canGenerateWorksheet = () => {
    if (!user) return false;
    if (user.isPaid) return true;
    return user.freeWorksheetsUsed < user.maxFreeWorksheets;
  };

  const handleGenerate = async () => {
    if (!user) return;
    
    if (!canGenerateWorksheet()) {
      setShowUpgrade(true);
      return;
    }

    setIsGenerating(true);
    try {
      const questions = await generateQuestions(level, topic, difficulty);
      const newWorksheet: Worksheet = {
        id: Math.random().toString(36).substr(2, 9),
        title: `${level} ${topic} - ${difficulty}`,
        level,
        topic,
        difficulty,
        questions,
        createdAt: new Date()
      };
      
      setWorksheet(newWorksheet);
      
      if (!user.isPaid) {
        onUpdateUser({ freeWorksheetsUsed: user.freeWorksheetsUsed + 1 });
      }
    } catch (error) {
      console.error('Error generating worksheet:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (includeAnswers: boolean = false) => {
    if (worksheet) {
      downloadWorksheet(worksheet, includeAnswers);
    }
  };

  const handleUpgrade = () => {
    // Simulate Stripe payment
    alert('Redirecting to Stripe payment... (Demo)');
    onUpdateUser({ isPaid: true });
    setShowUpgrade(false);
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Please Login</h2>
        <p className="text-gray-600">Login to start generating worksheets</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Generator Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Generate Worksheet</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {levels.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value as Topic)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {topics.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {difficulties.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !canGenerateWorksheet()}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <FileText className="h-5 w-5" />
              <span>Generate Worksheet</span>
            </>
          )}
        </button>

        {!canGenerateWorksheet() && !user.isPaid && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-orange-800 text-sm">
              You've used all your free worksheets for today. Upgrade to generate unlimited worksheets!
            </p>
          </div>
        )}
      </div>

      {/* Worksheet Preview */}
      {worksheet && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{worksheet.title}</h3>
              <p className="text-gray-600">Generated on {worksheet.createdAt.toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleDownload(false)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download Questions</span>
              </button>
              <button
                onClick={() => handleDownload(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download with Answers</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {worksheet.questions.map((question, index) => (
              <div key={question.id} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {index + 1}. {question.question}
                </h4>
                <div className="text-sm text-gray-600">
                  <p><strong>Answer:</strong> {question.answer}</p>
                  {question.workingSteps && question.workingSteps.length > 0 && (
                    <div className="mt-1">
                      <strong>Working:</strong>
                      <ul className="list-disc list-inside ml-4">
                        {question.workingSteps.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Upgrade to Premium</h2>
              <p className="text-gray-600 mb-6">
                Get unlimited worksheet generation and access to all features
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
                <div className="text-2xl font-bold text-gray-900">$9.99/month</div>
                <div className="text-sm text-gray-600">Unlimited worksheets</div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpgrade}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

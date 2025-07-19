import { Level, Topic, Difficulty } from '../types';

export const generateQuestions = async (
  level: Level,
  topic: Topic,
  difficulty: Difficulty
): Promise<any> => {
  const prompt = `Generate 5 Singapore Math questions for ${level} students on the topic of ${topic} with ${difficulty} difficulty. 
  
  For each question, provide:
  1. The question text
  2. The correct answer
  3. Working steps (if applicable)
  
  Format the response as a JSON array with objects containing: question, answer, and workingSteps (array of strings).
  
  Make sure the questions follow Singapore Math methodology and are appropriate for ${level} level.`;

  try {
    const response = await fetch('undefined', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer undefined`
      },
      body: JSON.stringify({
        url: 'https://api.openai.com/v1/chat/completions',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert Singapore Math curriculum specialist. Generate appropriate math questions for the specified level and topic.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate questions');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch {
      // Fallback if AI doesn't return valid JSON
      return generateFallbackQuestions(level, topic, difficulty);
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    return generateFallbackQuestions(level, topic, difficulty);
  }
};

const generateFallbackQuestions = (level: Level, topic: Topic, difficulty: Difficulty) => {
  // Fallback questions for demo purposes
  const questions = [
    {
      question: `Solve: 15 + 23 = ?`,
      answer: '38',
      workingSteps: ['15 + 23', '= 38']
    },
    {
      question: `What is 45 - 18?`,
      answer: '27',
      workingSteps: ['45 - 18', '= 27']
    },
    {
      question: `Calculate: 6 × 7 = ?`,
      answer: '42',
      workingSteps: ['6 × 7', '= 42']
    },
    {
      question: `Divide: 56 ÷ 8 = ?`,
      answer: '7',
      workingSteps: ['56 ÷ 8', '= 7']
    },
    {
      question: `Tom has 24 stickers. He gives away 9 stickers. How many stickers does he have left?`,
      answer: '15',
      workingSteps: ['24 - 9', '= 15 stickers']
    }
  ];

  return questions.map((q, index) => ({
    id: `q${index + 1}`,
    ...q
  }));
};

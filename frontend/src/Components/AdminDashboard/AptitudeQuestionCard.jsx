import React from 'react';
import { CheckCircle } from 'lucide-react';

const AptitudeQuestionCard = ({ question, onChange }) => {
  const handleQuestionTextChange = (e) => {
    onChange({
      ...question,
      questionText: e.target.value
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    onChange({
      ...question,
      options: newOptions
    });
  };

  const handleCorrectAnswerChange = (index) => {
    onChange({
      ...question,
      correctAnswer: index
    });
  };

  const handleMarksChange = (e) => {
    const marks = parseInt(e.target.value) || 0;
    onChange({
      ...question,
      marks: marks < 1 ? 1 : marks
    });
  };

  const handleExplanationChange = (e) => {
    onChange({
      ...question,
      explanation: e.target.value
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label htmlFor={`question-${question.id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Question Text *
        </label>
        <textarea
          id={`question-${question.id}`}
          value={question.questionText}
          onChange={handleQuestionTextChange}
          rows="2"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter the question text"
          required
        ></textarea>
      </div>
      
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Options *
        </label>
        
        {question.options.map((option, index) => (
          <div key={index} className="flex items-start">
            <button
              type="button"
              onClick={() => handleCorrectAnswerChange(index)}
              className={`mt-2 mr-3 h-6 w-6 rounded-full flex items-center justify-center border ${
                question.correctAnswer === index
                  ? 'bg-green-100 border-green-500 text-green-600'
                  : 'border-gray-300 text-transparent hover:bg-gray-50'
              }`}
              title={question.correctAnswer === index ? 'Correct answer' : 'Mark as correct'}
            >
              {question.correctAnswer === index && <CheckCircle className="w-5 h-5" />}
            </button>
            
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium mr-2">
                  {String.fromCharCode(65 + index)}
                </div>
                
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`marks-${question.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Marks *
          </label>
          <input
            type="number"
            id={`marks-${question.id}`}
            value={question.marks}
            onChange={handleMarksChange}
            min="1"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor={`explanation-${question.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Explanation (Optional)
          </label>
          <textarea
            id={`explanation-${question.id}`}
            value={question.explanation}
            onChange={handleExplanationChange}
            rows="1"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Explanation for the correct answer"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AptitudeQuestionCard;
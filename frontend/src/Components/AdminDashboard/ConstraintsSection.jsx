import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ConstraintsSection = ({ constraints, onChange }) => {
  const addConstraint = () => {
    onChange([...constraints, '']);
  };

  const removeConstraint = (index) => {
    if (constraints.length <= 1) {
      return; // Keep at least one constraint
    }
    const newConstraints = [...constraints];
    newConstraints.splice(index, 1);
    onChange(newConstraints);
  };

  const updateConstraint = (index, value) => {
    const newConstraints = [...constraints];
    newConstraints[index] = value;
    onChange(newConstraints);
  };

  return (
    <div className="p-4 space-y-4">
      <p className="text-sm text-gray-600">
        Add constraints for the problem such as time/space complexity requirements, input restrictions, etc.
      </p>
      
      <div className="space-y-3">
        {constraints.map((constraint, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={constraint}
              onChange={(e) => updateConstraint(index, e.target.value)}
              className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Constraint #${index + 1}`}
            />
            <button
              onClick={() => removeConstraint(index)}
              className="p-1 rounded-full text-red-500 hover:bg-red-50"
              title="Remove Constraint"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      <button
        type="button"
        onClick={addConstraint}
        className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Constraint
      </button>
    </div>
  );
};

export default ConstraintsSection;
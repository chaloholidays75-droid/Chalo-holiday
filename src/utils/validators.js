export const validators = {
  required: (label = 'This field') => ({
    required: `${label} is required`,
  }),

  name: {
    required: 'Full name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 80, message: 'Name is too long' },
  },

  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^[+]?[\d\s\-()]{7,15}$/,
      message: 'Enter a valid phone number',
    },
  },

  email: {
    required: 'Email address is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address',
    },
  },

  message: {
    required: 'Message is required',
    minLength: { value: 10, message: 'Message must be at least 10 characters' },
    maxLength: { value: 1000, message: 'Message is too long (max 1000 characters)' },
  },

  travelers: {
    required: 'Number of travelers is required',
    min: { value: 1, message: 'At least 1 traveler required' },
    max: { value: 500, message: 'Maximum 500 travelers' },
  },
}
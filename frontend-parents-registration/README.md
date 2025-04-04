# Parents Registration Frontend

A React Native frontend application for the Parents Registration System, providing a user-friendly interface for parent registration and management.

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Components](#components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Development Guide](#development-guide)
- [Testing](#testing)
- [Deployment](#deployment)

## Overview

The frontend is built using React Native and provides a modern, responsive interface for parent registration. It includes form validation, real-time feedback, and error handling.

## Project Structure

```
frontend-parents-registration/
├── app/
│   ├── components/
│   │   ├── FormInput.tsx
│   │   └── SubmitButton.tsx
│   ├── styles/
│   │   └── styles.ts
│   ├── config.ts
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## Dependencies

Key dependencies in `package.json`:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.72.0",
    "expo": "^49.0.0",
    "typescript": "^5.0.0"
  }
}
```

## Configuration

### API Configuration (config.ts)
```typescript
export const API_URL = 'http://localhost:8080';
```

### Environment Variables
- `API_URL`: Backend API endpoint
- `DEBUG_MODE`: Enable/disable debug logging

## Components

### FormInput
- Handles text input with validation
- Props:
  - `label`: Input field label
  - `value`: Current input value
  - `onChange`: Change handler
  - `error`: Error message
  - `placeholder`: Input placeholder
  - `keyboardType`: Keyboard type (default, email, numeric)

### SubmitButton
- Handles form submission
- Props:
  - `onPress`: Submit handler
  - `disabled`: Button state
  - `title`: Button text

## State Management

The application uses React Hooks for state management:

### Form State
```typescript
const [formData, setFormData] = useState({
  name: '',
  surname: '',
  email: '',
  age: '',
  address: ''
});
```

### Error State
```typescript
const [errors, setErrors] = useState({
  name: '',
  surname: '',
  email: '',
  age: '',
  address: ''
});
```

### Connection State
```typescript
const [isConnected, setIsConnected] = useState(false);
```

## API Integration

### API Calls
```typescript
// Test connection
const testConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/api/parents/test`);
    const data = await response.json();
    setIsConnected(data.status === 'success');
  } catch (error) {
    setIsConnected(false);
  }
};

// Submit form
const handleSubmit = async () => {
  try {
    const response = await fetch(`${API_URL}/api/parents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    // Handle response
  } catch (error) {
    // Handle error
  }
};
```

## Development Guide

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Expo CLI
- React Native development environment

### Setup
1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add comments for complex logic

## Testing

### Component Testing
```typescript
// Example test for FormInput
describe('FormInput', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <FormInput
        label="Name"
        value=""
        onChange={() => {}}
        placeholder="Enter name"
      />
    );
    expect(getByPlaceholderText('Enter name')).toBeTruthy();
  });
});
```

### Integration Testing
```typescript
// Example test for form submission
describe('Form Submission', () => {
  it('submits form data correctly', async () => {
    const { getByTestId } = render(<App />);
    fireEvent.changeText(getByTestId('name-input'), 'John');
    fireEvent.press(getByTestId('submit-button'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/parents'),
        expect.any(Object)
      );
    });
  });
});
```

## Deployment

### Production Build
1. Build the app:
   ```bash
   expo build:android
   # or
   expo build:ios
   ```

2. Deploy to app stores:
   - Follow Expo's deployment guide
   - Submit to Google Play Store or Apple App Store

### Environment Setup
- Configure API endpoints for production
- Set up error tracking
- Enable analytics
- Configure security settings

## Error Handling

The frontend implements comprehensive error handling:
- Form validation errors
- Network errors
- API response errors
- User feedback
- Error logging

## Security

- Input sanitization
- Secure API communication
- Error message handling
- Data validation

## Performance

### Optimization Techniques
- Memoization of components
- Lazy loading
- Image optimization
- Network request caching

### Monitoring
- Performance metrics
- Error tracking
- User analytics
- Network monitoring

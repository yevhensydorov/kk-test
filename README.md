# Cat Food Delivery Notification System

A full-stack application that notifies users about their upcoming cat food deliveries. The system includes a NestJS backend and a Vite Tailwind React frontend with TypeScript.

## Project Structure

```
├── src/                    # Backend source code
│   ├── dto/               # Data Transfer Objects
│   ├── services/          # Business logic services
│   ├── utils/             # Utility functions
│   └── app.service.ts     # Main application service
└── front-end/             # Frontend React application
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Page components
    │   ├── services/      # API services
    │   └── types/         # TypeScript type definitions
    └── public/            # Static assets
```

## Backend Components

### Services

1. **AppService**
   - Main service handling the delivery message endpoint
   - Validates UUID format and user existence
   - Orchestrates data flow between other services
   - Has a `app.controller.spec.ts` file with unit tests to check the logic of the controller and its error handling

2. **DataService**
   - Manages user and cat data. data.json file acts like a DB. In the real world app, this should be the place where we connect our DB
   - Provides methods to find users and their cats
   - Has a `data.service.spec.ts` file with unit tests to check the logic in the service. We check `findUser` method itself and parsing the data.json file in these test cases

3. **PriceService**
   - Calculates total price for cat food orders
   - Determines eligibility for free gifts based on order value
   - Has a `price.service.spec.ts` file with unit tests to check the logic in the service. Testing the `calculateTotalPrice` and `isEligibleForFreeGift` methods logic

4. **MessageService**
   - Generates delivery notification message
   - Uses StringUtils for consistent name formatting
   - Creates personalized messages with cat names and delivery details
   - Has a `message.service.spec.ts` file with unit tests to check the logic in the service. Testing the `generateDeliveryMessage` method logic

### Utilities

1. **StringUtils**
   - Provides string formatting utilities. Has only one method `formatNames`.
   - Handles name formatting for multiple cats (e.g., "Whiskers, Mittens, and Shadow")
   - Has a `string.utils.spec.ts` file with unit tests which check the logic in the `formatNames` method

## Frontend Components

### Pages

1. **Welcome Page**
   - Displays delivery notification information
   - Responsive design with mobile and desktop layouts
   - Shows cat image, delivery message, price, and free gift status
   - Includes action buttons for details and delivery editing

### Error Handling

1. **ValidationError**
   - Displays UUID format validation errors
   - Provides example of valid UUID format
   - Includes link to example URL

2. **NotFoundError**
   - Shows user not found errors
   - Suggests using a valid UUID
   - Includes link to example URL

3. **GeneralError**
   - Handles other types of errors
   - Displays error message in user-friendly format

### Components

1. **Loading**
   - Shows loading state while fetching data
   - Provides visual feedback to users

## API Integration

### Endpoints in the `api.ts`

1. **GET /comms/your-next-delivery/:userId**
   - Returns delivery notification details
   - Requires valid UUID v4 format
   - Returns 400 for invalid UUID format
   - Returns 404 for non-existent users
   - Returns 200 with delivery message for valid requests

### Response Structure

```typescript
{
  title: string;      // Formatted delivery title
  message: string;    // Personalized delivery message
  totalPrice: number; // Total order price
  freeGift: boolean;  // Free gift eligibility
}
```

## Features

1. **UUID Validation**
   - Validates UUID format before processing
   - Provides clear error messages for invalid formats

2. **User Verification**
   - Checks user existence before generating messages
   - Returns appropriate error messages for non-existent users

3. **Responsive Design**
   - Mobile-first approach
   - Different layouts for mobile and desktop
   - Optimized cat image display

4. **Error Handling**
   - Comprehensive error states
   - User-friendly error messages
   - Helpful suggestions for resolution

5. **Type Safety**
   - Full TypeScript implementation
   - Shared DeliveryMessage DTO between frontend and backend
   - Strong type checking throughout the application

## Development

### Prerequisites
- Node.js
  - Backend: ^18.13.0 || >=20.9.0
  - Frontend: >=20.0.0
- yarn installed 
- TypeScript

### Setup
1. Clone the repository:
   ```bash
   git clone git@github.com:yevhensydorov/kk-test.git
   cd kk-test
   ```

2. Install backend dependencies:
   ```bash
   yarn
   ```

3. Install frontend dependencies:
   ```bash
   cd front-end
   yarn
   ```

4. Start the backend (runs on http://localhost:3000):
   ```bash
   yarn start:dev
   ```

5. Start the frontend (runs on http://localhost:5173):
   ```bash
   cd front-end
   yarn dev
   ```

6. To view the delivery message front end, visit:
   ```
   http://localhost:5173/welcome/ff535484-6880-4653-b06e-89983ecf4ed5
   ```
   Also, the app has page not found message, so user will be asked to go to the correct URL.

### Testing
- Backend tests: `yarn test`

## Test Evaluation

This coding test provides a well-balanced assessment of full-stack development skills, covering essential aspects like:
- Error handling and validation
- Responsive design implementation
- Data flow
- API integration
- Type safety with TypeScript

### Potential Improvements for Future Tests

To make the test even more comprehensive, here are some suggested additions:

1. **Business Logic Complexity**
   - Complex pricing rules and discounts
   - Multiple delivery options and preferences

2. **State Management**
   - Implementation of Redux, Zustand, or similar if we have more pages, routes, cart
   - Complex data flow scenarios
   - State persistence requirements

3. **Form Handling**
   - Implementation of the "Edit delivery" feature
   - Form validation and error handling
   - Complex form state management

4. **Performance Optimization**
   - API response caching
   - Image optimization
   - Code splitting and lazy loading


## Future Improvements

If given more time, here are several areas where the application could be enhanced:

1. **Frontend Data Loading**
   - Implement proper error handling for data.json loading failures

2. **Backend Logging**
   - Add structured logging for better debugging and monitoring
   - Include request/response logging for API endpoints
   - Implement log levels (error, warn, info, debug)

3. **Frontend Component Architecture**
   - Extract reusable components from the Welcome page:
     - Card component for consistent styling
     - Price display component
     - Action buttons component
     - Cat image component with responsive behavior

4. **Frontend Testing**
   - Add unit tests for React components using Jest and React Testing Library
   - Implement end-to-end tests using Playwright
   - Set up continuous integration for automated testing

5. **Additional Improvements**
   - Add animations and transitions for better UX
   - Implement proper state management for larger applications
   - Add accessibility features (ARIA labels, keyboard navigation)


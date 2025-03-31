# Cat Food Delivery Notification System

A full-stack application that notifies users about their upcoming cat food deliveries. The system includes a NestJS backend and a Vite React frontend with TypeScript.

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
- yarn
- TypeScript

### Setup
1. Install backend dependencies:
   ```bash
   yarn
   ```

2. Install frontend dependencies:
   ```bash
   cd front-end
   yarn
   ```

3. Start the backend (runs on http://localhost:3000):
   ```bash
   yarn start:dev
   ```

4. Start the frontend (runs on http://localhost:5173):
   ```bash
   cd front-end
   yarn dev
   ```

### Testing
- Backend tests: `yarn test`

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

# KatKin's Full-stack Coding Test

## BEFORE YOU BEGIN

Please take your time to thoroughly read through this README. If anything is unclear or you think there is a mistake somewhere, please let us know via email. We recommend you spend around 90 minutes on this test and do as much as you can. Submission instructions are at the bottom of this README.

This test is split into two parts - a backend REST API section, and a frontend section. If you struggle to finish the backend section, then please do the frontend section to the best of your ability by either faking/stubbing or not doing any API calls.

Do not worry if you do not finish everything. If in doubt, err on the side of quality.

We also encourage you to:

- Use Google, Stackoverflow, online documentation, AI as much as you require.
- Write tests if you think they are beneficial, but only if you think they are within reason of the time limit.
- Install and use any third party packages if you see fit
- Think about what you would do if you had more time, or if this was a real-world production project. We may ask further questions about your solution in further interviews.

## How will we assess your solution?

- Readability and how well-typed your code is
- The code should be written in Typescript and _must_ compile and run, on Node 18 or later.
- We take into account your previous experience with TypeScript.
- Don't implement anything unnecessary - i.e. authentication, database, containerization. We won't give additional credit for that.

## Description
 As a highly personalised service, communications to our customers must be tailored purr-fectly and personalised to each and every customer. As we have multiple channels of communications (i.e. emails, SMS, landing pages), we like to keep the templating logic for this channel-agnostic and in a dedicated REST API service.

 For example, calling `GET /comms/welcome-fresh/<USER-ID>` might return
```json
{
    "message": "Welcome to KatKin, <full-name>! We're super excited for <cat1> and <cat2> to join the KatKin club and start loving fresh!"
}
```
with the interpolated values populated with that specific customer's (and cat's) data. This endpoint could then be used to generate content for SMSs, emails, or personalized web pages.


## The setup
A skeletal backend has already been setting up for you, using TypeScript and NestJS - the language and framework we use at KatKin. To run this backend, you can do `yarn start`.

There is no frontend setup - you are free to setup one of your own React-based one as you choose, either within the same repository or in a different repository.

There is a `data.json` file containing user data in this repository, which you should read from in place of a database.

## 1. The Backend Task

Within this codebase, create an endpoint `/comms/your-next-delivery/<USER-ID>`, that looks up the corresponding user's data, and returns a JSON payload of the following shape:

```JSON
{
    "title": "Your next delivery for <cat names, separated by comma or 'and'>",
    "message": "Hey <firstName>! In two days' time, we'll be charging you for your next order for <cat names, formatted as described below>'s fresh food.",
    "totalPrice": <total price, calculated via the formula shown in a later section in this README>,
    "freeGift": <true if the total price exceeds 120 pounds, otherwise false>
}
```

Cat names should be formatted in a grammatically correct manner, i.e. just `A` if there's a single cat named A, `A and B` if there's two cats, `A, B and C` if there's three or more cats.

For example, with the following user:

```JSON
{
  "id": "ff535484-6880-4653-b06e-89983ecf4ed5",
  "firstName": "Kayleigh",
  "lastName": "Wilderman",
  "email": "Kayleigh_Wilderman@hotmail.com",
  "cats": [
    {
      "name": "Dorian",
      "subscriptionActive": true,
      "breed": "Thai",
      "pouchSize": "C"
    },
    {
      "name": "Ocie",
      "subscriptionActive": true,
      "breed": "Somali",
      "pouchSize": "F"
    },
    {
      "name": "Eldridge",
      "subscriptionActive": false,
      "breed": "Himalayan",
      "pouchSize": "A"
    }
  ]
}
```
hitting `/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5` should return the following body:
```JSON
{
    "title": "Your next delivery for Dorian and Ocie",
    "message": "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
    "totalPrice": 134.00,
    "freeGift": true
}
```

### Price calculation

Cats come in different shapes and sizes. Bigger cats need more food, and vice versa. Our food is delivered in pouches, hence we use the term _pouch size_ to refer to how much food a cat needs. Therefore, every cat in the dataset will have a `pouchSize` attributed to them - between `A` to `F`. Every pouch size will have its own price.

A user's order price is there calculated as the sum of their _active_ cats' pouch size prices. The pouch size prices are described below:

```
A -> 55.50 GBP
B -> 59.50 GBP
C -> 62.75 GBP
D -> 66.00 GBP
E -> 69.00 GBP
F -> 71.25 GBP
```

So for example, if a user had 3 cats, each on pouch size A, B, C, but only the first two cats (on A and B) currently have an active subscription, then their price would be 55.50 + 59.50 = £115.00 pounds.


## 2. The Frontend Task

Using React (or your favourite React-based metaframework of choice), create a frontend with just one page - `/welcome/<USER-ID>`, which calls the API endpoint described in the previous step and renders the message in a style similar to the figma file provided [here](https://www.figma.com/design/b6Q7B8dBr6QbdqkhPNoFgD/Untitled?node-id=0-1).

You can:
  - Create a separate folder/repository to do this if you choose.
  - Use any libraries/frameworks you want, i.e. Tailwind, styled components (or not - feel free to just use regular styling/CSS as well).
  - Use any project generators you want (i.e. `create-next-app`, `create-react-app`, `create-vite-app`)

_Note_: We aren't expecting an exact 1-to-1 copy of the design, i.e. exact fonts, spacing, or colors. Just get roughly close enough. __Use any random image of a cat__ that you can find.



# Submission

Either:

1. Make your solution publicly available in a Git repository(s) and send us the URL(s). You can have a separate frontend/backend repository if you want. Please make sure to name the repository something inconspicuous, i.e, don't put `KatKin` in the name. Do not fork this repository as your solution will be visible to all other candidates.
2. Or, if option 1 is unfeasible, zip up all your code (please do not include `node_modules`!) and send it via email to tech@katkin.com

We would also appreciate it if you can write a sentence or two about what you think of this test and/or and how we could improve it.

## 🛠️ Setup and Installation

### Prerequisites
- **Node.js** (v18 or later)
- **npm**
- **Add gemini key to env properties [Link](https://ai.google.dev/gemini-api/docs/api-key)**

### Install Dependencies

```bash
npm install
```

### Start Local dev server
```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Features

### 🌐 **Streaming Interface**
The streaming interface is designed to provide a seamless real-time interaction experience. Key features include:

- **Scroll Container with Auto-Scroll**: Automatically scrolls to the latest message as new responses arrive.
- **Copy & Share Support**: Enables users to easily copy and share the content of any message.
- **Live Metrics Display**: Tracks and displays key metrics in real-time:
  - **Tokens per Second**:  
    Calculated using:  
    ```javascript
    tokensPerSecond = (tokensCount * 1000) / totalTime;
    ```
  - **Total Token Usage**:  
    Derived using:  
    ```javascript
    getTotalTokenUsed(messages); // Splits messages to compute total tokens.
    ```
  - **Estimated Completion Time**:  
    Estimated based on:  
    ```javascript
    estimatedCompletionTime = 
      (maxTokens.current - tokensCount) / tokensPerSecond;
    ```
- **Powered by Vercel AI SDK**: These functionalities are implemented using the `useChat` interface provided by the Vercel AI SDK.

### ⚙️ **Model Configuration**
The model configuration feature allows for fine-tuning AI behavior through various parameters:  
- **Temperature**: Controls randomness in responses (0–2).  
- **Top-k Sampling**: Limits choices to the top-k tokens.  
- **Frequency Penalty**: Reduces the likelihood of repeating tokens.  
- **Presence Penalty**: Encourages topic diversity.  

#### Key Features:
- Parameters are managed using the **Context API**, enabling seamless integration with the chat component.  
- Configurations are passed to the **`streamText` constructor** to ensure accurate model behavior.  
- **Import & Export Support**: Easily save and load model configurations for reuse or sharing.  


### 🔧 Further Optimizations
To enhance State Management, Recovery Mechanism and UX are the following optimizations can be implemented:

1. **Advanced State Management**: 
   - Implement more granular state updates to reduce unnecessary renders.  

2. **Error Recovery**:  
   - Provide richer error recovery options, like restarting sessions without data loss.  
   - Integrate with external logging systems for better error diagnostics.  

3. **User Interface Enhancements**:  
   - Add drag-and-drop functionality for importing/exporting model configurations.  
   - Implement a dark mode toggle for better user accessibility.  
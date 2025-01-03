# Engineering Assignment

Your task is to enhance a chat UI while adhering to the design principles of the Langdock application. The final submission should include a model selector, message regeneration functionality, and smooth streaming interactions.

## Objectives

Your solution should showcase your ability to:
- Write clean, maintainable, and well-documented code.
- Develop a high-quality and user-friendly interface following design principles.
- Implement efficient logical structures and data handling.

The starting repository contains a simple chat UI using the OpenAI SDK to generate responses. The conversation history is linear and sends only the latest user message to the LLM.

## Tasks

### 1. Chat UI Improvement  
- Enhance the chat UI of the template following the design principles and visual style of the [Langdock application](https://app.langdock.com/) (sign-up for a free account).  
- You can adapt and improve the UI/UX as needed while drawing inspiration from applications like Linear or ChatGPT.  
- Implement a **model selector** to allow users to choose between at least two different models.
- Below is a screenshot of how the UI could look like.
    ![Chat UI](https://raw.githubusercontent.com/Langdock/assignment/refs/heads/main/img/chat-1.png)

### 2. Regenerate Messages  
- Add functionality to **regenerate any message** in the conversation.
- Allow users to select a **different model** when regenerating a message.  
- Implement **message threads**: Users should be able to navigate between message threads. Ensure the conversation history of the current thread is sent to the LLM. You can check the behavior of threads in the Langdock app.
  > Please be aware that this can be quite a rabbit hole. It's okay to keep things simple here and its fine if there are some edge cases remaining that are not handled perfectly. Ideally you are aware of them and can tell us about the limitations of your solution.
- You don't have to implement editing messages.
- You should build a small efficient data structure to store the message threads.
- Below is a screenshot of how the UI could look like.
    ![Chat UI](https://raw.githubusercontent.com/Langdock/assignment/refs/heads/main/img/chat-2.png)

### 3. [Bonus] Streaming Optimization  
- Optimize the message streaming experience to ensure smooth character-by-character rendering without jumps between chunks. The stream is artificially chunked at 200 characters (simulating LLM behavior). You should handle this in the UI and not change the behavior of the stream.
- Add a **typing indicator** during streaming.  
- Render the final message with **Markdown** support.

## Technical Guidelines

- Use the provided repository as your starting point.  
- You can import additional libraries if needed.
- You should use the OpenAI SDK for the interactions with the LLM.

## Evaluation Criteria

Your solution will be evaluated on the following:

1. **Code Quality**  
   - Clean, modular code structure.  
   - TypeScript implementation, error handling, and documentation.  

2. **UI/UX Implementation**  
   - Design fidelity based on Langdock principles.  
   - Smooth, responsive, and intuitive interactions.  

3. **Technical Architecture**  
   - Efficient data structures for managing message threads.
   - Robust application architecture.


## Submission Guidelines

1. Create a new repository from this template to your private GitHub account. Follow [these instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) to create a new repository from a template.  
2. Make sure the repository is **private**.  
3. Invite the following users to access your submission:  
   - `karl-richter`  
   - `jbeiss`  
   - `nhoelterhoff`  

## Expectations
We expect you to spend approximately **3 hours** on this challenge, focusing on the most relevant aspects of the tasks described above. While you’re welcome to invest more time if you choose, it is **not required**. You are encouraged to **prioritize** specific areas of the challenge based on your strengths and time availability. Typically, you will have until **the end of the next weekend** to submit your solution. If you have any questions or need clarification at any point, please don’t hesitate to reach out to us. Once you submit your solution, we will schedule a **45-minute follow-up call**. During this session, you’ll have the opportunity to walk us through your implementation, and we’ll ask a few technical questions to better understand your approach.

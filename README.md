# Product Engineering Assignment

Build a chat experience that helps someone turn an AI response into work they can use.

At Langdock, product engineers own a customer problem from understanding the need through designing, building, and operating the solution. This exercise gives us a small example of that work: making thoughtful product decisions, delivering a polished interface, and building sound foundations across the stack.

## The user problem

Imagine a customer success manager preparing a follow-up email after a customer meeting. They ask an AI assistant for a draft, ask follow-up questions, and try another response when the first one misses the mark. Today, it is easy to lose a useful answer or become unsure which version a follow-up refers to. Waiting for a response or recovering from a failure can also be confusing.

Build a focused chat experience where this person can explore alternatives, keep their place, and confidently continue from the answer they choose. The scenario should guide your design; you do not need email integration or a specialized email-generation backend.

The starter contains a basic chat UI and a streaming OpenAI endpoint. It currently sends only the latest user message to the model. Treat it as a starting point: assess the existing behavior and improve what matters for the experience below.

## What to build

### 1. A polished conversation experience

Make it feel like a product someone could use every day. We will assess the actual interface and interactions, including:

- Clear visual hierarchy, considered typography and spacing, readable responses, and consistent controls.
- An inviting empty state, a comfortable message composer, and sensible keyboard and focus behavior.
- Clear feedback while a response is starting and streaming, with scrolling that lets someone read without fighting the interface.
- An understandable failure state and a way to recover without losing the user's work.
- A layout that remains usable on a narrow screen, with accessible labels and visible keyboard focus.

Use the [Langdock app](https://app.langdock.com/) as a reference for quality and visual language. You can also draw inspiration from Linear or ChatGPT. Make your own interaction decisions and be ready to explain them. You may use component libraries; we care about the quality and coherence of the resulting experience.

### 2. Alternative responses without losing context

Let the user regenerate an assistant response, keep the original, and switch between alternatives. Each alternative can lead to its own follow-up conversation. Make the selected alternative and the available navigation understandable in the UI.

At minimum, this flow should work:

1. Send a message and receive a streamed response, A.
2. Regenerate it to create response B, retaining A.
3. Continue from B with a follow-up and receive a response using that branch's history.
4. Switch back to A and continue from it. The follow-up from B must not appear in this branch or be sent as context.
5. Return to B and find its follow-up conversation intact.

A branch is an alternative path within one conversation. You can limit regeneration to the latest assistant response on the selected path. Switching to an earlier alternative should restore that alternative's existing continuation, if any. You do not need to implement message editing.

Choose a small, explicit data structure for messages, alternatives, and the active path. The model must receive the selected path's conversation history in order. Be ready to explain the invariants your representation preserves and how you retrieve that history. We deliberately leave the representation up to you.

### 3. A dependable client/server boundary

Use the OpenAI SDK from a server-side endpoint and keep credentials on the server. Implement request validation, assemble or validate the selected conversation context at that boundary, and return useful errors for the UI. Consider what happens when a request fails before or during streaming.

For this prototype, the browser may hold the conversation state and send the selected history to the server. Allowing one generation at a time is sufficient; make the behavior explicit when someone tries to submit again or switch branches while a response is running. A late response must not attach to the wrong branch.

Include a few focused automated tests for the important behavior, such as branch isolation and history selection, or invalid requests and failed generations. Choose tests that protect your decisions rather than pursuing a coverage target.

## Scope and time

Spend **3–4 hours**, including validation and a short handover. Stop at the time box and tell us what remains. We value a coherent working flow and deliberate prioritization; adding more features or spending longer does not earn extra credit. If you run short on time, preserve the core flow and explain the gaps.

Use this repository as your starting point with TypeScript, React, Next.js, Tailwind, and the OpenAI SDK. You may add libraries and restructure the code.

One configured model is enough. A model selector, multiple providers, authentication, a database, conversation persistence across reloads, file uploads, tools, deployment, and load testing are **not required**. In-memory state is fine. We will discuss how you would evolve the prototype in the interview; you do not need to build production infrastructure for the take-home.

AI coding tools are welcome. You are responsible for understanding, reviewing, and validating what you submit, and should be able to explain or change it during the review.

## What we evaluate

| Area | What we look for |
| --- | --- |
| Product judgment | You understand the user's problem, choose sensible defaults, prioritize the important interactions, and explain what you cut. |
| UI and UX craft | The interface feels considered and coherent. Navigation, waiting, failure, and recovery are easy to understand; visual polish and interaction quality both matter. |
| Technical foundations | Branches preserve the right context, state transitions are predictable, and the client/server boundary handles invalid input and failure sensibly. |
| Engineering judgment | The code is readable, tests cover meaningful risks, and you can explain tradeoffs, limitations, and the next improvements. |

A visually polished happy path alone is incomplete. A technically correct solution also needs care in how people use it. We assess both within the time you had.

## The review conversation

We will start by using the app together, then follow a message through your implementation. Be ready to discuss:

- **Product and design:** Which user need did you prioritize? What did you simplify? What feedback or evidence would tell you whether the experience works?
- **Data structures:** How are branches represented? How do you select history, preserve continuations, and avoid mixing alternatives? How do time and memory costs change as a conversation grows?
- **Backend correctness:** What happens on duplicate submissions, a provider timeout, a disconnected client, or a response that arrives after the user switches branches? How would you store this durably and handle two tabs editing the same conversation?
- **Production and load:** Imagine 1,000 people generating responses at once. What assumptions would you clarify, what would bottleneck first, and how would you measure it? Discuss connection lifetimes, provider limits, bounded retries, cost, and protecting one workspace from another's load. Which changes would you make first, and which would you defer?

These are discussion topics, not extra implementation requirements. We want reasoning grounded in your code and explicit assumptions, rather than a list of infrastructure technologies.

## Submission

1. Create a **private repository** from this template in your GitHub account ([instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)).
2. Invite `karl-richter` and `balazscsomor`.
3. Add a short `SUBMISSION.md` with setup or demo instructions, time spent, your main product and technical decisions, known limitations, and what you would do next. A few concise paragraphs or bullets are enough; no slide deck is needed.
4. Submit by the date agreed in your invitation, and at least the evening before your review call. Use the scheduling link in your invitation if a call has not been booked.

If you need an OpenAI API key or access to the Langdock app, contact us and we will help. Use an inexpensive model during development. Let us know if setup issues prevent you from getting started.

## Local development

Use Node.js 24 or newer (`nvm use` selects Node 24), then run `npm ci`.
Create `.env.local` with `OPENAI_API_KEY=your-api-key` and run `npm run dev`.

Run `npm run lint`, `npm run typecheck`, and `npm run build` to validate changes.
Linting runs separately from the Next.js production build.

The template uses Next.js 16, React 19, OpenAI SDK 7, and Tailwind CSS 4.
Tailwind theme extensions live in `app/globals.css`.
Tailwind 4 requires Safari 16.4+, Chrome 111+, or Firefox 128+.
TypeScript stays on version 6 because the current TypeScript ESLint integration
does not support version 7. ESLint stays on version 9 to match the declared
peer dependencies of Next's lint plugins.

As of October 20, 2026, npm audit reports an unpatched `braces` advisory through
Next's development-only ESLint dependency chain. Its suggested automated fix
downgrades `eslint-config-next` to version 14 and should not be applied.

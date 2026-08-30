# RAG-Based YouTube Video Assistant

An AI-powered Chrome extension that allows users to ask questions about YouTube videos and receive context-aware answers based on the video's transcript.

Instead of manually watching, scrubbing through, or searching the transcript of a long YouTube video, users can simply ask a question. The system retrieves the video's transcript, processes it into searchable chunks, finds the most relevant sections using vector similarity search, and provides the retrieved context to Google Gemini to generate a grounded response.

---

## Overview

Long-form YouTube videos often contain valuable information, but finding a specific piece of information can require manually searching through the video or its transcript.

This project addresses that problem by combining:

- YouTube transcript extraction
- Text preprocessing and chunking
- Embedding generation
- Vector similarity search
- FAISS
- Retrieval-Augmented Generation (RAG)
- Google Gemini
- Chrome Extension APIs

The result is an interactive **YouTube Video Assistant** that allows users to communicate with video content through natural-language questions.

---

## Problem Statement

Finding specific information inside long YouTube videos can be time-consuming.

Users typically need to:

- Watch the entire video.
- Manually scrub through different timestamps.
- Search through the transcript.
- Identify the section containing the required information.
- Read or listen to the relevant portion before getting the answer.

This becomes especially inefficient for:

- Educational lectures
- Technical tutorials
- Interviews
- Conferences
- Podcasts
- Long-form discussions
- Research presentations

The project solves this problem by transforming the transcript into a searchable knowledge source and allowing users to interact with it using natural-language questions.

---

## Solution

The system implements a **Retrieval-Augmented Generation pipeline** specifically for YouTube videos.

When a user interacts with a video, the application:

1. Retrieves the video's transcript.
2. Cleans and processes the transcript.
3. Splits the transcript into smaller chunks.
4. Generates embeddings for the chunks.
5. Stores the embeddings in FAISS.
6. Accepts a natural-language question from the user.
7. Embeds the user's question.
8. Retrieves the most relevant transcript chunks.
9. Sends the retrieved context to Google Gemini.
10. Generates a context-aware answer for the user.

### Core Pipeline

```text
YouTube Video
      │
      ▼
Transcript Extraction
      │
      ▼
Transcript Processing
      │
      ▼
Text Chunking
      │
      ▼
Embedding Generation
      │
      ▼
FAISS Vector Store
      │
      │
      ▼
   User Query
      │
      ▼
Query Embedding
      │
      ▼
Similarity Search
      │
      ▼
Relevant Transcript Chunks
      │
      ▼
Google Gemini
      │
      ▼
Context-Aware Answer
# AI Portfolio Chatbot

An interactive portfolio website powered by RAG (Retrieval-Augmented Generation) that allows visitors to chat with an AI version of me to learn about my experience, skills, and projects.

🌐 **Live Demo**: [anshkakkar.dev](https://anshkakkar.dev)

## 🚀 How It Works

This project uses a **RAG (Retrieval-Augmented Generation)** architecture:

1. **Embedding Creation**: Resume content is converted into vector embeddings using OpenAI's `text-embedding-ada-002` model
2. **Vector Storage**: Embeddings are stored in Supabase's pgvector database for efficient similarity search
3. **Semantic Search**: When a user asks a question, it's converted to an embedding and matched against the stored vectors
4. **Context Retrieval**: The most relevant resume information is retrieved based on semantic similarity
5. **AI Response**: OpenAI's GPT-4 generates natural, conversational responses using the retrieved context

This approach ensures accurate, contextual responses while preventing hallucinations by grounding answers in actual resume content.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React
- **Styling**: Custom CSS with modern gradients and animations
- **AI/ML**: OpenAI API (GPT-4 & Embeddings)
- **Database**: Supabase (PostgreSQL + pgvector)
- **Deployment**: Vercel
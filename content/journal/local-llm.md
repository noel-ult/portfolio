---
title: "Running LLMs Locally: Lessons in Quantization and Ollama Optimization"
date: "2026-07-15"
readingTime: 6
tags: ["Local AI", "Ollama", "Python", "Quantization", "FastAPI"]
coverImage: "journal/local-llm.jpg"
summary: "An in-depth technical analysis of CPU-bound quantization performance, evaluating Q4_K_M vs Q8_0 GGUF inference latency on host RAM."
featured: true
---

# Context & Motivation

Cloud-based LLM APIs offer rapid responses, but introduce recurring token execution costs, network latency overhead, and privacy risks when processing proprietary codebase files.

## The Engineering Problem

Running full-precision FP16 models (such as LLaMA 3.1 8B requiring ~16GB VRAM) on standard laptop hardware leads to severe thrashing and out-of-memory crashes.

## Empirical Approach & Benchmark

We evaluated **GGUF 4-bit quantization (Q4_K_M)** using Ollama's C++ inference engine bound to a lightweight FastAPI proxy streaming tokens via **Server-Sent Events (SSE)**.

```python
@app.post("/api/chat")
async def stream_chat(req: ChatRequest):
    async def event_generator():
        async for chunk in ollama_client.stream(req.prompt):
            yield f"data: {json.dumps({'token': chunk})}\n\n"
    return StreamingResponse(event_generator(), media_type="text/event-stream")
```

### Performance Results Table

| Quantization Format | Memory Footprint | Token Generation Speed | Perception Latency |
| :--- | :--- | :--- | :--- |
| FP16 (Full Precision) | 16.2 GB | ~0.8 tokens/sec | Severe Thrashing |
| Q8_0 (8-bit) | 8.5 GB | ~3.2 tokens/sec | Acceptable |
| **Q4_K_M (4-bit)** | **4.7 GB** | **~8.5 tokens/sec** | **Instant Response** |

> **Key Lesson**: Memory bandwidth is the primary bottleneck for CPU-bound LLM inference, not raw compute capacity. Streamed token buffers prevent perception of latency.

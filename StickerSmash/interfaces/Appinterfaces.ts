// Interfaces generales

export interface Candidate {
    content: Content;
    finishReason: string;
    citationMetadata: CitationMetadata;
    avgLogprobs: number;
}
export interface Message {
    sender_by: string; // Cambia a sender si es necesario
    text: string;
    date: Date; // O Timestamp si usas Firebase
    state: string; // Por ejemplo: "viewed", "received"
  }

export interface CitationMetadata {
    citationSources: CitationSource[];
}

export interface CitationSource {
    startIndex: number;
    endIndex: number;
    uri?: string;
}

export interface Content {
    parts: Part[];
    role: string;
}

export interface Part {
    text: string;
}

export interface UsageMetadata {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: TokensDetail[];
    candidatesTokensDetails: TokensDetail[];
}

export interface TokensDetail {
    modality: string;
    tokenCount: number;
}


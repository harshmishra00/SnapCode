"use server";

import axios, { AxiosError } from "axios";
import { languageOptions } from "@/config/languages";

export type ExecuteCodeResult =
    | {
          success: true;
          output: string;
          error: boolean;
      }
    | {
          success: false;
          error: string;
      };

export async function ExecuteCode(requestPayload: {
    language: string;
    version: string;
    files: { content: string }[];
}): Promise<ExecuteCodeResult> {
    const clientId = process.env.JDOODLE_CLIENT_ID;
    const clientSecret = process.env.JDOODLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return {
            success: false,
            error: "Code execution service authentication failed.",
        };
    }

    const codeContent = requestPayload.files[0]?.content?.trim();
    if (!codeContent) {
        return {
            success: false,
            error: "Code cannot be empty.",
        };
    }

    // Find the language configuration
    const languageConfig = languageOptions.find(
        (lang) => lang.name.toLowerCase() === requestPayload.language.toLowerCase()
    );

    if (!languageConfig || !languageConfig.available) {
        return {
            success: false,
            error: "This language is currently unavailable.",
        };
    }

    try {
        const response = await axios.post(
            "https://api.jdoodle.com/v1/execute",
            {
                clientId,
                clientSecret,
                script: codeContent,
                language: languageConfig.jdoodleLanguage,
                versionIndex: languageConfig.versionIndex,
                stdin: "",
            },
            {
                timeout: 30_000,
            }
        );

        const data = response.data;

        if (data.error) {
            // JDoodle API level error (e.g., unauthorized, daily limit reached)
            if (response.status === 401 || data.statusCode === 401) {
                return {
                    success: false,
                    error: "Code execution service authentication failed.",
                };
            }
            if (response.status === 429 || data.error.toLowerCase().includes("limit") || data.statusCode === 429) {
                return {
                    success: false,
                    error: "Code execution limit reached. Please try again later.",
                };
            }
            return {
                success: false,
                error: data.error,
            };
        }

        // JDoodle returns { output, statusCode, memory, cpuTime }
        // We will consider it an error output if JDoodle returns a statusCode != 200 within the 200 OK HTTP response
        // Wait, JDoodle's internal statusCode for compilation errors is usually non-200. Actually, a compilation error often returns HTTP 200, but data.statusCode could be 400 or something? 
        // According to docs, compilation/runtime errors return HTTP 200, and output contains the error message.
        // We can just pass it directly.
        
        return {
            success: true,
            output: data.output || "",
            error: false, // JDoodle bundles compilation errors into output. We can optionally parse it, but for now we set it to false so it prints normally.
        };

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if (!err.response) {
                return {
                    success: false,
                    error: "Code execution service is currently unavailable.", // Network failure
                };
            }
            
            const status = err.response.status;
            const body = err.response.data as { error?: string } | undefined;
            
            if (status === 401) {
                return {
                    success: false,
                    error: "Code execution service authentication failed.",
                };
            }
            if (status === 429) {
                return {
                    success: false,
                    error: "Code execution limit reached. Please try again later.",
                };
            }
            
            return {
                success: false,
                error: body?.error ?? "Code execution service is currently unavailable.",
            };
        }

        return {
            success: false,
            error: "An unexpected error occurred while executing code.",
        };
    }
}

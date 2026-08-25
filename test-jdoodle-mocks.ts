import axios from "axios";

import { ExecuteCode } from "./actions/execute-code";

// Override axios.post globally to mock JDoodle responses
const originalPost = axios.post;

async function runTests() {
    console.log("--- RUNNING MOCKED TESTS ---");
    let passed = 0;
    let failed = 0;

    const assert = (condition: boolean, name: string) => {
        if (condition) {
            console.log(`✅ PASS: ${name}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${name}`);
            failed++;
        }
    };

    // 1. Compilation Error
    axios.post = async () =>
        ({
            data: {
                output: "SyntaxError: invalid syntax",
                statusCode: 200,
                memory: "0",
                cpuTime: "0",
            },
            status: 200,
        }) as any;
    let result = await ExecuteCode({
        language: "python",
        version: "3.10.0",
        files: [{ content: "print(hello)" }],
    });

    assert(
        result.success === true &&
            "output" in result &&
            result.output.includes("SyntaxError"),
        "Compilation Error",
    );

    // 2. Runtime Error
    axios.post = async () =>
        ({
            data: {
                output: "ZeroDivisionError: division by zero",
                statusCode: 200,
                memory: "100",
                cpuTime: "0.1",
            },
            status: 200,
        }) as any;
    result = await ExecuteCode({
        language: "python",
        version: "3.10.0",
        files: [{ content: "print(1/0)" }],
    });
    assert(
        result.success === true &&
            "output" in result &&
            result.output.includes("ZeroDivisionError"),
        "Runtime Error",
    );

    // 3. Empty output
    axios.post = async () =>
        ({
            data: {
                output: "",
                statusCode: 200,
                memory: "100",
                cpuTime: "0.1",
            },
            status: 200,
        }) as any;
    result = await ExecuteCode({
        language: "python",
        version: "3.10.0",
        files: [{ content: "pass" }],
    });
    assert(
        result.success === true && "output" in result && result.output === "",
        "Empty output",
    );

    // 4. Unsupported language
    result = await ExecuteCode({
        language: "cobol",
        version: "1.0",
        files: [{ content: "..." }],
    });
    assert(
        result.success === false &&
            !("output" in result) &&
            result.error.includes("unavailable"),
        "Unsupported language",
    );

    // 5. Invalid API response (API returns error string)
    axios.post = async () =>
        ({
            data: {
                error: "Invalid version index",
                statusCode: 400,
            },
            status: 400,
        }) as any;
    result = await ExecuteCode({
        language: "python",
        version: "3.10.0",
        files: [{ content: "pass" }],
    });
    assert(
        result.success === false &&
            !("output" in result) &&
            result.error.includes("Invalid version index"),
        "Invalid API response",
    );

    // 6. Network failure
    axios.post = async () => {
        const err: any = new Error("Network Error");

        err.isAxiosError = true;
        // no err.response
        throw err;
    };
    result = await ExecuteCode({
        language: "python",
        version: "3.10.0",
        files: [{ content: "pass" }],
    });
    assert(
        result.success === false &&
            !("output" in result) &&
            result.error.includes("currently unavailable"),
        "Network failure",
    );

    // 7. Authentication failure
    axios.post = async () => {
        const err: any = new Error("Request failed with status code 401");

        err.isAxiosError = true;
        err.response = { status: 401, data: { error: "Unauthorized" } };
        throw err;
    };
    result = await ExecuteCode({
        language: "python",
        version: "3.10.0",
        files: [{ content: "pass" }],
    });
    assert(
        result.success === false &&
            !("output" in result) &&
            result.error.includes("authentication failed"),
        "Authentication failure",
    );

    // 8. Quota error
    axios.post = async () => {
        const err: any = new Error("Request failed with status code 429");

        err.isAxiosError = true;
        err.response = { status: 429, data: { error: "Daily limit reached" } };
        throw err;
    };
    result = await ExecuteCode({
        language: "python",
        version: "3.10.0",
        files: [{ content: "pass" }],
    });
    assert(
        result.success === false &&
            !("output" in result) &&
            result.error.includes("limit reached"),
        "Quota error",
    );

    // 9. Malformed response (JSON missing expected fields but status is 200, should be handled gracefully)
    axios.post = async () =>
        ({
            data: {}, // empty object
            status: 200,
        }) as any;
    result = await ExecuteCode({
        language: "python",
        version: "3.10.0",
        files: [{ content: "pass" }],
    });
    assert(
        result.success === true && "output" in result && result.output === "",
        "Malformed response",
    );

    console.log(`\nTests completed. Passed: ${passed}, Failed: ${failed}`);
}

// Ensure credentials exist for the tests (so they don't fail early)
process.env.JDOODLE_CLIENT_ID = "mock-id";
process.env.JDOODLE_CLIENT_SECRET = "mock-secret";

runTests().catch(console.error);

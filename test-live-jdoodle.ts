import { ExecuteCode } from "./actions/execute-code";
import fs from "fs";

// Load .env.local manually if running outside Next.js
const envLocal = fs.readFileSync(".env.local", "utf8");
envLocal.split("\n").forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let key = match[1].trim();
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
        }
        process.env[key] = val;
    }
});

async function runLiveTests() {
    console.log("--- RUNNING 3 AUTHORIZED LIVE JDOODLE TESTS ---");

    // 1. C++
    console.log("Testing C++...");
    const cppCode = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello SnapCode";
    return 0;
}`;
    const cppResult = await ExecuteCode({ language: "c++", version: "10.2.0", files: [{ content: cppCode }] });
    console.log("C++ Result:", cppResult);

    // 2. Python
    console.log("\\nTesting Python...");
    const pythonCode = `print("Hello SnapCode")`;
    const pyResult = await ExecuteCode({ language: "python", version: "3.10.0", files: [{ content: pythonCode }] });
    console.log("Python Result:", pyResult);

    // 3. JavaScript
    console.log("\\nTesting JavaScript...");
    const jsCode = `console.log("Hello SnapCode")`;
    const jsResult = await ExecuteCode({ language: "javascript", version: "18.15.0", files: [{ content: jsCode }] });
    console.log("JavaScript Result:", jsResult);
}

runLiveTests().catch(console.error);

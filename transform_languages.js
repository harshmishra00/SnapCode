const fs = require('fs');
const content = fs.readFileSync('config/languages.ts', 'utf8');

// We need to inject `available: boolean`, `jdoodleLanguage: string`, `versionIndex: string`
let newContent = content.replace(
    /monacoEditorLang:\s*("[^"]+"),/g,
    (match, p1) => {
        return `${match}\n        jdoodleLanguage: "",\n        versionIndex: "0",\n        available: false,`;
    }
);

// Manually update c++, javascript, python
newContent = newContent.replace(
    /name:\s*"c\+\+",\s*version:\s*"10\.2\.0",\s*imageURL:[^,]+,\s*monacoEditorLang:\s*"cpp",\s*jdoodleLanguage:\s*"",\s*versionIndex:\s*"0",\s*available:\s*false,/,
    `name: "c++",
        version: "10.2.0",
        imageURL: "https://skillicons.dev/icons?i=cpp",
        monacoEditorLang: "cpp",
        jdoodleLanguage: "cpp",
        versionIndex: "5",
        available: true,`
);

newContent = newContent.replace(
    /name:\s*"javascript",\s*version:\s*"18\.15\.0",\s*imageURL:[^,]+,\s*monacoEditorLang:\s*"javascript",\s*jdoodleLanguage:\s*"",\s*versionIndex:\s*"0",\s*available:\s*false,/,
    `name: "javascript",
        version: "18.15.0",
        imageURL: "https://skillicons.dev/icons?i=javascript",
        monacoEditorLang: "javascript",
        jdoodleLanguage: "nodejs",
        versionIndex: "4",
        available: true,`
);

newContent = newContent.replace(
    /name:\s*"python",\s*version:\s*"3\.10\.0",\s*imageURL:[^,]+,\s*monacoEditorLang:\s*"python",\s*jdoodleLanguage:\s*"",\s*versionIndex:\s*"0",\s*available:\s*false,/,
    `name: "python",
        version: "3.10.0",
        imageURL: "https://skillicons.dev/icons?i=python",
        monacoEditorLang: "python",
        jdoodleLanguage: "python3",
        versionIndex: "4",
        available: true,`
);

// update type definition
newContent = newContent.replace(
    /monacoEditorLang:\s*string;\n\}> = \[/,
    `monacoEditorLang: string;
    jdoodleLanguage: string;
    versionIndex: string;
    available: boolean;
}> = [`
);

fs.writeFileSync('config/languages.ts', newContent);
console.log("Updated config/languages.ts");

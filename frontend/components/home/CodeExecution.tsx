import util from "util";
import { CodeBlockProps } from "./CodeBlock";
const exec = util.promisify(require("child_process").exec);

const languageMap: Record<
    string,
    {
        dockerImage: string;
        command: string;
    }
> = {
    javascript: {
        dockerImage: "node:18-alpine",
        command: "node -e"
    },
    python: {
        dockerImage: "python:3.9-alpine",
        command: "python -c"
    }
};
const supportedLanguages = Object.keys(languageMap);

async function runCode(code: string, language: string) {
    if (!(language in languageMap)) {
        throw new Error("Unsupported language");
    }
    const { dockerImage, command } = languageMap[language];
    const { stdout } = await exec(
        `timeout 5 docker run --rm -i ${dockerImage} ${command} "${code.replaceAll('"', '\\"')}"`
    );

    // Currently does not expose stderr to user
    return stdout;
}

export async function CodeExecution(props: CodeBlockProps) {
    const { code, language } = props;

    if (!supportedLanguages.includes(language)) {
        return null;
    }

    let output = "";
    let isItalics = false;
    try {
        output = await runCode(code, language);
        if (!output) {
            output = "No output";
            isItalics = true;
        }
    } catch {
        output = "Execution timed out";
        isItalics = true;
    }

    const splitOutput = output.split("\n");
    if (splitOutput.at(-1) === "") {
        splitOutput.pop();
    }
    return (
        <pre className="language-text">
            <code>
                <div className={isItalics ? "text-italic" : ""}>
                    {splitOutput.map((line, i) => {
                        return (
                            <span key={i}>
                                &gt; {line}
                                <br />
                            </span>
                        );
                    })}
                </div>
            </code>
        </pre>
    );
}

export function CodeExecutionLoading() {
    return (
        <pre className="language-text">
            <code>
                &gt; Running
                <span className="AnimatedEllipsis" />
            </code>
        </pre>
    );
}

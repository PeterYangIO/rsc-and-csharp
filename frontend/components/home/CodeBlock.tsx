import Prism from "prismjs";
import sanitizeHtml from "sanitize-html";
import { CodeExecution, CodeExecutionLoading } from "./CodeExecution";
import { Suspense } from "react";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-okaidia.min.css";

export type CodeBlockProps = {
    code: string;
    language: string;
};

export default function CodeBlock(props: CodeBlockProps) {
    const { code, language } = props;
    const html = sanitizeHtml(Prism.highlight(code, Prism.languages[language], language), {
        allowedAttributes: {
            span: ["class"]
        }
    });

    return (
        <div className="mt-2">
            <div>
                <span className="IssueLabel color-bg-accent-emphasis color-fg-on-emphasis text-mono">{language}</span>
            </div>
            <pre className={`language-${language}`}>
                <code dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
            <Suspense fallback={<CodeExecutionLoading />}>
                <CodeExecution {...props} />
            </Suspense>
        </div>
    );
}

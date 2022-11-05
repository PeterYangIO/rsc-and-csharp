"use client";

import { FormEvent, useRef, useState } from "react";
import { Box, Button, Dialog, FormControl, Select, Textarea, ThemeProvider } from "@primer/react";
import Editor from "@monaco-editor/react";
import APIClient from "../../api-client/APIClient";
import { useRouter } from "next/navigation";

export default function NewPost() {
    const returnFocusRef = useRef(null);
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await APIClient.getInstance().posts.postsCreate({
            code,
            description,
            language
        });

        if (res.ok) {
            setIsOpen(false);
            router.refresh();
        }
    };

    return (
        <ThemeProvider>
            <button className="btn btn-primary" ref={returnFocusRef} onClick={() => setIsOpen(true)}>
                New post
            </button>
            <Dialog
                returnFocusRef={returnFocusRef}
                isOpen={isOpen}
                onDismiss={() => setIsOpen(false)}
                aria-labelledby="new-post-dialog-title"
                sx={{
                    width: "600px"
                }}
            >
                <Dialog.Header id="new-post-dialog-title">New post</Dialog.Header>
                <form onSubmit={onSubmit}>
                    <Box p={3} display="grid" gridTemplateColumns="auto" gridGap={3}>
                        <FormControl>
                            <FormControl.Label>Description</FormControl.Label>
                            <Textarea
                                block
                                onChange={e => setDescription(e.target.value)}
                                rows={3}
                                value={description}
                                resize="none"
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Language</FormControl.Label>
                            <Select onChange={e => setLanguage(e.target.value)} value={language}>
                                <Select.Option value="javascript">JavaScript</Select.Option>
                                <Select.Option value="python">Python</Select.Option>
                                <Select.Option value="html">HTML</Select.Option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Code</FormControl.Label>
                            <Editor
                                height="200px"
                                language={language}
                                theme="vs-dark"
                                onChange={value => setCode(value ?? "")}
                                options={{
                                    minimap: { enabled: false }
                                }}
                            />
                        </FormControl>
                        <Box display="flex" mt={3} justifyContent="flex-end">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Dialog>
        </ThemeProvider>
    );
}

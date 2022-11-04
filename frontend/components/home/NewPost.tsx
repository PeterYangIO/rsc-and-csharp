"use client";

import { useRef, useState } from "react";
import { Box, Button, Dialog, FormControl, Select, Textarea, ThemeProvider } from "@primer/react";
import Editor from "@monaco-editor/react";

export default function NewPost() {
    const returnFocusRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [, setCode] = useState("");

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
                        <Button variant="primary">Submit</Button>
                    </Box>
                </Box>
            </Dialog>
        </ThemeProvider>
    );
}

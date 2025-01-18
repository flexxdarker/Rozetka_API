import {Editor} from "@tinymce/tinymce-react";
import {FC, useRef} from "react";


const EditorTiny: FC = () => {

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };


        return (
            <>
                <div>
                    <Editor

                        apiKey="l4ipj5d2e673xkfnuw4xjsxgaqqu4f45uf8qoh4az9o28mzr"
                        tinymceScriptSrc='/src/components/tinymce/js/tinymce/tinymce.min.js'
                        onInit={(_evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500, //висота самого інтупа
                            language: "en", //мова панелі
                            menubar: true, //показувать меню
                            images_file_types: "jpg,jpeg", //формати файлі, які можна обирать - фото
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <button onClick={log}>Log editor content</button>
                </div>
            </>
        );
    };

    export default EditorTiny;

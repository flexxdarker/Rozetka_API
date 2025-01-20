import {Editor, IAllProps} from "@tinymce/tinymce-react";
import {FC} from "react";
// import {FC, useRef} from "react";
// import {Editor as TinyMCEEditorType} from 'tinymce';

interface MyEditorProps extends IAllProps {
    onEditorChange: (content: string) => void;
}


const EditorTiny: FC<MyEditorProps> = ({onEditorChange}) => {

    // const editorRef = useRef<Editor | null>(null);
    // const editorRef = useRef<TinyMCEEditorType | null>(null);

    const handleEditorChange = (content: string) => {
        if (onEditorChange) {
            onEditorChange(content);
            console.log(content)
        }
    };


    // const handleInit = (editor: TinyMCEEditorType) => {
    //     editorRef.current = editor;
    //     if (!editor.getContent()) {
    //         editor.setContent('<p class="placeholder">Enter your text here...</p>');
    //     }
    //     editor.on('focus', () => {
    //         if (editor.getContent({format: 'text'}) === 'Enter your text here...') {
    //             editor.setContent('');
    //         }
    //     });
    //     editor.on('blur', () => {
    //         if (!editor.getContent()) {
    //             editor.setContent('<p class="placeholder">Enter your text here...</p>');
    //         }
    //     });
    // };

    // const handleEditorChange = (content, editor) => { onEditorChange(content); };
    // const log = () => {
    //     if (editorRef.current) {
    //         console.log(editorRef.current.getContent());
    //     }
    // };

    return (
        <>
            <div>
                <Editor
                    apiKey="l4ipj5d2e673xkfnuw4xjsxgaqqu4f45uf8qoh4az9o28mzr"
                    tinymceScriptSrc='/src/components/tinymce/js/tinymce/tinymce.min.js'
                    // onInit={(_evt, editor) => editorRef.current = editor}
                    //onInit={(editor) => handleInit(editor)}
                    // initialValue='<p class="placeholder">Enter your text here...</p>'
                    init={{
                        placeholder: "Enter your text here...",
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
                    // value={}
                    onEditorChange={handleEditorChange}
                />
                {/*<button onClick={log} type={"button"}>Log editor content</button>*/}
            </div>
        </>
    );
};

export default EditorTiny;

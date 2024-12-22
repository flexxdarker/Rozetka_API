import { Editor } from "@tinymce/tinymce-react";
import {FC} from "react";



const EditorTiny: FC = () => {


    return (
        <>
            <Editor
                apiKey="l4ipj5d2e673xkfnuw4xjsxgaqqu4f45uf8qoh4az9o28mzr"
                tinymceScriptSrc='/src/components/tinymce/js/tinymce/tinymce.min.js'
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
        </>
    );
};

export default EditorTiny;

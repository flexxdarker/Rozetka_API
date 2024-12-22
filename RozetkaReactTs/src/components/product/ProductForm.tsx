import React from 'react';
import Form from "./form.tsx";
import EditorTiny from "../other/EditorTiny.tsx";


const ProductForm: React.FC = () => {

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.text = "111";
    //     // script.src = "/src/components/tinymce/js/tinymce/tinymce.d.ts";
    //     // script.async = true;
    //     document.body.appendChild(script);
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);

    return (
        <>


            <h1>Product form</h1>
            <Form/>

            <EditorTiny/>

        </>
    );
};

export default ProductForm;

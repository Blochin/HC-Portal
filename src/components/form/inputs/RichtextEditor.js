import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Label } from "flowbite-react";
import React from "react";
import PropTypes from "prop-types";

const RichtextEditor = ({ onChange, name, label }) => {
  const editorConfiguration = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "link",
        "blockquote",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "undo",
        "redo",
      ],
    },
  };
  const handleChange = (value) => {
    onChange(name, value);
  };
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div>
        <div className="mb-2 block">
          <Label value={label} />
        </div>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data=""
          onChange={(event, editor) => {
            const data = editor.getData();
            handleChange(data);
          }}
        />
      </div>
    </div>
  );
};

RichtextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default RichtextEditor;

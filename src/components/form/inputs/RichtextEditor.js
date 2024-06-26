import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Label } from "flowbite-react";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "themes/editor-styles.css";

const RichtextEditor = ({ onChange, defaultValue, name, label }) => {
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

  useEffect(() => {
    if (defaultValue === undefined) {
      onChange(name, null);
      return;
    }

    onChange(name, defaultValue);
  }, [defaultValue]);

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
          data={defaultValue}
          contentCss={[`${process.env.PUBLIC_URL}/editor-styles.css`]}
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
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default RichtextEditor;

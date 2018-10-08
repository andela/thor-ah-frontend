import React, { Component } from "react";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import createImagePlugin from "draft-js-image-plugin";
// import createAlignmentPlugin from "draft-js-alignment-plugin";
// import createFocusPlugin from "draft-js-focus-plugin";
// import createResizeablePlugin from 'draft-js-resizeable-plugin';
// import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
// import createDndFileUploadPlugin from 'draft-js-drag-n-drop-upload-plugin';

import styles from "./CreateArticle.module.scss";

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const text = 'Share your thoughts';

class ImageEditor extends Component {
  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = editorState => {
    this.setState({ editorState })
  }

  focus = () => {
    this.editor.focus();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <div className={styles.textEditor} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => {this.editor = element; }}
          />
        </div>
  
        <ImageAdd
          editorState={editorState}
          onChange={this.onChange}
          modifier={imagePlugin.addImage}
        />
      </div>
    )
  }
}


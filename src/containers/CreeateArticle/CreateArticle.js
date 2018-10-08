import React, { Component } from "react";
import { RichUtils } from "draft-js";
import Editor, {
  createEditorStateWithText,
  composeDecorators
} from "draft-js-plugins-editor";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createHighlightPlugin from "draft-js-highlight-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import createImagePlugin from "draft-js-image-plugin";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createDragNDropUploadPlugin from "@mikeljames/draft-js-drag-n-drop-upload-plugin";
import styles from "./CreateArticle.module.scss";

const highlightPlugin = createHighlightPlugin({
  background: "#fffe0d",
  color: "#000",
  padding: "0.3em 0.4em"
});
const linkPlugin = createLinkPlugin();
const linkifyPlugin = createLinkifyPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  addImage: imagePlugin.addImage
});

class CreateArticle extends Component {
  state = {
    editorState: createEditorStateWithText("Share your thoughts")
  };

  plugins = [
    highlightPlugin,
    linkPlugin,
    linkifyPlugin,
    imagePlugin,
    focusPlugin,
    resizeablePlugin,
    dragNDropFileUploadPlugin
  ];

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  handleKeyCommand = command => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  onItalicClick = () => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  onBoldClick = () => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  onUnderlineClick = () => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  onHighlight = () => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
  };

  onStrikeThroughClick = () => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className={styles.createArticle}>
        <div>
          <input placeholder="Title" className={styles.articleTitle} />
          <div className={styles.buttonGroup}>
            <button onClick={this.onBoldClick} type="button">
              <strong>B</strong>
            </button>
            <button onClick={this.onItalicClick} type="button">
              <em>I</em>
            </button>
            <button onClick={this.onHighlight} type="button">
              H
            </button>
            <button onClick={this.onStrikeThroughClick} type="button">
              abc
            </button>
            <button onClick={this.onUnderlineClick} type="button">
              U
            </button>
          </div>
          <div className={styles.textEditor}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              plugins={this.plugins}
              ref={element => {
                this.editor = element;
              }}
            />
          </div>
          <button type="button" className={styles.publishButton}>Publish</button>
        </div>
      </div>
    );
  }
}

export default CreateArticle;

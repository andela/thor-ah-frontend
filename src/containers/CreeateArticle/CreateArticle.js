import React, { Component } from "react";
import { EditorState, RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createImagePlugin from "draft-js-image-plugin";
import styles from "./CreateArticle.module.scss";
import createHighlightPlugin from "./plugins/highlighPlugin";
import addLinkPlugin from "./plugins/linkPlugin";
import mediaBlockRenderer from "./entities/mediaBlockRenderer";

const highlighPlugin = createHighlightPlugin();
const imagePlugin = createImagePlugin();

class CreateArticle extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  plugins = [highlighPlugin, addLinkPlugin, imagePlugin];

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  onAddLink = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link");
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return "handled";
  };

  // onAddImage = event => {
  //   event.preventDefault();
  //   const { editorState } = this.state;
  //   const urlValue = window.prompt("Paste Image Link");
  // };

  handleKeyCommand = command => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
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
      <div className={styles.textEditor}>
        <div className={styles.buttonGroup}>
          <button onClick={this.onBoldClick} type="button">
            B
          </button>
          <button onClick={this.onItalicClick} type="button">
            <em>I</em>
          </button>
          <button onClick={this.onUnderlineClick} type="button">
            U
          </button>
          <button onClick={this.onHighlight} type="button">
            H
          </button>
          <button onClick={this.onStrikeThroughClick} type="button">
            abc
          </button>
          <button id="link-url" onClick={this.onAddLink} type="button">
            <i className="material-icons">attach_link</i>
          </button>
        </div>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          plugins={this.plugins}
          blockRendererFn={mediaBlockRenderer}
        />
      </div>
    );
  }
}

export default CreateArticle;

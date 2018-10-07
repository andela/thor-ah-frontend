import React from "react";
import PropTypes from "prop-types";
import { RichUtils, KeyBindingUtil, EditorState } from "draft-js";

export const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

export const Link = props => {
  const { contentState, entityKey, children } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a
      className="link"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={url}
    >
      {children}
    </a>
  );
};

const addLinkPlugin = {
  keyBindingFn(event, { getEditorState }) {
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.which === 75) {
      return "add-link";
    }
  },

  handleKeyCommand(command, editorState, { setEditorState }) {
    if (command !== "addlink") {
      return "not-handled ";
    }
    const link = window.prompt("Paste the link");
    const selection = editorState.getSelection();
    if (!link) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
      return "handled"
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
      url: link
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return "handled";
  },

  decorators: [
    {
      strategy: linkStrategy,
      component: Link
    }
  ]
};

Link.propTypes = {
  children: PropTypes.string.isRequired,
  contentState: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired
};

export default addLinkPlugin;

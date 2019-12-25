import { EditorState, AtomicBlockUtils, DraftEntityType } from 'draft-js';

export default (
  editorState: EditorState,
  s3Key: string,
  extraData?: object
) => {
  const urlType = 'IMAGE' as DraftEntityType;
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    urlType,
    'IMMUTABLE',
    { ...extraData, s3Key }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );
  return EditorState.forceSelection(
    newEditorState,
    newEditorState.getCurrentContent().getSelectionAfter()
  );
};

import { ContentBlock, EditorState } from 'draft-js';
import addS3Image from './addS3Image';
import S3Image from './S3Image';

export default () => {
  return {
    blockRendererFn: (
      block: ContentBlock,
      { getEditorState }: { getEditorState: () => EditorState }
    ) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = block.getEntityAt(0);
        if (!entity) return null;
        const type = contentState.getEntity(entity).getType();
        if (type.toLowerCase() === 'image') {
          return {
            component: S3Image,
            editable: false,
          };
        }
        return null;
      }
      return null;
    },
    addS3Image,
  };
};

# DraftJS AWS Amplify S3 Plugin

This is a plugin for use with [draft-js-plugins-editor](https://github.com/draft-js-plugins/draft-js-plugins)

It is heavily inspired by the [draft-js-image-plugin](https://www.draft-js-plugins.com/plugin/image).

## Assumptions

### Peer Dependencies

Please note that using this plugin requires your project has `aws-amplify` (not `@aws-amplify/storage`), `react` and `react-dom` packages installed.

### Peer Dependencies Motivation

_Your_ instance of `Amplify` must be configured correctly.

### Amplify Configuration

This plugin assumes you've successfully [configured AWS `Amplify`](https://aws-amplify.github.io/amplify-js/api/#configuration) with an `awsconfig`.

## Example Usage

```typescript
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-aws-amplify-s3-plugin';
import React from 'react';

const s3Plugin = createS3Plugin();
const plugins = [s3Plugin];

// The Editor accepts an array of plugins. In this case, only the s3Plugin
// is passed in, although it is possible to pass in multiple plugins.
const MyEditor = ({ editorState }: { editorState: EditorState }) => {
  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const [file] = Array.from(files);
    const { key: s3Key } = (await Storage.put(file.name, file)) as {
      key: string;
    };
    const newEditorState = s3Plugin.addS3Image(editorState, s3Key);
    setEditorState(newEditorState);
  };

  return (
    <>
      <Editor editorState={editorState} onChange={onChange} plugins={plugins} />
      <input type="file" onChange={onImageChange} />
    </>
  );
};

export default MyEditor;
```

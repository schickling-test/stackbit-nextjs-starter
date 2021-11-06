import { stackbitDocumentTypes } from '@stackbit/components/dist/contentlayer/index.js';
import { makeSource } from 'contentlayer/source-files';

const documentTypes = [...stackbitDocumentTypes];

export default makeSource({
    contentDirPath: 'content',
    documentTypes,
    extensions: {
        stackbit: {
            pagesDir: 'content/pages',
            dataDir: 'content/data'
        }
    }
});

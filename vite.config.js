
const file = 'switchToListView.js';
const outDir = 'dist';
const inDir = 'ts-dist';

export default () => {
  return {
    build: {
      lib: {
        entry: `${inDir}/${file}`,
        name: file,
        fileName: () => file,
        formats: ['iife']
      },
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
  };
};
